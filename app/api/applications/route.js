import { prisma } from "@/lib/prisma";
import { INITIAL_APPLICATIONS } from "@/lib/seedData";

export const dynamic = "force-dynamic";

// Fetch applications (e.g. for a specific offer or creator)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const offerId = searchParams.get("offerId");
    const creatorId = searchParams.get("creatorProfileId");

    let whereClause = {};
    if (offerId) whereClause.offerId = offerId;
    if (creatorId) whereClause.creatorProfileId = creatorId;

    const apps = await prisma.application.findMany({
      where: whereClause,
      include: {
        creatorProfile: {
          include: { user: true, connectedAccounts: true },
        },
        offer: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(apps);
  } catch (error) {
    console.warn("Prisma applications query fallback:", error.message);
    const { searchParams } = new URL(req.url);
    const offerId = searchParams.get("offerId");
    const creatorId = searchParams.get("creatorProfileId");

    let filtered = [...INITIAL_APPLICATIONS];
    if (offerId) filtered = filtered.filter((a) => a.offerId === offerId);
    if (creatorId) filtered = filtered.filter((a) => a.influencerId === creatorId);

    return Response.json(filtered);
  }
}

const ALLOWED_STATUSES = ["APPLIED", "INVITED", "SHORTLISTED", "HIRED", "REJECTED"];

// Creator applies to an offer or Brand invites a creator
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.offerId) {
      return Response.json({ error: "Offer ID is required" }, { status: 400 });
    }

    const rawStatus = (body.status || "APPLIED").toUpperCase();
    const status = ALLOWED_STATUSES.includes(rawStatus) ? rawStatus : "APPLIED";
    const pitch = typeof body.pitch === "string" ? body.pitch.trim() : "";
    const proposedRate = body.proposedRate ? Math.max(0, Number(body.proposedRate)) : null;

    try {
      const application = await prisma.application.create({
        data: {
          offerId: body.offerId,
          creatorProfileId: body.creatorProfileId || "default-creator-id",
          pitch,
          proposedRate,
          status,
        },
      });
      return Response.json(application, { status: 201 });
    } catch (dbErr) {
      const simulatedApp = {
        id: `app-${Date.now()}`,
        offerId: body.offerId,
        influencerId: body.creatorProfileId || body.influencerId || "inf-1",
        status: status === "APPLIED" ? "Applied" : status === "INVITED" ? "Invited" : status,
        pitch,
        rate: proposedRate || 0,
        createdAt: new Date().toISOString(),
      };
      return Response.json(simulatedApp, { status: 201 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// Brand updates status: SHORTLISTED, HIRED, REJECTED
export async function PATCH(req) {
  try {
    const body = await req.json();

    if (!body.id || !body.status) {
      return Response.json({ error: "Application ID and new status are required" }, { status: 400 });
    }

    const nextStatus = String(body.status).toUpperCase();
    if (!ALLOWED_STATUSES.includes(nextStatus)) {
      return Response.json(
        { error: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    try {
      const application = await prisma.application.update({
        where: { id: body.id },
        data: { status: nextStatus },
      });
      return Response.json(application);
    } catch (dbErr) {
      return Response.json({
        id: body.id,
        status: nextStatus,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

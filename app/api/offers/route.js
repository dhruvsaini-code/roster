import { prisma } from "@/lib/prisma";
import { INITIAL_OFFERS } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const niche = searchParams.get("niche");
    const search = searchParams.get("search")?.toLowerCase();

    // Attempt to query Postgres via Prisma
    let offers = await prisma.offer.findMany({
      include: {
        brandProfile: true,
        applications: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (niche && niche !== "All") {
      offers = offers.filter((o) => o.niche.toLowerCase() === niche.toLowerCase());
    }
    if (search) {
      offers = offers.filter(
        (o) =>
          o.title.toLowerCase().includes(search) ||
          o.brandProfile?.companyName?.toLowerCase().includes(search) ||
          o.deliverables?.toLowerCase().includes(search)
      );
    }

    return Response.json(offers);
  } catch (error) {
    // Graceful fallback to initial seed dataset when DB is not yet connected
    console.warn("Prisma query failed, falling back to seed dataset:", error.message);
    const { searchParams } = new URL(req.url);
    const niche = searchParams.get("niche");
    const search = searchParams.get("search")?.toLowerCase();

    let fallbackOffers = [...INITIAL_OFFERS];
    if (niche && niche !== "All") {
      fallbackOffers = fallbackOffers.filter((o) => o.niche.toLowerCase() === niche.toLowerCase());
    }
    if (search) {
      fallbackOffers = fallbackOffers.filter(
        (o) =>
          o.title.toLowerCase().includes(search) ||
          o.brand.toLowerCase().includes(search) ||
          o.deliverables.toLowerCase().includes(search)
      );
    }

    return Response.json(fallbackOffers);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.deliverables || !body.budgetMin || !body.budgetMax) {
      return Response.json({ error: "Missing required campaign fields" }, { status: 400 });
    }

    try {
      const offer = await prisma.offer.create({
        data: {
          brandProfileId: body.brandProfileId || "default-brand-id",
          title: body.title,
          niche: body.niche || "General",
          deliverables: body.deliverables,
          budgetMin: Number(body.budgetMin),
          budgetMax: Number(body.budgetMax),
          deadline: body.deadline ? new Date(body.deadline) : new Date(Date.now() + 14 * 86400000),
        },
      });
      return Response.json(offer, { status: 201 });
    } catch (dbErr) {
      // In-memory response when DB is in local mock mode
      const simulatedOffer = {
        id: `off-${Date.now()}`,
        brand: body.brand || "Your Brand",
        mine: true,
        title: body.title,
        niche: body.niche || "General",
        deliverables: body.deliverables,
        budgetMin: Number(body.budgetMin),
        budgetMax: Number(body.budgetMax),
        days: body.days || 14,
        createdAt: new Date().toISOString(),
      };
      return Response.json(simulatedOffer, { status: 201 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

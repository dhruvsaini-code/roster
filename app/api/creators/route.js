import { prisma } from "@/lib/prisma";
import { CREATORS } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const niche = searchParams.get("niche");
    const platform = searchParams.get("platform");
    const search = searchParams.get("search")?.toLowerCase();

    let creators = await prisma.creatorProfile.findMany({
      include: {
        user: true,
        connectedAccounts: true,
      },
    });

    if (niche && niche !== "All") {
      creators = creators.filter((c) => c.niche?.toLowerCase() === niche.toLowerCase());
    }
    if (platform && platform !== "All") {
      creators = creators.filter((c) =>
        c.connectedAccounts?.some(
          (acc) => acc.platform.toLowerCase() === platform.toLowerCase()
        )
      );
    }
    if (search) {
      creators = creators.filter(
        (c) =>
          c.user?.name?.toLowerCase().includes(search) ||
          c.bio?.toLowerCase().includes(search) ||
          c.city?.toLowerCase().includes(search) ||
          c.connectedAccounts?.some((acc) => acc.handle.toLowerCase().includes(search))
      );
    }

    return Response.json(creators);
  } catch (error) {
    console.warn("Prisma creators query fallback:", error.message);
    const { searchParams } = new URL(req.url);
    const niche = searchParams.get("niche");
    const platform = searchParams.get("platform");
    const search = searchParams.get("search")?.toLowerCase();

    let fallback = [...CREATORS];
    if (niche && niche !== "All") {
      fallback = fallback.filter((c) => c.niche?.toLowerCase() === niche.toLowerCase());
    }
    if (platform && platform !== "All") {
      fallback = fallback.filter((c) => c.platform?.toLowerCase() === platform.toLowerCase());
    }
    if (search) {
      fallback = fallback.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.handle.toLowerCase().includes(search) ||
          c.city.toLowerCase().includes(search) ||
          c.bio.toLowerCase().includes(search)
      );
    }

    return Response.json(fallback);
  }
}

import { prisma } from "@/lib/prisma";
import { CREATORS } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const niche = searchParams.get("niche");
    const platform = searchParams.get("platform");
    const search = searchParams.get("search")?.toLowerCase();

    const limit = Math.min(Math.max(1, Number(searchParams.get("limit") || 50)), 100);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const sortBy = searchParams.get("sortBy");

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

    if (sortBy === "rate_asc") {
      creators.sort((a, b) => (a.ratePerPost || 0) - (b.ratePerPost || 0));
    } else if (sortBy === "rate_desc") {
      creators.sort((a, b) => (b.ratePerPost || 0) - (a.ratePerPost || 0));
    }

    const total = creators.length;
    const paginated = creators.slice((page - 1) * limit, page * limit);

    return Response.json(paginated, {
      headers: {
        "X-Total-Count": String(total),
        "X-Page": String(page),
        "X-Limit": String(limit),
      },
    });
  } catch (error) {
    console.warn("Prisma creators query fallback:", error.message);
    const { searchParams } = new URL(req.url);
    const niche = searchParams.get("niche");
    const platform = searchParams.get("platform");
    const search = searchParams.get("search")?.toLowerCase();
    const limit = Math.min(Math.max(1, Number(searchParams.get("limit") || 50)), 100);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const sortBy = searchParams.get("sortBy");

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

    if (sortBy === "rate_asc") {
      fallback.sort((a, b) => (a.rate || 0) - (b.rate || 0));
    } else if (sortBy === "rate_desc") {
      fallback.sort((a, b) => (b.rate || 0) - (a.rate || 0));
    } else if (sortBy === "followers_desc") {
      fallback.sort((a, b) => (b.followers || 0) - (a.followers || 0));
    }

    const total = fallback.length;
    const paginated = fallback.slice((page - 1) * limit, page * limit);

    return Response.json(paginated, {
      headers: {
        "X-Total-Count": String(total),
        "X-Page": String(page),
        "X-Limit": String(limit),
      },
    });
  }
}

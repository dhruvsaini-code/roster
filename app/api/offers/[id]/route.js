import { prisma } from "@/lib/prisma";
import { INITIAL_OFFERS } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const offer = await prisma.offer.findUnique({
      where: { id },
      include: {
        brandProfile: true,
        applications: true,
      },
    });

    if (!offer) {
      return Response.json({ error: "Offer not found" }, { status: 404 });
    }

    return Response.json(offer);
  } catch (error) {
    console.warn("Prisma single offer lookup fallback:", error.message);
    const fallbackOffer = INITIAL_OFFERS.find((o) => o.id === id);

    if (!fallbackOffer) {
      return Response.json({ error: "Offer not found" }, { status: 404 });
    }

    return Response.json(fallbackOffer);
  }
}

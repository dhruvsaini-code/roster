export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    status: "healthy",
    service: "SponsorSync API",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}

import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Called after a creator signs in with Google (see lib/auth.js for the scope).
// Pulls their channel's subscriber count and recent-video stats, then
// upserts a ConnectedAccount row so it shows up on their profile as verified.
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return Response.json({ error: "Not signed in with Google" }, { status: 401 });
  }

  const { creatorProfileId } = await req.json();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  // 1. Get the signed-in user's own channel
  const channelRes = await youtube.channels.list({
    part: ["snippet", "statistics"],
    mine: true,
  });
  const channel = channelRes.data.items?.[0];
  if (!channel) {
    return Response.json({ error: "No YouTube channel found on this account" }, { status: 404 });
  }

  const followerCount = Number(channel.statistics.subscriberCount || 0);

  // 2. Rough engagement estimate from the last 5 uploads (views+likes+comments / subs)
  //    Good enough for an MVP badge — swap for a real weighted calc later.
  const uploadsRes = await youtube.search.list({
    part: ["id"],
    channelId: channel.id,
    order: "date",
    maxResults: 5,
    type: ["video"],
  });
  const videoIds = uploadsRes.data.items.map((i) => i.id.videoId).filter(Boolean);

  let engagementRate = null;
  if (videoIds.length > 0 && followerCount > 0) {
    const statsRes = await youtube.videos.list({ part: ["statistics"], id: videoIds });
    const totals = statsRes.data.items.reduce(
      (acc, v) => {
        acc.views += Number(v.statistics.viewCount || 0);
        acc.likes += Number(v.statistics.likeCount || 0);
        acc.comments += Number(v.statistics.commentCount || 0);
        return acc;
      },
      { views: 0, likes: 0, comments: 0 }
    );
    const avgEngagement = (totals.likes + totals.comments) / videoIds.length;
    engagementRate = Number(((avgEngagement / followerCount) * 100).toFixed(2));
  }

  const connectedAccount = await prisma.connectedAccount.upsert({
    where: { creatorProfileId_platform: { creatorProfileId, platform: "YOUTUBE" } },
    update: {
      handle: channel.snippet.title,
      accessToken: session.accessToken,
      followerCount,
      engagementRate,
      verified: true,
      lastSyncedAt: new Date(),
    },
    create: {
      creatorProfileId,
      platform: "YOUTUBE",
      handle: channel.snippet.title,
      accessToken: session.accessToken,
      followerCount,
      engagementRate,
      verified: true,
      lastSyncedAt: new Date(),
    },
  });

  return Response.json(connectedAccount);
}

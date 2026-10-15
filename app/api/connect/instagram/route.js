// Instagram connection — stubbed until your Meta app is approved.
//
// Setup you need first (see README):
// 1. developers.facebook.com -> create app -> add "Instagram Graph API" product
// 2. The creator's Instagram account must be a Business or Creator account
//    linked to a Facebook Page (personal accounts can't use this API)
// 3. OAuth flow redirects to Facebook, not Instagram directly, and returns
//    a token you exchange for a long-lived token + the linked IG user id
// 4. Once you have that IG user id, GET /{ig-user-id}?fields=followers_count,
//    media_count from the Graph API gives you the stats to store
//
// This route currently just documents the flow — build it out once your
// Meta app is past app review. The YouTube route (../youtube/route.js) is
// a full working example of the same pattern to copy from.

export async function POST(req) {
  return Response.json(
    {
      error:
        "Instagram connection not implemented yet — needs an approved Meta app. See comments in this file.",
    },
    { status: 501 }
  );
}

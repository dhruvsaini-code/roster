import GoogleProvider from "next-auth/providers/google";

// This gives you login AND the YouTube read-only scope in one step —
// when a creator signs in with Google, you already have the token you
// need to call the YouTube Data API for their channel stats.
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",
          access_type: "offline", // needed to get a refresh_token back
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    // Persist the access + refresh token onto the session so API routes can use them
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

import "./globals.css";

export const metadata = {
  title: "Roster: Creator Deals, Powered by Creators",
  description:
    "Direct, transparent creator marketplace connecting forward-thinking brands with high-engagement Indian creators. Inspired by modern SaaS workflows.",
  keywords: [
    "creator marketplace",
    "influencer marketing",
    "brand campaigns",
    "roster",
    "worksbuddy ai",
    "youtube creators",
    "instagram creators",
  ],
  authors: [{ name: "Dhruv Saini" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,600;0,6..72,700;1,6..72,600;1,6..72,700&family=IBM+Plex+Mono:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

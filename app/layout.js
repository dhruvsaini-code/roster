import "./globals.css";

export const metadata = {
  title: "Roster — Curated Creator Marketplace & Campaign Operating System",
  description:
    "Direct, transparent deal-making platform connecting forward-thinking brands with high-engagement Indian creators.",
  keywords: ["creator marketplace", "influencer marketing", "brand campaigns", "roster", "youtube creators", "instagram creators"],
  authors: [{ name: "Roster Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

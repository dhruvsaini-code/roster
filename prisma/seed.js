const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CREATORS_DATA = [
  {
    name: "Aanya Kapoor",
    email: "aanya@example.com",
    handle: "@aanya.styles",
    niche: "Fashion",
    platform: "INSTAGRAM",
    followers: 245000,
    engagement: 4.8,
    rate: 25000,
    city: "Delhi",
    bio: "Everyday fashion, thrifted finds, and outfit breakdowns for the modern aesthetic enthusiast.",
  },
  {
    name: "Rohan Verma",
    email: "rohan@example.com",
    handle: "@rohanlifts",
    niche: "Fitness",
    platform: "YOUTUBE",
    followers: 512000,
    engagement: 6.1,
    rate: 60000,
    city: "Mumbai",
    bio: "Strength training and science-based nutrition, no fluff. Weekly program breakdowns and form checks.",
  },
  {
    name: "Priya Nair",
    email: "priya@example.com",
    handle: "@priyaeats",
    niche: "Food",
    platform: "INSTAGRAM",
    followers: 138000,
    engagement: 5.5,
    rate: 18000,
    city: "Bangalore",
    bio: "Home-style regional cooking and authentic street food crawls across South India.",
  },
  {
    name: "Kunal Mehta",
    email: "kunal@example.com",
    handle: "@techwithkunal",
    niche: "Tech",
    platform: "YOUTUBE",
    followers: 890000,
    engagement: 3.9,
    rate: 120000,
    city: "Pune",
    bio: "Deep tech breakdowns, gadget stress-tests, and realistic India-market value analyses.",
  },
  {
    name: "Devika Rao",
    email: "devika@example.com",
    handle: "@devikaglow",
    niche: "Beauty",
    platform: "INSTAGRAM",
    followers: 410000,
    engagement: 6.8,
    rate: 45000,
    city: "Hyderabad",
    bio: "Dermat-approved skincare regimens, ingredient transparency, and candid cosmetic reviews.",
  },
];

const BRANDS_DATA = [
  {
    name: "Glowly Skincare",
    email: "collabs@glowly.in",
    website: "https://glowly.in",
    offers: [
      {
        title: "Monsoon Dew Launch Campaign",
        niche: "Beauty",
        budgetMin: 40000,
        budgetMax: 60000,
        deliverables: "1 Instagram Reel + 2 Story Frames",
        days: 12,
      },
    ],
  },
  {
    name: "StyleLoop",
    email: "partnerships@styleloop.com",
    website: "https://styleloop.com",
    offers: [
      {
        title: "Festive Capsule Wardrobe Edit",
        niche: "Fashion",
        budgetMin: 20000,
        budgetMax: 35000,
        deliverables: "2 Curated Style Guides on Instagram",
        days: 10,
      },
    ],
  },
  {
    name: "FitFuel Protein",
    email: "team@fitfuel.in",
    website: "https://fitfuel.in",
    offers: [
      {
        title: "Winter Shred 60-Day Challenge",
        niche: "Fitness",
        budgetMin: 50000,
        budgetMax: 90000,
        deliverables: "1 Dedicated YouTube Video Integration",
        days: 20,
      },
    ],
  },
];

async function main() {
  console.log("Seeding SponsorSync database...");

  // Seed Creators
  for (const c of CREATORS_DATA) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        email: c.email,
        name: c.name,
        role: "CREATOR",
        creatorProfile: {
          create: {
            bio: c.bio,
            niche: c.niche,
            city: c.city,
            ratePerPost: c.rate,
            connectedAccounts: {
              create: {
                platform: c.platform,
                handle: c.handle,
                accessToken: "mock_access_token",
                followerCount: c.followers,
                engagementRate: c.engagement,
                verified: true,
                lastSyncedAt: new Date(),
              },
            },
          },
        },
      },
    });
    console.log(`Created creator: ${user.name}`);
  }

  // Seed Brands & Offers
  for (const b of BRANDS_DATA) {
    const brandUser = await prisma.user.upsert({
      where: { email: b.email },
      update: {},
      create: {
        email: b.email,
        name: b.name,
        role: "BRAND",
        brandProfile: {
          create: {
            companyName: b.name,
            website: b.website,
            offers: {
              create: b.offers.map((o) => ({
                title: o.title,
                niche: o.niche,
                deliverables: o.deliverables,
                budgetMin: o.budgetMin,
                budgetMax: o.budgetMax,
                deadline: new Date(Date.now() + o.days * 86400000),
              })),
            },
          },
        },
      },
    });
    console.log(`Created brand: ${brandUser.name}`);
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

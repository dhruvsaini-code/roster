# Roster ⚡

> **Curated Creator Marketplace & Deal Operating System for Forward-Thinking Brands and Indian Creators.**

Direct, transparent deal-making platform connecting modern consumer brands with vetted, high-engagement Indian creators. Built with **Next.js 14 (App Router)**, **Prisma ORM**, **NextAuth**, and tailored editorial aesthetics.

---

## 🌟 Key Highlights

- **🎨 WorksBuddy-Inspired Editorial SaaS Design:** Featuring floating glassmorphic navigation, animated rotating hero badges, layered stacked dashboard mockups, continuous marquee testimonials, tool-sprawl friction chips, and instant Light/Dark mode toggling.
- **📊 Interactive Campaign ROI Estimator:** Real-time budget simulation slider allowing brands to model projected impressions, estimated viewer engagements, and recommended creator tier mix across budgets from ₹20,000 to ₹5,00,000.
- **⚖️ Side-by-Side Comparison Matrix:** Comprehensive capability breakdown contrasting Roster against traditional talent agencies and manual Instagram DMs/spreadsheets across discovery, escrow security, turnarounds, and pricing transparency.
- **🎟️ Signature Ticket-Stub Deal Cards:** Visual ticket cards featuring perforated dashed separators, notch cutouts, budget brackets (in INR `₹`), deliverables scope, barcode accents, and real-time days-left counters.
- **🔄 Dual Persona Architecture:**
  - **🏢 Brand Portal:** Discover creators filtered by niche (Fashion, Tech, Beauty, Fitness, etc.), verified follower tiers, and engagement rates. Create campaign briefs and review candidate applicant rosters with 1-click **Shortlist**, **Hire**, or **Decline** workflows.
  - **✨ Creator Hub:** Browse open commercial brand briefs, submit tailored pitches with custom proposed rates, track application states in real-time (`Applied`, `Invited`, `Shortlisted`, `Hired`), and showcase verified social media stats.
- **📊 Real-Time Metrics & Discovery:** Instant client-side search across creator names, handles, cities, and tags with multi-dimensional sorting (Audience Reach, Engagement %, Commercial Rate).
- **🔒 Verified Social Channels:** Google OAuth integration with the **YouTube Data API v3** to sync subscriber statistics and calculate engagement estimates. Prepared architecture for **Instagram Graph API**.
- **⚡ Dual-Engine Operation:** Runs out-of-the-box with an instant in-memory fallback seed dataset, and seamlessly persists to PostgreSQL via **Prisma ORM** once `DATABASE_URL` is configured.

---

## 🏛️ System Architecture

```mermaid
graph TD
    Client["Next.js 14 Client App (App Router)"]
    
    subgraph Frontend["Frontend Layer"]
        BrandPortal["Brand Portal (Discover, Briefs, Roster)"]
        CreatorHub["Creator Hub (Deals, Pitches, Analytics)"]
        DesignSystem["Editorial Design System (CSS Tokens + Glassmorphism)"]
    end

    subgraph Backend["API & Auth Routes"]
        OffersAPI["/api/offers (GET, POST)"]
        AppsAPI["/api/applications (GET, POST, PATCH)"]
        CreatorsAPI["/api/creators (GET with Filters)"]
        AuthAPI["/api/auth/[...nextauth] (NextAuth Google Provider)"]
        YTConnect["/api/connect/youtube (YouTube Data API v3)"]
    end

    subgraph Persistence["Storage & External Services"]
        PrismaORM["Prisma 5 ORM"]
        PostgresDB[("PostgreSQL (Supabase / Neon)")]
        GoogleCloud["Google Cloud / YouTube API"]
    end

    Client --> BrandPortal
    Client --> CreatorHub
    BrandPortal --> OffersAPI
    BrandPortal --> AppsAPI
    CreatorHub --> OffersAPI
    CreatorHub --> AppsAPI
    CreatorHub --> CreatorsAPI
    OffersAPI --> PrismaORM
    AppsAPI --> PrismaORM
    CreatorsAPI --> PrismaORM
    AuthAPI --> GoogleCloud
    YTConnect --> GoogleCloud
    PrismaORM --> PostgresDB
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | Modern JavaScript (ES Modules, JSX) |
| **Styling** | Custom Vanilla CSS Design System with Curated Color Tokens & CSS Variables |
| **Typography** | Space Grotesk, Inter, and IBM Plex Mono (Google Fonts) |
| **Database & ORM** | [Prisma ORM 5](https://www.prisma.io/) with PostgreSQL |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) with Google OAuth 2.0 |
| **Social API** | [Google APIs](https://www.npmjs.com/package/googleapis) (YouTube Data API v3) |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom Scalable Vectors |

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js** 18+ or 20+
- **npm** 9+

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/dhruvsaini-code/roster.git
cd roster
npm install
```

### 3. Environment Setup
Copy the environment template:
```bash
cp .env.example .env
```

Configure the following variables in `.env`:
```env
# Database (PostgreSQL - e.g. Supabase or Neon)
DATABASE_URL="postgresql://user:password@host:5432/roster"

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google Cloud (YouTube Data API v3)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

> **Note:** The app works smoothly in local mock mode even if `DATABASE_URL` is not yet populated, thanks to the automatic fallback seed layer in `lib/seedData.js`.

### 4. Database Setup (When connecting to PostgreSQL)
Generate the Prisma Client:
```bash
npm run prisma:generate
```

Push migrations to your database:
```bash
npm run prisma:migrate
```

Seed the database with vetted Indian creators, brands, campaigns, and sample applications:
```bash
npm run prisma:seed
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

### Offers (`/api/offers`)
- **`GET /api/offers?niche=Tech&search=earbuds`**: Retrieve open campaigns. Supports query filtering by niche and keyword.
- **`POST /api/offers`**: Publish a new campaign brief.
  - **Body:** `{ title, niche, deliverables, budgetMin, budgetMax, deadline, brandProfileId }`

### Applications (`/api/applications`)
- **`GET /api/applications?offerId=off-1`**: Retrieve applications for a specific offer or creator.
- **`POST /api/applications`**: Submit a new application or brand invite.
  - **Body:** `{ offerId, creatorProfileId, pitch, proposedRate, status }`
- **`PATCH /api/applications`**: Update status of an applicant.
  - **Body:** `{ id: "app-id", status: "SHORTLISTED" | "HIRED" | "REJECTED" }`

### Creators (`/api/creators`)
- **`GET /api/creators?niche=Fashion&platform=Instagram&search=Delhi`**: Filter verified creators by niche, platform, location, or handle.

### YouTube Stats Sync (`/api/connect/youtube`)
- **`POST /api/connect/youtube`**: Queries the YouTube Data API v3 using the authenticated creator's OAuth access token. Pulls subscriber counts, recent video views, likes, and comments to calculate real-world engagement metrics.

---

## 📁 Repository Structure

```
roster/
├── app/
│   ├── api/
│   │   ├── applications/route.js    # Deal applications & status update pipeline
│   │   ├── auth/[...nextauth]/      # NextAuth Google OAuth handler
│   │   ├── connect/
│   │   │   ├── instagram/route.js   # Instagram Graph API integration stub
│   │   │   └── youtube/route.js     # YouTube Data API stats sync
│   │   ├── creators/route.js        # Creator discovery & filter API
│   │   └── offers/route.js          # Brand campaign briefs CRUD
│   ├── globals.css                  # Design tokens, perforations, animations
│   ├── layout.js                    # Root layout with fonts & viewport
│   └── page.js                      # Dual-persona marketplace & dashboard
├── components/
│   ├── Avatar.js                    # Harmonic procedural monogram avatars
│   ├── CreatorCard.js               # Creator showcase with verified metrics
│   ├── DealCard.js                  # Signature ticket-stub deal card
│   ├── Icons.js                     # Custom scalable platform vectors
│   ├── MetricsOverview.js           # Real-time KPI summary bar
│   ├── Modal.js                     # Accessible modal with blur backdrop
│   ├── StatusBadge.js               # Status badges (Applied, Shortlisted, Hired)
│   └── Toast.js                     # Action feedback alerts
├── lib/
│   ├── auth.js                      # NextAuth configuration with YouTube scope
│   ├── prisma.js                    # Global Prisma Client instance
│   └── seedData.js                  # High-quality starter dataset
├── prisma/
│   ├── schema.prisma                # Relational PostgreSQL data models
│   └── seed.js                      # Database seeding script
├── .env.example                     # Environment template
├── jsconfig.json                    # Path alias (@/*) configuration
└── package.json                     # Scripts & dependencies
```

---

## 🗺️ Roadmap

- [x] Ticket-stub UI design with dashed perforations and custom cutouts
- [x] Dual-persona Brand & Creator interactive workspaces
- [x] Real-time search, niche filtering, and metric sorting
- [x] Interactive campaign creation & deal pitch workflow
- [x] Prisma ORM schema & automated database seeding
- [x] YouTube Data API v3 channel verification
- [ ] Escrow payment milestones via Stripe / Razorpay
- [ ] Instagram Graph API live webhooks post-Meta app review
- [ ] Automated PDF Media Kit generator for creators
- [ ] AI-assisted brand brief parser & creator matching score

---

## 📄 License

MIT License. Crafted with precision by [Dhruv Saini](https://github.com/dhruvsaini-code).

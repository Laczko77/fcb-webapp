# FC Barcelona Fan Webapp

A Next.js 14 (App Router) fan web application for FC Barcelona supporters, built with Supabase, Tailwind CSS, and shadcn/ui.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend + Backend | Next.js 14, App Router, Server Actions |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Database + Auth + Storage | Supabase (`@supabase/ssr`) |
| Global Client State | Zustand (`persist` middleware) |
| Validation | Zod |
| Icons | lucide-react |
| Match / Stats Data | API-Football (RapidAPI) |

## Getting Started

### 1. Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

### 2. Install dependencies

```bash
npm install
```

### 3. Database setup

Run the migration in the Supabase SQL editor (or via the Supabase CLI):

```
supabase/migrations/001_initial_schema.sql
```

After the migration, follow the instructions in `supabase/seed.sql` to create the first admin user.

### 4. Storage buckets (manual setup)

The following Storage buckets must be created **manually** in the Supabase Dashboard under **Storage → New bucket**:

| Bucket name | Public | Purpose |
|---|---|---|
| `avatars` | Yes | User profile pictures |
| `news-images` | Yes | Images for news articles |
| `product-images` | Yes | Images for webshop products |

> All three buckets should be set to **public** so that images can be served without authentication.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Authentication (email + password via Supabase Auth)
- User profiles with avatar upload
- News feed
- Match fixtures and statistics (API-Football)
- Ticket purchase
- Webshop
- Community polls
- Real-time chat
- Player descriptions (AI-generated)
- Admin panel

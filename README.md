# Buyer Referral Platform

A production-ready web application for connecting American/expat buyers interested in Costa Rica property with trusted local real estate firms.

## Features

### Public Website
- **Home Page** (`/`) — Hero, how it works, trust signals, FAQ
- **Education Page** (`/how-buying-works`) — Due diligence info, common mistakes
- **How We Work** (`/how-we-work`) — Clear disclosure of role and referral model
- **Intake Form** (`/intake`) — Buyer qualification form
- **Confirmation** (`/thanks`) — Post-submission next steps

### Admin Dashboard
- **Buyers** (`/admin`) — List incoming buyers, assign partners, update status
- **Buyer Detail** (`/admin/buyers/[id]`) — Full buyer info, notes, status tracking
- **Partners** (`/admin/partners`) — Manage partner firms
- **Referrals** (`/admin/referrals`) — Track all buyer-partner assignments

### API
- `POST /api/buyers` — Create new buyer
- `GET /api/buyers` — List buyers with referral info
- `GET/PATCH/DELETE /api/buyers/[id]` — Single buyer operations
- `POST /api/partners` — Create partner
- `GET /api/partners` — List partners
- `GET/PATCH/DELETE /api/partners/[id]` — Single partner operations
- `POST /api/referrals` — Assign buyer to partner
- `GET /api/referrals` — List referrals (filterable by status)
- `PATCH/DELETE /api/referrals/[id]` — Update/delete referral

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Setup

### 1. Clone and Install

```bash
cd buyer-referral-platform
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Get your credentials from **Settings > API**:
   - Project URL
   - `anon` public key

### 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_WHATSAPP_NUMBER=+506XXXXXXXX
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Vercel

Add these in **Settings > Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code |

## Database Schema

### buyers
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Buyer name |
| email | TEXT | Email address |
| budget_range | TEXT | Budget enum |
| timeline | TEXT | Purchase timeline enum |
| intended_use | TEXT | Property use enum |
| area_interest | TEXT | Free text areas |
| source | TEXT | Lead source |
| created_at | TIMESTAMP | Submission time |

### partners
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Contact name |
| firm | TEXT | Company name |
| email | TEXT | Email address |
| whatsapp | TEXT | WhatsApp number |
| notes | TEXT | Internal notes |

### referrals
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| buyer_id | UUID | FK to buyers |
| partner_id | UUID | FK to partners |
| status | TEXT | new/contacted/active/closed/dead |
| notes | TEXT | Internal notes |
| created_at | TIMESTAMP | Assignment time |
| updated_at | TIMESTAMP | Last update |

## Project Structure

```
buyer-referral-platform/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   ├── how-buying-works/
│   │   │   └── page.tsx                # Education page
│   │   ├── how-we-work/
│   │   │   └── page.tsx                # How we work page
│   │   ├── intake/
│   │   │   └── page.tsx                # Buyer intake form
│   │   ├── thanks/
│   │   │   └── page.tsx                # Confirmation page
│   │   ├── admin/
│   │   │   ├── layout.tsx              # Admin layout
│   │   │   ├── page.tsx                # Buyers dashboard
│   │   │   ├── buyers/[id]/page.tsx    # Buyer detail
│   │   │   ├── partners/page.tsx       # Partners management
│   │   │   └── referrals/page.tsx      # Referrals tracking
│   │   └── api/
│   │       ├── buyers/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── partners/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       └── referrals/
│   │           ├── route.ts
│   │           └── [id]/route.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppCTA.tsx
│   ├── lib/
│   │   ├── supabase.ts                 # Supabase client
│   │   └── constants.ts                # App constants
│   └── types/
│       └── database.ts                 # TypeScript types
├── supabase-schema.sql                 # Database setup
├── .env.example                        # Environment template
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Future Enhancements

When ready to add:

- **Authentication**: Integrate Supabase Auth for admin login
- **Email notifications**: Send alerts on new submissions via Resend
- **Analytics**: Add Google Analytics or Plausible
- **CRM integration**: Export to HubSpot, Pipedrive, etc.

## License

Private — All rights reserved.

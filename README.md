# ServicePro Lead Engine

A full-stack lead generation website and mini CRM for service businesses.

ServicePro Lead Engine is a portfolio project built to show how a modern service business can present its offer, collect structured quote requests, and manage incoming leads from a clean dashboard. Version 2 turns the original frontend demo into a working Supabase-backed lead capture and admin workflow.

## Live Demo

- Live site: Deployed on Vercel
- Quote request form: `/quote`
- Admin dashboard: `/dashboard`
- Case study: `/case-study`

## Version 2 Features

- Supabase lead capture for real quote requests
- Conversion-focused quote request form
- API routes for creating, listing, and updating leads
- Admin token protected dashboard
- Lead status tracking: new, contacted, quoted, won, lost
- Dashboard stats for total leads and pipeline status counts
- Lead table with status dropdown updates
- Clean loading, success, and error states
- Vercel-ready deployment configuration
- Responsive marketing pages for service business presentation

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style components
- Radix UI primitives
- lucide-react icons
- Supabase
- Vercel
- ESLint

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page with hero, services, industries, dashboard preview, process, and CTA sections |
| `/services` | Service offering overview |
| `/industries` | Industry use cases for service businesses |
| `/quote` | Quote request form that creates Supabase leads through `/api/leads` |
| `/dashboard` | Admin token protected CRM dashboard using live Supabase lead data |
| `/case-study` | Portfolio case study for GitHub, LinkedIn, Upwork, and Fiverr |
| `/contact` | Contact page with quote form and business contact links |

## Backend API

| Method | Route | Purpose | Protection |
| --- | --- | --- | --- |
| `POST` | `/api/leads` | Create a new quote request lead | Public form endpoint |
| `GET` | `/api/leads` | List dashboard leads | Requires `x-admin-token` |
| `PATCH` | `/api/leads/[id]` | Update lead status | Requires `x-admin-token` |

The API builds explicit Supabase payloads server-side. It does not insert raw request bodies into the database.

## Required Environment Variables

Create a `.env.local` file in the project root for local development:

```env
NEXT_PUBLIC_SITE_NAME="ServicePro Lead Engine"
NEXT_PUBLIC_WHATSAPP_NUMBER="10000000000"
NEXT_PUBLIC_PHONE_NUMBER="+1 000 000 0000"
NEXT_PUBLIC_BUSINESS_LOCATION="Worldwide"
NEXT_PUBLIC_DEMO_EMAIL="hello@servicepro-demo.com"

NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
ADMIN_ACCESS_TOKEN="choose-a-strong-admin-token"
```

For Vercel, add the same variables in Project Settings -> Environment Variables, then redeploy.

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` must stay server-only.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.
- Browser code submits leads only to local API routes.
- Dashboard access uses an admin token sent in the `x-admin-token` header.
- The dashboard stores the entered admin token only in `sessionStorage`.
- If `ADMIN_ACCESS_TOKEN` contains `#`, wrap it in quotes in `.env.local`.

## Supabase Leads Table Setup

Create a `leads` table in Supabase with these application fields:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `name` | `text` | Required |
| `email` | `text` | Required |
| `business_type` | `text` | Required |
| `website_url` | `text` | Optional |
| `needed_service` | `text` | Required |
| `budget_range` | `text` | Required |
| `timeline` | `text` | Required |
| `message` | `text` | Optional |
| `status` | `lead_status` or `text` | Defaults to `new` |
| `source` | `text` | Example: `quote_form` |
| `created_at` | `timestamptz` | Defaults to `now()` |
| `updated_at` | `timestamptz` | Updated when lead changes |

Recommended status values:

```text
new
contacted
quoted
won
lost
```

The app expects the database column names above. In particular, use `website_url`, `needed_service`, `budget_range`, and `business_type`.

## How to Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Run a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## How to Test

1. Confirm Supabase environment variables are set in `.env.local`.
2. Start the dev server with `npm run dev`.
3. Open `/quote`.
4. Submit a quote request with name, email, business type, needed service, budget range, and timeline.
5. Open `/dashboard`.
6. Enter the exact `ADMIN_ACCESS_TOKEN` value from `.env.local`.
7. Confirm the new lead appears in the table.
8. Change the lead status with the dropdown.
9. Confirm the dashboard stats update.

## Vercel Deployment

This project is ready for Vercel deployment:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add all required environment variables in Vercel.
4. Deploy the main branch.
5. Test `/quote` and `/dashboard` on the production URL.

## Folder Structure

```text
servicepro-lead-engine/
|-- public/
|-- src/
|   |-- app/
|   |   |-- api/leads/
|   |   |-- dashboard/
|   |   |-- quote/
|   |   |-- services/
|   |   |-- industries/
|   |   |-- case-study/
|   |   `-- contact/
|   |-- components/
|   |   |-- admin/
|   |   |-- forms/
|   |   |-- layout/
|   |   |-- sections/
|   |   `-- ui/
|   |-- data/
|   |-- lib/
|   |   |-- supabase/
|   |   |-- validations/
|   |   |-- admin-auth.ts
|   |   `-- leads.ts
|   `-- types/
|       `-- leads.ts
|-- supabase/
|-- next.config.ts
|-- package.json
`-- tsconfig.json
```

## Portfolio Use

ServicePro Lead Engine is designed as a professional portfolio project for GitHub, LinkedIn, Upwork, and Fiverr. It demonstrates:

- Practical full-stack implementation
- Lead generation strategy for service businesses
- Secure server-side Supabase integration
- Admin dashboard workflows
- Clean UI architecture with reusable components
- Deployment-ready project structure

## Author

**Avoy Das**

Frontend and full-stack web developer building practical lead generation systems, business websites, and portfolio-ready SaaS demos for clients worldwide.

# ServicePro Lead Engine

A full-stack-ready lead generation website and mini CRM for service businesses worldwide.

ServicePro Lead Engine is a portfolio project built to show how a modern service business can present its offer, collect structured quote requests, and manage incoming leads from a clean CRM-style dashboard. Version 1 is a frontend/demo implementation: the quote form shows a simulated submission state, and the dashboard uses sample lead data. Version 2 is planned to add Supabase-powered lead capture, storage, authentication, and dashboard functionality.

## Live Demo

- Live site: Coming soon
- Demo dashboard: `/dashboard`
- Quote form demo: `/quote`
- Case study: `/case-study`

> Note: Version 1 is intended as a frontend portfolio/demo build. No real lead data is sent, stored, or managed by a backend in the current version.

## Features

- Professional landing page for service businesses
- Conversion-focused service sections and calls to action
- Industry sections for multiple service business categories
- Quote request form with business type, service need, budget, timeline, and message fields
- Simulated form submission success state
- Mini CRM dashboard demo with sample leads and pipeline metrics
- Lead status categories: new, contacted, quoted, won, and lost
- Responsive layout for desktop, tablet, and mobile
- Reusable UI components and section-based architecture
- Portfolio case study page for client-facing presentation

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style component structure
- Radix UI primitives
- lucide-react icons
- Supabase client installed for planned Version 2 integration
- ESLint

## Pages

| Route | Description |
| --- | --- |
| `/` | Main landing page with hero, services, industries, dashboard preview, process, and CTA sections |
| `/services` | Service offering overview |
| `/industries` | Industry use cases for service businesses |
| `/quote` | Frontend quote request demo form |
| `/dashboard` | Demo mini CRM dashboard using sample lead data |
| `/case-study` | Portfolio case study explaining the project, goal, stack, and roadmap |
| `/contact` | Contact page with email, quote form, LinkedIn, and GitHub links |

## Folder Structure

```text
servicepro-lead-engine/
|-- public/
|   `-- Static assets
|-- src/
|   |-- app/
|   |   |-- page.tsx
|   |   |-- services/
|   |   |-- industries/
|   |   |-- quote/
|   |   |-- dashboard/
|   |   |-- case-study/
|   |   |-- contact/
|   |   |-- layout.tsx
|   |   `-- globals.css
|   |-- components/
|   |   |-- forms/
|   |   |-- layout/
|   |   |-- sections/
|   |   `-- ui/
|   |-- data/
|   |   |-- industries.ts
|   |   |-- leads.ts
|   |   `-- services.ts
|   |-- lib/
|   |   |-- icons.tsx
|   |   |-- site.ts
|   |   `-- utils.ts
|   `-- types/
|       `-- index.ts
|-- components.json
|-- next.config.ts
|-- package.json
`-- tsconfig.json
```

## Version 1 Completed Features

Version 1 focuses on the frontend experience and portfolio presentation.

- Landing page with a polished SaaS-style design
- Services page and reusable service data
- Industries page and reusable industry data
- Quote request form UI with simulated submission feedback
- Demo dashboard with static sample leads
- Pipeline summary cards and status distribution UI
- Case study page for GitHub, LinkedIn, Upwork, and Fiverr presentation
- Contact page with client-facing calls to action
- Responsive layout and reusable component structure

## Version 2 Planned Features

Version 2 will turn the demo into a working full-stack lead management system.

- Supabase database integration for real quote submissions
- Lead capture from the quote form
- Authenticated dashboard access
- CRUD functionality for leads
- Lead status updates from the dashboard
- Lead notes and follow-up tracking
- Search, filtering, and sorting for dashboard records
- Email and/or WhatsApp notifications for new leads
- Basic analytics for conversion and pipeline performance
- Environment-based deployment configuration

## How to Run Locally

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

## Environment Variables Example

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_NAME="ServicePro Lead Engine"
NEXT_PUBLIC_WHATSAPP_NUMBER="10000000000"
NEXT_PUBLIC_PHONE_NUMBER="+1 000 000 0000"
NEXT_PUBLIC_BUSINESS_LOCATION="Worldwide"
NEXT_PUBLIC_DEMO_EMAIL="hello@servicepro-demo.com"

# Planned for Version 2
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

The Supabase variables are included as a Version 2 placeholder. The current Version 1 demo does not store leads in Supabase.

## Portfolio Case Study

ServicePro Lead Engine was created as a client-facing portfolio project for service businesses that need a stronger web presence and a better way to handle inbound inquiries.

The project demonstrates:

- How a service business website can be structured around lead generation
- How quote requests can be collected through a clear, guided form experience
- How a lightweight CRM dashboard can help business owners understand their pipeline
- How reusable data and components can support multiple service industries
- How a frontend-first demo can be extended into a production-ready full-stack system

This makes the project suitable for showcasing on GitHub, LinkedIn, Upwork, and Fiverr as an example of practical product design, frontend development, and full-stack planning.

## Screenshots

Screenshots can be added here after deployment or final UI review.

```text
/screenshots/home.png
/screenshots/quote.png
/screenshots/dashboard.png
/screenshots/case-study.png
```

## Author

**Avoy Das**

Frontend and full-stack web developer building practical lead generation systems, business websites, and portfolio-ready SaaS demos for clients worldwide.

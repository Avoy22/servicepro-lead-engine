# ServicePro Lead Engine

ServicePro Lead Engine is a full-stack lead capture and management system for service businesses. It combines a marketing website, contact/quote form, Supabase-backed lead storage, and a protected admin dashboard for managing inbound inquiries.

The project is designed as a practical business tool and a portfolio-ready full-stack application. It demonstrates how a service company can move from scattered inquiries to a structured lead workflow.

## Overview

ServicePro Lead Engine helps service-based businesses collect, organize, and manage quote requests from a single web application.

Visitors can submit inquiries through a lead capture form. The application validates each submission server-side, stores the lead in Supabase, and makes it available to the business owner through a protected dashboard. From the dashboard, an admin can review leads, update statuses, add notes, search/filter records, and export lead data as CSV.

The project is intended for small service businesses, local operators, agencies, and freelancers who need a reliable lead intake workflow without a large CRM implementation.

## Problem

Service businesses often receive inquiries from many places: website forms, phone calls, email, social media, and referrals. Without a centralized system, those leads can be missed, delayed, duplicated, or forgotten.

This creates real operational problems:

- New inquiries are not always followed up quickly.
- Lead details are scattered across different tools.
- Business owners lack a clear view of their sales pipeline.
- Important context and follow-up notes are easy to lose.

## Solution

ServicePro Lead Engine provides a focused lead capture and management workflow.

The app gives visitors a structured form for submitting service requests, stores each inquiry in Supabase, and gives the business owner an admin dashboard for tracking and managing leads. Instead of treating the website as a static brochure, the application turns it into a working intake system for customer inquiries.

## Features

- Lead capture form
- Supabase database
- Server-side validation
- Protected admin dashboard
- Lead status tracking
- Admin notes
- Search and filtering
- CSV export
- Responsive UI
- Vercel deployment

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- Zod
- Vercel

## Architecture

The application follows a straightforward full-stack lead management flow:

```text
Visitor submits form
        |
        v
API route validates input with server-side validation
        |
        v
Supabase stores the lead record
        |
        v
Protected admin dashboard fetches lead data
        |
        v
Admin updates lead status and notes
        |
        v
CSV export downloads lead data
```

At a high level:

- The public website presents the service business and directs visitors to the quote/contact form.
- The lead form submits data to a server-side API route.
- The API route validates input before writing to Supabase.
- Protected admin endpoints provide access to lead records for the dashboard.
- The dashboard supports lead review, workflow updates, notes, search, filtering, and CSV export.

## Screenshots

![Homepage](public/screenshots/servicepro-home-full.png)

![Dashboard](public/screenshots/servicepro-dashboard.png)

## Environment Variables

Create a `.env.local` file in the project root and provide the required environment variables:

```env
NEXT_PUBLIC_SITE_NAME=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_BUSINESS_LOCATION=
NEXT_PUBLIC_DEMO_EMAIL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_ACCESS_TOKEN=
```

Do not commit `.env.local` or expose server-only secrets in client-side code.

## Local Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

The local development server usually runs at:

```text
http://localhost:3000
```

## Deployment

This project is intended to deploy on Vercel.

To deploy:

1. Connect the repository to Vercel.
2. Add the required environment variables in the Vercel project settings.
3. Configure the Supabase project and database schema.
4. Deploy the application.

The Supabase service role key must only be used by server-side routes and should be stored as a protected environment variable in Vercel.

## Security Notes

- Service role key is server-side only.
- Admin routes are protected.
- `.env.local` is not committed.
- Input validation is used before storing lead data.

## Future Improvements

- Email notifications
- Authentication provider
- Lead analytics
- Export filters
- Multi-user support

## Author

**Avoy Das**

Frontend and full-stack web developer building practical lead generation systems, business websites, and portfolio-ready SaaS demos.

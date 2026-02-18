# Portfolio v2 (Supabase CMS)

A high-performance, premium portfolio website built with Vite, React, Tailwind CSS v4, and Supabase. This version introduces a private, production-ready CMS for managing all professional content.

## Architecture

- **Frontend**: React 18+ with Vite
- **Styling**: Tailwind CSS v4 (Modern, utility-first)
- **CMS / Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Animations**: Framer Motion (Fluid, premium transitions)

## Key Features

- **Dynamic Content**: Every section (Hero, Projects, Skills, Research) is powered by Supabase.
- **Admin Dashboard**: Secure management at `/masteradmin` with email/password authentication.
- **Premium Design**: Dark mode support, custom scrollbars, and high-quality typography.
- **Secured Data**: Row Level Security (RLS) ensures only YOU can modify your portfolio data.

## Setup Instructions

1. **Environment**: Create a `.env` file with your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. **Database**: Execute the SQL provided in the CMS implementation docs to initialize your tables.
3. **Admin User**: Create an admin user in the Supabase Auth dashboard.
4. **Run**: `npm install` followed by `npm run dev`.

## Directory Structure

- `src/admin`: Private CMS modules and dashboard.
- `src/components`: Reusable, dynamic UI sections.
- `src/lib`: Core service initializations (Supabase).
- `src/data`: (Deprecated) Static JSON data for fallback only.

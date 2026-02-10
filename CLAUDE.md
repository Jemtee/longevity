# CLAUDE.md - Wellspring Longevity Health Dashboard

> AI assistant guide for the Wellspring codebase. Read this before making changes.

## Project Overview

Wellspring is a bilingual (Swedish/English) longevity health dashboard that helps users track biomarkers, view health insights, and access educational content. It targets health-conscious adults aged 30-50, primarily in Sweden/Nordics.

**Current status:** Phase 1 (Foundation & Core Dashboard) — authentication, database schema, dashboard UI, and biomarker tracking are implemented. Phases 2-4 (content hub, AI insights, premium features) are planned but not yet built.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.x with App Router |
| Language | TypeScript 5.x (strict mode) |
| Styling | Tailwind CSS 3.x |
| UI Components | Shadcn/ui (Radix UI primitives + CVA) |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL + Auth + RLS) |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Deployment | Vercel (planned) |

## Quick Reference

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

No test runner is configured yet.

## Project Structure

```
/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (metadata, fonts)
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles + Tailwind directives
│   ├── (auth)/                   # Auth route group (public)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/              # Dashboard route group (protected)
│   │   ├── layout.tsx            # Auth guard + DashboardNav
│   │   └── dashboard/
│   │       ├── page.tsx          # Main dashboard + onboarding
│   │       ├── biomarkers/page.tsx
│   │       ├── insights/page.tsx   # Phase 3 placeholder
│   │       ├── goals/page.tsx      # Coming soon
│   │       └── content/page.tsx    # Phase 2 placeholder
│   └── auth/callback/route.ts   # OAuth callback handler
├── components/
│   ├── ui/                       # Shadcn/ui components (button, card, progress)
│   └── dashboard/
│       └── dashboard-nav.tsx     # Main navigation bar
├── lib/
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   └── supabase/
│       ├── client.ts             # Browser Supabase client
│       └── server.ts             # Server Supabase client + admin client
├── supabase/migrations/          # SQL migration files (001-003)
├── project-fundamentals/         # Product docs (outline, blueprint, plan, changelog)
├── .claude/                      # Claude Code commands and skills
│   ├── commands/                 # /scaffold-page, /add-biomarker, /create-api-route, /new-content
│   └── skills/                   # component-generator, database-migration
├── tailwind.config.js
├── tsconfig.json
├── next.config.ts
├── components.json               # Shadcn/ui config
└── middleware.ts.disabled         # Auth session refresh (currently disabled)
```

## Key Conventions

### Component Patterns

- **Server Components by default.** Pages use `async/await` to fetch data directly on the server.
- **Client Components** are marked with `'use client'` only when interactivity is needed (forms, navigation with state).
- **Shadcn/ui components** use `React.forwardRef` and CVA for variant management. They live in `components/ui/`.
- **Class merging** uses the `cn()` utility from `lib/utils.ts` — always use it instead of raw string concatenation for Tailwind classes.
- **Path alias:** `@/*` maps to the project root (configured in `tsconfig.json`).

### Authentication

- Dashboard routes are protected by a server-side auth check in `app/(dashboard)/layout.tsx`.
- The layout calls `supabase.auth.getUser()` and redirects to `/login` if no user is found.
- Supabase uses the **new API key format**: `sb_publishable_*` (public) and `sb_secret_*` (secret).
- The admin client (`createAdminClient()`) bypasses RLS — use only for admin operations.
- `middleware.ts` is currently disabled (renamed to `.disabled`). Session refresh relies on the layout check.

### Database

- All user data is isolated via **Row-Level Security (RLS)** policies on every table.
- Schema is defined in `supabase/migrations/` with three migration files:
  - `001_initial_schema.sql` — 9 core tables, RLS policies, triggers
  - `002_seed_biomarkers.sql` — 7 categories + 30 biomarkers with reference/optimal ranges
  - `003_test_data.sql` — Development test data
- All content tables support **bilingual fields** (`name_sv`/`name_en`, `description_sv`/`description_en`).
- Core tables: `profiles`, `biomarker_categories`, `biomarkers`, `test_results`, `user_goals`, `ai_insights`, `content_articles`, `uploaded_files`, `bookmarks`.

### Styling

- **Tailwind CSS 3** with custom theme extensions in `tailwind.config.js`.
- Brand colors:
  - Primary: `#0ba5e9` (blue) — full scale at `primary-50` through `primary-900`
  - Secondary: `#bfa094` (warm accent) — at `secondary-500`
  - Success: `#22c55e`, Warning: `#f59e0b`, Error: `#ef4444`
- Fonts: Inter (body), Cal Sans (display headings).
- Border radius default override: `xl` = `0.75rem`.

## Environment Variables

```
# Required — Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=

# Phase 3 — AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Phase 4 — Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Phase 3 — Email
RESEND_API_KEY=
```

Only Supabase variables are required for Phase 1. There is no `.env.example` file; variables are accessed via `process.env` in Supabase client files.

## Important Architectural Decisions

1. **No testing framework yet.** Jest and Playwright are planned but not configured. Do not add test files without first setting up the test runner.
2. **No CI/CD pipelines.** No GitHub Actions or deployment automation exists yet.
3. **Middleware is disabled.** `middleware.ts.disabled` contains session-refresh logic. Auth is currently handled only via the dashboard layout guard.
4. **Bilingual from the start.** All user-facing database content has Swedish and English columns. UI strings are not yet internationalized (hardcoded in English).
5. **Shadcn/ui for components.** Add new UI primitives via `npx shadcn@latest add <component>` — do not create custom primitives that duplicate Shadcn/ui functionality.

## Custom Claude Code Commands

Available slash commands (defined in `.claude/commands/`):

| Command | Purpose |
|---------|---------|
| `/scaffold-page` | Create a new Next.js page following project conventions |
| `/add-biomarker` | Add a biomarker to the seed file and update types |
| `/create-api-route` | Scaffold an API route with auth and error handling |
| `/new-content` | Create an MDX article with bilingual frontmatter |

## Working with This Codebase

### Adding a new page
1. Create `app/(dashboard)/dashboard/<name>/page.tsx` as a Server Component.
2. Add the route to `components/dashboard/dashboard-nav.tsx`.
3. Use existing Shadcn/ui components (`Card`, `Button`, etc.) for UI.

### Adding a new Shadcn/ui component
```bash
npx shadcn@latest add <component-name>
```
This places the component in `components/ui/` with project-consistent styling.

### Adding a database migration
1. Create a new numbered SQL file in `supabase/migrations/` (e.g., `004_<description>.sql`).
2. Include RLS policies for any new tables.
3. Add bilingual columns where content is user-facing.

### Creating a Supabase client
- **Server Components / API Routes:** `import { createClient } from '@/lib/supabase/server'` (async)
- **Client Components:** `import { createClient } from '@/lib/supabase/client'` (sync)
- **Admin operations (bypasses RLS):** `import { createAdminClient } from '@/lib/supabase/server'`

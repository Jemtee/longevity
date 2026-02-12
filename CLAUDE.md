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

---

## Health Domain Knowledge

> Full reference: [`project-fundamentals/health-domain-knowledge.md`](project-fundamentals/health-domain-knowledge.md)

This section summarizes the health domain rules that govern all AI-generated content, insights, recommendations, and nudging logic in Wellspring. The full document contains detailed biomarker tables, citations, gut microbiome science, supplement protocols, and expansion paths.

### Evidence Grading (Mandatory)

Every recommendation the app surfaces must carry a grade:

| Grade | Label | Criteria | UI treatment |
|-------|-------|----------|-------------|
| **A** | Strong | >=2 large RCTs or meta-analyses in top-tier journals | Confident recommendation |
| **B** | Moderate | >=2 cohort studies or 1 well-designed RCT | Standard recommendation with brief caveat |
| **C** | Preliminary | 1 study, small sample, or animal/in-vitro only | "Emerging evidence" label + caveat |
| **D** | Expert opinion | Mechanistic reasoning or clinical consensus, no direct study | "Expert perspective" + disclaimer |

- Never present Grade C/D findings as established fact.
- Always cite: first author, journal, year.
- Include health disclaimer on every insight.
- Prefer Nordic/European reference ranges.

### Biomarker Categories (8 Total)

The app currently seeds 7 categories with 30 biomarkers. A proposed 8th category — **Gut Health** — adds microbiome and digestive markers:

1. **Metabolic** — HbA1c, fasting glucose, fasting insulin (expand: HOMA-IR)
2. **Cardiovascular** — LDL, HDL, triglycerides, ApoB (expand: Lp(a))
3. **Inflammation** — hs-CRP, homocysteine (expand: fibrinogen, IL-6)
4. **Hormones** — TSH, T3/T4, testosterone, estradiol, cortisol (expand: DHEA-S, IGF-1)
5. **Vitamins & Minerals** — Vitamin D, B12, folate, magnesium, iron, ferritin (expand: omega-3 index, zinc)
6. **Kidney & Liver** — creatinine, eGFR, ALT, AST (expand: GGT, cystatin C, albumin)
7. **Physical Performance** — VO2max, body fat %, resting HR, HRV (expand: grip strength, waist circumference, lean mass)
8. **Gut Health** *(proposed)* — fecal calprotectin, microbiome diversity, zonulin, secretory IgA, SCFAs

### Gut Microbiome — Key Principles

The gut microbiome connects to nearly every other biomarker category:

- **Low diversity + high hs-CRP** → systemic inflammation from dysbiosis (Grade A)
- **Low butyrate producers + high insulin** → impaired gut barrier → insulin resistance (Grade B)
- **High TMAO + high ApoB** → gut-derived cardiovascular risk (Grade B)
- **Low Akkermansia + high HbA1c** → metabolic endotoxemia (Grade B)

Probiotics: only recommend strains with human RCT evidence (see full reference for strain-specific table). Nordic-relevant: *L. reuteri* (BioGaia, Swedish), *L. plantarum 299v* (Probi, Swedish), BB-12 (common in Nordic dairy).

Prebiotics: high-fiber diet (>30g/day, Grade A), resistant starch, inulin/FOS, polyphenols.

Fermented foods: the Stanford study (Wastyk et al., Cell, 2021) showed 6 weeks of high-fermented food intake increased microbiome diversity and decreased inflammation (Grade B).

### Nudging Strategy — Expanding Tracking Over Lifetime

Nudges are goal-anchored, evidence-driven, and non-intrusive:

- **Trigger:** User has >=2 data points for an existing marker (shows engagement).
- **Frequency:** Max 1 nudge/week.
- **Tone:** Educational — explain *why* the new marker matters.
- **Seasonal:** Vitamin D in September (Nordics), metabolic reset in spring, fitness check in summer.

Example expansion paths (see full reference for all 6 goal paths):

```
Goal: "Heart health"
  Lipid panel → ApoB → hs-CRP → Lp(a) → Homocysteine → VO2max → Gut Health

Goal: "Gut health"
  Calprotectin → Diversity → sIgA → hs-CRP → SCFAs → Ferritin + B12 → Full metabolic
```

Milestone unlocks: 2 readings = trend arrow, 5+ markers = cross-correlations, 12 months = annual report, gut + blood panel = gut-systemic connections.

### Exercise & Nutrition Rules

- **Exercise:** 150 min/week moderate cardio + 2x/week resistance training are Grade A for longevity. VO2max is the single strongest mortality predictor (Mandsager et al., 2018).
- **Nutrition:** Mediterranean diet is the only Grade A dietary pattern for CVD and mortality reduction (PREDIMED trial). High fiber (>30g/day) is Grade A for microbiome and metabolic health.
- **Supplements:** Food-first approach. Only recommend supplements for documented deficiencies with Grade A/B evidence. Always include dosing, duration-to-retest, and interaction warnings.

### Supplement Guidance

- Vitamin D <50 nmol/L → 2000–4000 IU/day D3 (Grade A; standard Nordic recommendation)
- B12 <200 pmol/L → 1000 µg/day (Grade A)
- Ferritin <30 µg/L → iron bisglycinate 25-50 mg every other day (Grade A; better absorption than daily)
- Homocysteine >12 µmol/L → methylfolate + B12 + B6 (Grade A)
- Omega-3 Index <8% → 2-3g EPA+DHA/day (Grade A)
- Low gut diversity → prebiotic fiber 5-15g/day, titrate slowly (Grade B)

### Environmental Health — PFAS, Cookware & Toxin Exposure

The app assesses environmental exposures and connects them to biomarkers (see full reference for detailed tables):

- **PFAS ("forever chemicals")** from non-stick cookware, water, food packaging → elevated cholesterol (Grade A), thyroid disruption (Grade A), immune suppression (Grade A). Scratched Teflon and unfiltered water are the primary household sources.
- **Cookware safety tiers:** Best = stainless steel, enameled cast iron, glass. Caution = PTFE non-stick. Avoid = scratched non-stick, unlined copper.
- **BPA/phthalates** from heated plastic → hormonal disruption (Grade A). Recommend glass/steel for food storage and reheating.
- **Heavy metals:** Mercury from large fish (limit predatory species), lead from old plumbing, cadmium from smoking/rice.
- **Water filtration:** Activated carbon removes ~60-70% PFAS; reverse osmosis >95%. Relevant for Nordic areas with documented PFAS contamination.

### AI Health Interview (Planned Feature)

A guided conversational assessment across 7 sections that maps user answers to science-graded biomarker and lifestyle recommendations:

1. **Goals & Motivation** — anchors the nudge expansion path
2. **Nutrition & Diet** — maps dietary patterns to metabolic, gut, and inflammatory markers
3. **Cooking & Kitchen Environment** — assesses PFAS, BPA, heavy metal exposure from cookware, water, and food storage
4. **Exercise & Physical Activity** — identifies gaps in cardio, resistance training, VO2max
5. **Sleep & Stress** — connects to cortisol, HRV, insulin sensitivity
6. **Medical History & Medications** — flags nutrient depletion (e.g., metformin → B12) and family risk (→ Lp(a))
7. **Environmental & Home** — localizes contamination risk (old plumbing, industrial proximity)

Every recommendation from the interview carries an evidence grade and citation. The interview generates a **Health Profile** with prioritized biomarker panels, lifestyle insights, environmental flags, and supplement suggestions. Results are stored for the nudge engine and AI insight generator. Re-interview is triggered every 6 months or when new test results conflict with stored answers.

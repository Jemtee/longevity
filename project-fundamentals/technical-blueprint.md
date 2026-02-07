# Wellspring - Technical Blueprint

## Tech Stack Overview

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **State Management:** React Server Components + Zustand + TanStack Query
- **Data Visualization:** Recharts (primary) + Visx (advanced)
- **Deployment:** Vercel

### Backend
- **Platform:** Supabase (BaaS)
- **Database:** PostgreSQL
- **Authentication:** Supabase Auth (JWT + RLS)
- **Storage:** Supabase Storage
- **Functions:** Supabase Edge Functions
- **Deployment:** Supabase Cloud

### AI/ML
- **Primary:** Anthropic Claude Sonnet 4.5 (complex analysis)
- **Secondary:** OpenAI GPT-4o-mini (simple tasks)
- **Strategy:** Hybrid approach with prompt caching

### Additional Services
- **Email:** Resend
- **Payments:** Stripe
- **Analytics:** Vercel Analytics
- **Error Tracking:** Sentry (future)

## Project File Structure

```
/wellspring
├── .claude/                     # Claude Code configuration
│   ├── commands/                # Custom slash commands
│   │   ├── scaffold-page.md
│   │   ├── add-biomarker.md
│   │   └── create-api-route.md
│   └── skills/                  # Reusable skills
│       ├── component-generator.md
│       └── database-migration.md
├── app/                         # Next.js App Router
│   ├── (auth)/                  # Auth route group
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── layout.tsx           # Dashboard layout with nav
│   │   ├── dashboard/page.tsx   # Main dashboard
│   │   ├── biomarkers/
│   │   │   ├── page.tsx        # Biomarker list
│   │   │   └── [id]/page.tsx   # Biomarker detail
│   │   ├── insights/page.tsx
│   │   ├── goals/page.tsx
│   │   ├── upload/page.tsx
│   │   └── settings/page.tsx
│   ├── (content)/               # Public content routes
│   │   └── content/
│   │       ├── page.tsx         # Content hub
│   │       └── [category]/[slug]/page.tsx
│   ├── (marketing)/             # Marketing pages
│   │   ├── page.tsx             # Landing page
│   │   ├── pricing/page.tsx
│   │   └── about/page.tsx
│   ├── (onboarding)/           # Onboarding flow
│   │   └── welcome/page.tsx
│   ├── api/                     # API routes
│   │   ├── insights/
│   │   │   └── generate/route.ts
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts
│   │   │   └── webhook/route.ts
│   │   └── upload/route.ts
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── page.tsx                 # Root page (redirects)
├── components/                  # React components
│   ├── ui/                      # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── dashboard/
│   │   ├── biomarker-card.tsx
│   │   ├── add-result-dialog.tsx
│   │   ├── trend-chart.tsx
│   │   └── stats-overview.tsx
│   ├── content/
│   │   ├── article-card.tsx
│   │   ├── premium-gate.tsx
│   │   └── language-toggle.tsx
│   └── marketing/
│       ├── hero.tsx
│       ├── features.tsx
│       └── pricing-table.tsx
├── content/                     # MDX content files
│   ├── sv/                      # Swedish content
│   │   ├── research/
│   │   ├── protocols/
│   │   └── supplements/
│   └── en/                      # English content
│       ├── research/
│       ├── protocols/
│       └── supplements/
├── lib/                         # Utilities and integrations
│   ├── supabase/
│   │   ├── client.ts            # Client-side Supabase
│   │   ├── server.ts            # Server-side Supabase
│   │   └── middleware.ts        # Auth middleware
│   ├── ai/
│   │   ├── claude.ts            # Claude API client
│   │   ├── openai.ts            # OpenAI API client
│   │   ├── insight-generator.ts # Insight orchestration
│   │   └── prompts/
│   │       ├── biomarker-analysis.ts
│   │       └── protocol-recommendation.ts
│   ├── email/
│   │   └── resend.ts            # Email client
│   ├── stripe/
│   │   └── client.ts            # Stripe integration
│   ├── pdf/
│   │   └── parser.ts            # PDF extraction
│   └── utils.ts                 # General utilities
├── types/                       # TypeScript type definitions
│   ├── database.types.ts        # Supabase generated types
│   ├── biomarker.ts
│   ├── insight.ts
│   └── user.ts
├── supabase/                    # Supabase configuration
│   ├── migrations/              # Database migrations
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_biomarkers_seed.sql
│   │   └── ...
│   └── seed.sql                 # Seed data
├── project-fundamentals/        # Project documentation
│   ├── project-outline.md
│   ├── technical-blueprint.md   # This file
│   ├── project-plan.md
│   └── project-changelog.md
├── public/                      # Static assets
│   ├── images/
│   └── icons/
├── .env.local                   # Environment variables (git-ignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## Database Schema (PostgreSQL)

### Core Tables

#### `profiles`
Extended user information linked to Supabase auth.users
```sql
- id: uuid (FK to auth.users)
- subscription_tier: enum (free, premium)
- language: varchar (sv, en)
- created_at: timestamp
- updated_at: timestamp
- onboarding_completed: boolean
```

#### `biomarker_categories`
Organization of biomarkers
```sql
- id: uuid
- name_en: varchar
- name_sv: varchar
- description: text
- icon: varchar
- display_order: int
```

#### `biomarkers`
Master list of trackable biomarkers
```sql
- id: uuid
- category_id: uuid (FK)
- name_en: varchar
- name_sv: varchar
- unit: varchar (mg/dL, mmol/L, etc.)
- optimal_min: decimal
- optimal_max: decimal
- reference_min: decimal
- reference_max: decimal
- is_premium: boolean
- description_en: text
- description_sv: text
```

#### `test_results`
User's biomarker measurements
```sql
- id: uuid
- user_id: uuid (FK to profiles)
- biomarker_id: uuid (FK)
- value: decimal
- tested_at: date
- source: enum (manual, pdf, api)
- notes: text
- created_at: timestamp
```

#### `uploaded_files`
PDFs and images from users
```sql
- id: uuid
- user_id: uuid (FK)
- file_path: varchar (Supabase Storage)
- file_type: varchar
- file_size: int
- processing_status: enum (pending, processing, completed, failed)
- extracted_data: jsonb
- created_at: timestamp
```

#### `ai_insights`
Generated AI insights
```sql
- id: uuid
- user_id: uuid (FK)
- insight_type: enum (biomarker_analysis, trend_analysis, correlation, protocol, risk_assessment)
- biomarker_ids: uuid[] (array of related biomarkers)
- severity: enum (info, warning, critical, positive)
- title: varchar
- content: text (markdown)
- is_premium: boolean
- created_at: timestamp
- read_at: timestamp
```

#### `content_articles`
Educational content (MDX metadata)
```sql
- id: uuid
- slug: varchar
- language: varchar
- category: varchar
- title: varchar
- description: text
- reading_time: int
- is_premium: boolean
- published_at: timestamp
- updated_at: timestamp
```

#### `user_goals`
Personal health goals
```sql
- id: uuid
- user_id: uuid (FK)
- biomarker_id: uuid (FK)
- target_value: decimal
- target_date: date
- achieved_at: timestamp
- created_at: timestamp
```

#### `bookmarks`
Saved content articles
```sql
- id: uuid
- user_id: uuid (FK)
- article_id: uuid (FK)
- created_at: timestamp
```

### Row-Level Security (RLS)

All tables have RLS policies ensuring users can only access their own data:
- `profiles`: Users can SELECT/UPDATE their own profile
- `test_results`: Users can CRUD their own test results
- `uploaded_files`: Users can CRUD their own files
- `ai_insights`: Users can SELECT their own insights
- `user_goals`: Users can CRUD their own goals
- `bookmarks`: Users can CRUD their own bookmarks
- Public read access: `biomarker_categories`, `biomarkers`, `content_articles`

## Component Breakdown

### Frontend Components

#### Dashboard Components
1. **BiomarkerCard** - Display single biomarker with status indicator
2. **AddResultDialog** - Form for manual data entry
3. **TrendChart** - Line chart for historical biomarker data
4. **StatsOverview** - Summary cards showing key metrics
5. **CorrelationMatrix** - Heatmap showing biomarker relationships (premium)

#### Content Components
1. **ArticleCard** - Content preview with image, title, excerpt
2. **PremiumGate** - Paywall with upgrade CTA
3. **LanguageToggle** - Swedish/English switcher
4. **MDXComponents** - Custom MDX components for rich formatting
5. **SearchBar** - Content search and filtering

#### UI Components (Shadcn/ui)
- Button, Card, Dialog, Input, Label
- Select, Tabs, Toast, Tooltip
- Badge, Avatar, Dropdown Menu
- Chart, Table, Skeleton

### Backend Components

#### API Routes
1. **POST /api/insights/generate** - Generate AI insight
2. **POST /api/upload** - Upload and parse PDF
3. **POST /api/stripe/checkout** - Create Stripe checkout session
4. **POST /api/stripe/webhook** - Handle Stripe webhooks
5. **GET /api/export/data** - Export user data (CSV)

#### Supabase Edge Functions
1. **generate-insights** - Batch AI insight generation
2. **send-digest-email** - Weekly email digest
3. **process-pdf** - PDF extraction and parsing

#### AI Components
1. **InsightGenerator** - Orchestrates AI calls
2. **Claude Client** - Claude API wrapper
3. **OpenAI Client** - OpenAI API wrapper
4. **Prompt Templates** - Reusable prompt structures
5. **Cost Monitor** - Track AI API usage

## Data Flow

### Biomarker Tracking Flow
1. User adds test result via AddResultDialog
2. Client-side validation
3. Server action saves to `test_results` table
4. Triggers AI insight generation (async)
5. Dashboard updates with new data point
6. Chart re-renders with updated trend

### AI Insight Generation Flow
1. Trigger event (new result, manual request, scheduled)
2. Fetch user context (profile, biomarkers, recent results)
3. Check subscription tier (determines AI model)
4. Build prompt with cached context
5. Call AI API (Claude or OpenAI)
6. Parse and structure response
7. Save to `ai_insights` table
8. Send notification (optional)

### Content Rendering Flow
1. User navigates to content hub
2. Server fetches MDX files from filesystem
3. Filter by language and category
4. Check premium status for gated content
5. Render MDX with custom components
6. Track reading time and engagement

## Integration Points

### Supabase Integration
- Authentication (login, signup, password reset)
- Database queries (CRUD operations)
- Real-time subscriptions (live dashboard updates)
- Storage (PDF uploads, user avatars)
- RLS policies (data isolation)

### AI Integration
- Claude API for deep biomarker analysis
- OpenAI API for quick insights
- Prompt caching for cost optimization
- Batch processing for efficiency

### Stripe Integration
- Checkout session creation
- Subscription management
- Webhook handling (payment events)
- Customer portal access

### Werlabs Integration (Future)
- OAuth authentication
- API data sync
- Automatic biomarker import
- Test result notifications

## Security Considerations

### Authentication & Authorization
- JWT-based auth with Supabase
- httpOnly cookies for token storage
- Row-Level Security for data isolation
- Email verification required
- Rate limiting on API routes

### Data Protection
- Encryption at rest (Supabase AES-256)
- Encryption in transit (HTTPS/TLS)
- GDPR compliance (export, deletion)
- HIPAA best practices
- No PHI in logs or error messages

### AI Security
- User consent for AI analysis
- Data minimization (only send relevant context)
- No PII in AI prompts where avoidable
- Audit logging for AI operations

## Performance Optimization

### Frontend
- Server components by default
- Client components only when needed
- Image optimization (Next.js Image)
- Code splitting and lazy loading
- Bundle size monitoring

### Backend
- Database query optimization (indexes)
- Connection pooling (Supabase)
- Prompt caching (90% cost reduction)
- CDN for static assets (Vercel Edge)

### Monitoring
- Vercel Analytics for performance
- Lighthouse CI in deployment pipeline
- AI cost tracking dashboard
- Error tracking with Sentry

---

**Last Updated:** 2026-02-07
**Status:** Active Development - Phase 1 (Foundation & Core Dashboard)

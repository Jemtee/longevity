# Wellspring

**Your longevity health dashboard** - Track biomarkers, get AI-powered insights, and learn about longevity science.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies:**
```bash
cd wellspring
npm install
```

2. **Set up environment variables:**
Copy `.env.local` and add your Supabase credentials (already done if following setup).

3. **Apply database migrations:**
- Go to your Supabase Dashboard
- Navigate to SQL Editor
- Run migrations in order:
  - `001_initial_schema.sql`
  - `002_seed_biomarkers.sql`
  - `003_test_data.sql` (optional, for development)

4. **Create test user (Development):**
- Go to Supabase Dashboard → Auth → Add User
- Email: `test@wellspring.health`
- Password: `Test123!@#`
- ✅ Auto Confirm User: **YES** (skip email verification)

5. **Start development server:**
```bash
npm run dev
```

6. **Open browser:**
Visit http://localhost:3000

## 🧪 Testing

### Test Credentials
- **Email:** test@wellspring.health
- **Password:** Test123!@#

### Test Flow
1. Visit http://localhost:3000 → Redirects to /login
2. Login with test credentials
3. Explore dashboard, add biomarkers, etc.

## 📁 Project Structure

```
wellspring/
├── .claude/              # Claude Code utilities
├── app/                  # Next.js App Router
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Protected dashboard
│   ├── auth/            # Auth callbacks
│   └── api/             # API routes
├── components/           # React components
│   ├── ui/              # Shadcn/ui components
│   └── dashboard/       # Dashboard components
├── lib/                  # Utilities
│   └── supabase/        # Supabase clients
├── supabase/            # Database migrations
├── project-fundamentals/ # Documentation
└── public/              # Static assets
```

## 🛠 Tech Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **UI:** Shadcn/ui, Radix UI
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **AI:** Claude Sonnet 4.5, OpenAI GPT-4o-mini
- **Deployment:** Vercel

## 📚 Documentation

See `project-fundamentals/` for comprehensive documentation:
- **project-outline.md** - Vision and use cases
- **technical-blueprint.md** - Architecture details
- **project-plan.md** - Implementation roadmap
- **project-changelog.md** - Version history

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Claude Code Commands
- `/scaffold-page` - Create new Next.js page
- `/add-biomarker` - Add biomarker to database
- `/create-api-route` - Scaffold API route
- `/new-content` - Create MDX content article

See `.claude/README.md` for full list of commands and skills.

## 🌐 Environment Variables

```env
# Supabase (New API Key Format)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...

# AI APIs (Phase 3)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# Stripe (Phase 4)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Email (Phase 3)
RESEND_API_KEY=re_...
```

## 🗄 Database Schema

### Core Tables
- `profiles` - User subscriptions and preferences
- `biomarker_categories` - Organization (7 categories)
- `biomarkers` - Master list (30 longevity biomarkers)
- `test_results` - User measurements over time
- `uploaded_files` - PDF uploads
- `ai_insights` - AI-generated insights
- `content_articles` - Educational content
- `user_goals` - Health targets
- `bookmarks` - Saved articles

All tables have Row-Level Security (RLS) policies for data isolation.

## 🔐 Authentication

- Email/Password authentication
- OAuth (Google) - configured but needs provider setup
- Magic links (email)
- Password reset flow

## 🎨 Brand Colors

```css
Primary: #0ba5e9 (calming blue)
Secondary: #bfa094 (warm accent)
Success: #22c55e (vibrant green)
Warning: #f59e0b (soft amber)
Error: #ef4444 (muted red)
```

## 📈 Current Status

**Version:** 0.1.0
**Phase:** 1 - Foundation & Core Dashboard
**Progress:** ~25% complete

### ✅ Completed
- Project setup and configuration
- Database schema with 30 biomarkers
- Authentication system
- Dashboard layout and navigation
- Supabase integration (new API key format)

### 🚧 In Progress
- Biomarker tracking components
- Data visualization with charts

### 📋 Upcoming
- Educational content hub (Phase 2)
- AI insights engine (Phase 3)
- Premium features (Phase 4)

## 🤝 Contributing

This is a learning/development project. See `project-fundamentals/project-plan.md` for roadmap.

## 📄 License

ISC

## 🔗 Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Project Documentation](./project-fundamentals/)

---

**Built with Claude Code** 🤖

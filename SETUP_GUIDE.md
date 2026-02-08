# Wellspring Setup Guide

## Step 1: Apply Database Migrations

You need to run the SQL migrations in your Supabase Dashboard:

### 1. Open Supabase SQL Editor
Visit: https://supabase.com/dashboard/project/imuozaeuevkpsnkkghfx/sql/new

### 2. Run Migration 001 - Initial Schema
Copy the entire contents of `supabase/migrations/001_initial_schema.sql` and run it.

This creates:
- 9 tables (profiles, biomarkers, test_results, etc.)
- Row-Level Security policies
- Triggers for auto-creating profiles
- Utility functions

### 3. Run Migration 002 - Seed Biomarkers
Copy the entire contents of `supabase/migrations/002_seed_biomarkers.sql` and run it.

This inserts:
- 7 biomarker categories
- 30 common longevity biomarkers with reference ranges

### 4. Verify Setup
Run this query to verify:
```sql
SELECT COUNT(*) FROM biomarkers;
```
You should see: **30 biomarkers**

---

## Step 2: Create Test User

### Option A: Manual Creation (Recommended)
1. Go to: https://supabase.com/dashboard/project/imuozaeuevkpsnkkghfx/auth/users
2. Click "Add User"
3. Enter:
   - **Email:** test@wellspring.health
   - **Password:** Test123!@#
   - ✅ **Auto Confirm User:** YES (important!)
4. Click "Create User"

### Option B: Use Signup Page
1. Visit http://localhost:3000/signup
2. Sign up with any email
3. Check your email for confirmation link (unless you disabled email confirmation)

---

## Step 3: Configure Email Settings (Optional)

To skip email verification during development:

1. Go to: https://supabase.com/dashboard/project/imuozaeuevkpsnkkghfx/auth/providers
2. Scroll to "Email Auth"
3. **Enable "Confirm email"** - Set to OFF for development
4. Save changes

Now signups won't require email confirmation.

---

## Step 4: Test Login

1. Visit http://localhost:3000
2. Click "Sign In"
3. Enter:
   - Email: test@wellspring.health
   - Password: Test123!@#
4. You should be redirected to the dashboard!

---

## Troubleshooting

### "Invalid login credentials"
- Make sure you created the test user with "Auto Confirm User" enabled
- Check that the password is exactly: `Test123!@#`
- Verify the user exists in Auth → Users

### "Error connecting to database"
- Make sure migrations have been run
- Check that .env.local has correct Supabase credentials
- Verify your Supabase project is active

### "You must confirm your email"
- Either enable "Auto Confirm User" when creating the test user
- OR disable email confirmation in Auth settings
- OR check your email for the confirmation link

### Database tables don't exist
- You need to run the migrations in SQL Editor first
- Make sure to run 001 before 002

---

## Quick Command Reference

```bash
# Start dev server
npm run dev

# View logs
# Check terminal where npm run dev is running

# Kill dev server
# Press Ctrl+C in terminal
```

---

## Next Steps

Once you're logged in:
1. Explore the dashboard
2. Try adding biomarker data (coming soon in Phase 1)
3. View charts and insights (coming soon)

See `README.md` for full documentation.

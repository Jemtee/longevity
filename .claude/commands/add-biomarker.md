# Add Biomarker Command

Add a new biomarker to the database seed file and update TypeScript types.

## What this command does:
1. Adds biomarker entry to seed data
2. Updates TypeScript type definitions
3. Includes proper category assignment
4. Adds reference ranges and units
5. Supports bilingual names (Swedish/English)

## Usage:
`/add-biomarker [biomarker-name]`

Example: `/add-biomarker "HbA1c"`

## Information needed:
- Biomarker name (English)
- Biomarker name (Swedish)
- Category (Metabolic, Cardiovascular, Hormones, etc.)
- Unit (mg/dL, mmol/L, etc.)
- Reference range (min/max)
- Optimal range (min/max)
- Is premium feature?
- Description (English & Swedish)

When you run this command, I will:
1. Ask for all required biomarker information
2. Add to supabase/seed.sql
3. Update TypeScript types
4. Verify no duplicates exist
5. Add to git staging

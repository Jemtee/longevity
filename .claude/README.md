# Wellspring Claude Code Utilities

This directory contains custom Claude Code commands and reusable skills for the Wellspring project.

## Slash Commands

Slash commands are quick shortcuts to perform common tasks. Use them by typing `/command-name` in your conversation with Claude.

### Available Commands:

#### `/scaffold-page`
Create a new Next.js page with proper structure following Wellspring conventions.
- **Usage:** `/scaffold-page [route-path] [page-name]`
- **Example:** `/scaffold-page app/(dashboard)/biomarkers Biomarkers`

#### `/add-biomarker`
Add a new biomarker to the database seed file and update TypeScript types.
- **Usage:** `/add-biomarker [biomarker-name]`
- **Example:** `/add-biomarker "HbA1c"`

#### `/create-api-route`
Scaffold a new Next.js API route with authentication and proper error handling.
- **Usage:** `/create-api-route [route-path] [http-methods]`
- **Example:** `/create-api-route app/api/insights/generate POST`

#### `/new-content`
Create a new MDX content article with proper frontmatter and bilingual support.
- **Usage:** `/new-content [category] [title]`
- **Example:** `/new-content research "Understanding HbA1c Levels"`

## Reusable Skills

Skills are specialized capabilities that Claude can use when performing tasks. These are automatically available when relevant.

### Available Skills:

#### `component-generator`
Generate React components following Wellspring conventions and best practices.
- Creates TypeScript components with proper types
- Includes Shadcn/ui styling
- Follows brand guidelines
- Implements accessibility features

#### `database-migration`
Create Supabase database migrations with proper schema, indexes, and RLS policies.
- Generates SQL migration files
- Implements Row-Level Security
- Creates proper indexes
- Sets up foreign keys

## Usage Tips

1. **Slash Commands:** Type `/` to see available commands
2. **Skills:** Claude automatically uses skills when appropriate
3. **Customization:** Edit .md files to customize behavior
4. **Adding New:** Create new .md files following the same format

## File Structure

```
.claude/
├── commands/           # Slash commands
│   ├── scaffold-page.md
│   ├── add-biomarker.md
│   ├── create-api-route.md
│   └── new-content.md
├── skills/             # Reusable skills
│   ├── component-generator.md
│   └── database-migration.md
└── README.md          # This file
```

## Creating Custom Commands

To create a new slash command:

1. Create a new .md file in `.claude/commands/`
2. Name it descriptively (e.g., `deploy-production.md`)
3. Include:
   - Description of what it does
   - Usage instructions
   - Examples
   - What information is needed

## Creating Custom Skills

To create a new skill:

1. Create a new .md file in `.claude/skills/`
2. Name it descriptively (e.g., `email-template-generator.md`)
3. Include:
   - Capabilities
   - Standards to follow
   - Code templates
   - Best practices

## Contributing

When adding new commands or skills:
- Keep descriptions clear and concise
- Include practical examples
- Follow existing formatting
- Update this README

---

**Project:** Wellspring - Longevity Health Dashboard
**Created:** 2026-02-07
**Status:** Active Development

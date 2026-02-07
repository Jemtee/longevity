# Scaffold Page Command

Create a new Next.js page with proper structure following Wellspring conventions.

## What this command does:
1. Creates a new page.tsx file in the app directory
2. Includes proper TypeScript types
3. Adds metadata export for SEO
4. Includes basic layout structure
5. Follows Wellspring brand styling

## Usage:
`/scaffold-page [route-path] [page-name]`

Example: `/scaffold-page app/(dashboard)/biomarkers Biomarkers`

## Template Structure:
- Import necessary dependencies
- Export metadata with proper title/description
- Create main component with Wellspring styling
- Include responsive layout
- Add placeholder content

When you run this command, I will:
1. Ask for the route path if not provided
2. Ask for the page display name
3. Create the page file with proper structure
4. Add to git staging

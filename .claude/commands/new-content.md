# New Content Command

Create a new MDX content article with proper frontmatter and bilingual support.

## What this command does:
1. Creates new .mdx files for both Swedish and English
2. Includes proper frontmatter (title, description, category, etc.)
3. Adds boilerplate MDX structure
4. Generates unique slug
5. Sets up for Contentlayer processing

## Usage:
`/new-content [category] [title]`

Example: `/new-content research "Understanding HbA1c Levels"`

## Categories:
- research
- protocols
- supplements
- news

## Frontmatter included:
- title (sv/en)
- slug
- description (sv/en)
- category
- tags
- reading_time
- is_premium
- published_at
- author

## MDX Components available:
- Callout (info, warning, success)
- CodeBlock
- Image with caption
- SourceCitation
- RelatedArticles

When you run this command, I will:
1. Ask for category and title
2. Generate slug from title
3. Ask for description and tags
4. Create both Swedish and English .mdx files
5. Add placeholder content structure
6. Add to git staging

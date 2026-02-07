# Recommended Plugins for Wellspring Development

This document lists recommended VS Code extensions and tools that will improve your development experience with Wellspring.

## 🎯 Essential Extensions

### 1. **ESLint**
- **ID:** `dbaeumer.vscode-eslint`
- **Why:** Automatic code linting with Next.js ESLint config
- **Status:** Already configured in project

### 2. **Tailwind CSS IntelliSense**
- **ID:** `bradlc.vscode-tailwindcss`
- **Why:** Autocomplete for Tailwind classes, color previews, linting
- **Must-have:** Yes

### 3. **Prettier - Code Formatter**
- **ID:** `esbenp.prettier-vscode`
- **Why:** Consistent code formatting
- **Recommended Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 🚀 Productivity Boosters

### 4. **GitHub Copilot**
- **ID:** `GitHub.copilot`
- **Why:** AI-powered code suggestions (especially useful with TypeScript)
- **Alternatives:** Codeium, TabNine

### 5. **Error Lens**
- **ID:** `usernamehw.errorlens`
- **Why:** Shows errors inline in your code (great for TypeScript)

### 6. **Auto Rename Tag**
- **ID:** `formulahendry.auto-rename-tag`
- **Why:** Automatically rename paired HTML/JSX tags

### 7. **Import Cost**
- **ID:** `wix.vscode-import-cost`
- **Why:** See bundle impact of imports (important for Next.js performance)

## 🗄 Database & Backend

### 8. **Supabase** (Official)
- **ID:** `Supabase.supabase-vscode`
- **Why:** Manage Supabase projects, run migrations, test RLS policies
- **Features:**
  - SQL syntax highlighting
  - Run migrations from VS Code
  - Generate TypeScript types

### 9. **PostgreSQL**
- **ID:** `ckolkman.vscode-postgres`
- **Why:** Connect directly to Supabase PostgreSQL database
- **Setup:** Use your Supabase connection string

### 10. **Thunder Client** (Optional)
- **ID:** `rangav.vscode-thunder-client`
- **Why:** Test API routes without leaving VS Code
- **Alternative:** Postman, Insomnia

## 🎨 UI/UX Development

### 11. **React Developer Tools** (Browser)
- **Why:** Inspect React component tree, props, state
- **Install:** As browser extension (Chrome/Firefox)

### 12. **Color Highlight**
- **ID:** `naumovs.color-highlight`
- **Why:** Highlight colors in your code (useful for Tailwind config)

### 13. **SVG Preview**
- **ID:** `SimonSiefke.svg-preview`
- **Why:** Preview SVG icons in VS Code

## 📝 Markdown & Documentation

### 14. **Markdown All in One**
- **ID:** `yzhang.markdown-all-in-one`
- **Why:** Better markdown editing experience
- **Useful for:** Editing MDX content, documentation

### 15. **MDX**
- **ID:** `unifiedjs.vscode-mdx`
- **Why:** Syntax highlighting for MDX files

## 🧪 Testing & Quality

### 16. **Jest**
- **ID:** `Orta.vscode-jest`
- **Why:** Run Jest tests in VS Code (Phase 1+ testing)

### 17. **Playwright Test for VSCode**
- **ID:** `ms-playwright.playwright`
- **Why:** Run E2E tests in VS Code (Phase 4)

## 🔧 Git & Version Control

### 18. **GitLens**
- **ID:** `eamodio.gitlens`
- **Why:** Supercharge Git (blame, history, file comparison)
- **Note:** Free version is sufficient

### 19. **Conventional Commits**
- **ID:** `vivaxy.vscode-conventional-commits`
- **Why:** Help write semantic commit messages
- **Matches:** Our commit style (feat:, fix:, docs:, etc.)

## 🌐 Web Development

### 20. **Live Server** (Optional)
- **ID:** `ritwickdey.LiveServer`
- **Why:** Quick preview of static files
- **Note:** Not needed for Next.js dev server

### 21. **REST Client**
- **ID:** `humao.rest-client`
- **Why:** Test HTTP requests in .http files
- **Example:**
```http
### Login
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@wellspring.health",
  "password": "Test123!@#"
}
```

## 🎯 Claude Code Specific

### 22. **Claude Code CLI** (Already installed)
- **Why:** You're using it! Powers the AI development experience
- **Features:** Commands, skills, MCP servers

## 📦 Quick Install Script

Copy this to your `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "GitHub.copilot",
    "usernamehw.errorlens",
    "formulahendry.auto-rename-tag",
    "wix.vscode-import-cost",
    "Supabase.supabase-vscode",
    "ckolkman.vscode-postgres",
    "naumovs.color-highlight",
    "yzhang.markdown-all-in-one",
    "unifiedjs.vscode-mdx",
    "eamodio.gitlens",
    "vivaxy.vscode-conventional-commits"
  ]
}
```

## 🔧 VS Code Settings

Add these to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

## 🎨 Theme Recommendations

**Light Themes:**
- GitHub Light
- One Light Pro

**Dark Themes:**
- GitHub Dark (matches GitHub UI)
- One Dark Pro
- Night Owl

**Our Pick:** GitHub Dark (clean, professional, matches brand)

## 🚀 Performance Tips

1. **Disable unused extensions** - Only enable what you need
2. **Exclude node_modules** - Already in .gitignore
3. **Use TypeScript project references** - Faster IntelliSense
4. **Enable Turbopack** - Already configured (Next.js dev mode)

---

## Installation

1. **Automatic (Recommended):**
   - Open Command Palette (Cmd/Ctrl + Shift + P)
   - Type "Extensions: Show Recommended Extensions"
   - Click "Install All"

2. **Manual:**
   - Copy extension IDs from above
   - Search in Extensions panel
   - Install individually

3. **CLI:**
```bash
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dbaeumer.vscode-eslint
# ... etc
```

---

**Last Updated:** 2026-02-07
**Status:** Recommended for Phase 1+

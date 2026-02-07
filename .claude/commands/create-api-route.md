# Create API Route Command

Scaffold a new Next.js API route with authentication and proper error handling.

## What this command does:
1. Creates new route.ts file in app/api directory
2. Includes Supabase authentication check
3. Adds proper TypeScript types for request/response
4. Implements error handling
5. Includes request validation
6. Follows Next.js 14 App Router conventions

## Usage:
`/create-api-route [route-path] [http-methods]`

Example: `/create-api-route app/api/insights/generate POST`

## Template includes:
- Import Supabase server client
- Authentication verification
- Request body validation
- Try-catch error handling
- Proper HTTP status codes
- TypeScript types for request/response
- CORS headers if needed

## HTTP Methods supported:
- GET
- POST
- PUT
- PATCH
- DELETE

When you run this command, I will:
1. Ask for route path and methods
2. Create route file with selected methods
3. Add authentication middleware
4. Include proper error handling
5. Add to git staging

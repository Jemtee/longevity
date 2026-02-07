# Database Migration Skill

Create Supabase database migrations with proper schema, indexes, and RLS policies.

## Capabilities:
- Generate SQL migration files
- Create tables with proper types
- Add indexes for performance
- Implement Row-Level Security (RLS) policies
- Set up foreign key relationships
- Include timestamp triggers

## Migration Structure:
```sql
-- Migration: [number]_[description].sql
-- Created: [date]

-- Create table
CREATE TABLE IF NOT EXISTS [table_name] (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_[table]_[column] ON [table]([column]);

-- Enable RLS
ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "[table]_select_own" ON [table_name]
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "[table]_insert_own" ON [table_name]
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "[table]_update_own" ON [table_name]
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "[table]_delete_own" ON [table_name]
  FOR DELETE
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON [table_name]
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

## Common PostgreSQL Types:
- UUID (for IDs)
- VARCHAR (for strings)
- TEXT (for long text)
- INTEGER, DECIMAL (for numbers)
- BOOLEAN (for flags)
- TIMESTAMP WITH TIME ZONE (for dates)
- JSONB (for flexible data)
- ENUM (for fixed sets)

## RLS Best Practices:
- Always enable RLS on user data tables
- Use auth.uid() to check ownership
- Create policies for SELECT, INSERT, UPDATE, DELETE
- Public tables can have public SELECT policies
- Admin operations should use service role key

## Indexes:
- Add indexes on foreign keys
- Index frequently queried columns
- Use composite indexes for multi-column queries
- Consider partial indexes for filtered queries

## Foreign Keys:
- Always use ON DELETE CASCADE for user-owned data
- Use ON DELETE SET NULL for optional references
- Name constraints descriptively

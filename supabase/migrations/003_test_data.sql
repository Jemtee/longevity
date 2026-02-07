-- Test Data for Development
-- Migration: 003_test_data.sql
-- Created: 2026-02-07
-- Description: Create test user and sample data for development

-- ============================================================================
-- TEST USER
-- Email: test@wellspring.health
-- Password: Test123!@#
-- NOTE: This should only be run in development environments!
-- ============================================================================

-- Insert test user into auth.users (requires admin access)
-- You'll need to create this user manually via Supabase Dashboard:
-- Auth -> Users -> Add User
-- Email: test@wellspring.health
-- Password: Test123!@#

-- For now, we'll create a comment with instructions
-- The profile will be auto-created by the trigger when you sign up

COMMENT ON TABLE profiles IS 'Test user: test@wellspring.health / Test123!@#';

-- ============================================================================
-- SAMPLE TEST RESULTS
-- These will be inserted once you have the test user ID
-- ============================================================================

-- Note: Replace 'YOUR_TEST_USER_ID' with actual user ID after creating test user
-- You can get this from Supabase Dashboard -> Auth -> Users

-- Example test results (uncomment and update user_id after creating test user):
/*
-- Sample HbA1c results
INSERT INTO test_results (user_id, biomarker_id, value, tested_at, source, notes) VALUES
  ('YOUR_TEST_USER_ID', 'b0000001-0000-0000-0000-000000000001', 32.0, '2026-01-15', 'manual', 'Optimal range'),
  ('YOUR_TEST_USER_ID', 'b0000001-0000-0000-0000-000000000001', 34.0, '2025-10-15', 'manual', 'Previous test'),
  ('YOUR_TEST_USER_ID', 'b0000001-0000-0000-0000-000000000001', 38.0, '2025-07-15', 'manual', 'Starting point');

-- Sample Cholesterol results
INSERT INTO test_results (user_id, biomarker_id, value, tested_at, source) VALUES
  ('YOUR_TEST_USER_ID', 'b0000004-0000-0000-0000-000000000004', 4.2, '2026-01-15', 'manual'),
  ('YOUR_TEST_USER_ID', 'b0000005-0000-0000-0000-000000000005', 2.1, '2026-01-15', 'manual'),
  ('YOUR_TEST_USER_ID', 'b0000006-0000-0000-0000-000000000006', 1.8, '2026-01-15', 'manual');

-- Sample Vitamin D
INSERT INTO test_results (user_id, biomarker_id, value, tested_at, source) VALUES
  ('YOUR_TEST_USER_ID', 'b0000017-0000-0000-0000-000000000017', 85.0, '2026-01-15', 'manual');
*/

-- ============================================================================
-- INSTRUCTIONS
-- ============================================================================

-- To create test user with data:
-- 1. Go to Supabase Dashboard -> Auth -> Add User
-- 2. Email: test@wellspring.health
-- 3. Password: Test123!@#
-- 4. Auto Confirm User: YES
-- 5. Copy the user ID
-- 6. Run the INSERT statements above with your user ID

-- Wellspring Database Schema
-- Migration: 001_initial_schema.sql
-- Created: 2026-02-07
-- Description: Initial database schema with profiles, biomarkers, test results, and core tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PROFILES TABLE
-- Extended user information linked to auth.users
-- ============================================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  language VARCHAR(2) DEFAULT 'en' CHECK (language IN ('sv', 'en')),
  onboarding_completed BOOLEAN DEFAULT false,
  stripe_customer_id VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_subscription ON profiles(subscription_tier);
CREATE INDEX idx_profiles_stripe_customer ON profiles(stripe_customer_id);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Trigger
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- BIOMARKER CATEGORIES TABLE
-- Organization of biomarkers into categories
-- ============================================================================

CREATE TABLE IF NOT EXISTS biomarker_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_sv VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_sv TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy (public read)
ALTER TABLE biomarker_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "biomarker_categories_select_all" ON biomarker_categories
  FOR SELECT
  USING (true);

-- ============================================================================
-- BIOMARKERS TABLE
-- Master list of trackable biomarkers
-- ============================================================================

CREATE TABLE IF NOT EXISTS biomarkers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES biomarker_categories(id) ON DELETE SET NULL,
  name_en VARCHAR(100) NOT NULL,
  name_sv VARCHAR(100) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  optimal_min DECIMAL(10, 2),
  optimal_max DECIMAL(10, 2),
  reference_min DECIMAL(10, 2),
  reference_max DECIMAL(10, 2),
  is_premium BOOLEAN DEFAULT false,
  description_en TEXT,
  description_sv TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_biomarkers_category ON biomarkers(category_id);
CREATE INDEX idx_biomarkers_premium ON biomarkers(is_premium);

-- RLS Policy (public read)
ALTER TABLE biomarkers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "biomarkers_select_all" ON biomarkers
  FOR SELECT
  USING (true);

-- ============================================================================
-- TEST RESULTS TABLE
-- User's biomarker measurements
-- ============================================================================

CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  biomarker_id UUID REFERENCES biomarkers(id) ON DELETE CASCADE NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  tested_at DATE NOT NULL,
  source VARCHAR(20) DEFAULT 'manual' CHECK (source IN ('manual', 'pdf', 'api')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_test_results_user ON test_results(user_id);
CREATE INDEX idx_test_results_biomarker ON test_results(biomarker_id);
CREATE INDEX idx_test_results_tested_at ON test_results(tested_at);
CREATE INDEX idx_test_results_user_biomarker ON test_results(user_id, biomarker_id);

-- RLS Policies
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "test_results_select_own" ON test_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "test_results_insert_own" ON test_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "test_results_update_own" ON test_results
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "test_results_delete_own" ON test_results
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger
CREATE TRIGGER set_test_results_updated_at
  BEFORE UPDATE ON test_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- UPLOADED FILES TABLE
-- PDFs and images from users
-- ============================================================================

CREATE TABLE IF NOT EXISTS uploaded_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER NOT NULL,
  processing_status VARCHAR(20) DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  extracted_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_uploaded_files_user ON uploaded_files(user_id);
CREATE INDEX idx_uploaded_files_status ON uploaded_files(processing_status);

-- RLS Policies
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "uploaded_files_select_own" ON uploaded_files
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "uploaded_files_insert_own" ON uploaded_files
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "uploaded_files_update_own" ON uploaded_files
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "uploaded_files_delete_own" ON uploaded_files
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger
CREATE TRIGGER set_uploaded_files_updated_at
  BEFORE UPDATE ON uploaded_files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- AI INSIGHTS TABLE
-- Generated AI insights
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  insight_type VARCHAR(50) NOT NULL CHECK (insight_type IN ('biomarker_analysis', 'trend_analysis', 'correlation', 'protocol', 'risk_assessment')),
  biomarker_ids UUID[] NOT NULL,
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'critical', 'positive')),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_insights_user ON ai_insights(user_id);
CREATE INDEX idx_ai_insights_type ON ai_insights(insight_type);
CREATE INDEX idx_ai_insights_severity ON ai_insights(severity);
CREATE INDEX idx_ai_insights_created ON ai_insights(created_at DESC);

-- RLS Policies
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_insights_select_own" ON ai_insights
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "ai_insights_update_own" ON ai_insights
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- CONTENT ARTICLES TABLE
-- Educational content metadata (MDX files)
-- ============================================================================

CREATE TABLE IF NOT EXISTS content_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  language VARCHAR(2) NOT NULL CHECK (language IN ('sv', 'en')),
  category VARCHAR(50) NOT NULL CHECK (category IN ('research', 'protocols', 'supplements', 'news')),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  reading_time INTEGER,
  is_premium BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_content_articles_slug ON content_articles(slug);
CREATE INDEX idx_content_articles_category ON content_articles(category);
CREATE INDEX idx_content_articles_language ON content_articles(language);
CREATE INDEX idx_content_articles_published ON content_articles(published_at DESC);

-- RLS Policy (public read for non-premium)
ALTER TABLE content_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "content_articles_select_all" ON content_articles
  FOR SELECT
  USING (true);

-- Trigger
CREATE TRIGGER set_content_articles_updated_at
  BEFORE UPDATE ON content_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- USER GOALS TABLE
-- Personal health goals
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  biomarker_id UUID REFERENCES biomarkers(id) ON DELETE CASCADE NOT NULL,
  target_value DECIMAL(10, 2) NOT NULL,
  target_date DATE,
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_goals_user ON user_goals(user_id);
CREATE INDEX idx_user_goals_biomarker ON user_goals(biomarker_id);
CREATE INDEX idx_user_goals_target_date ON user_goals(target_date);

-- RLS Policies
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_goals_select_own" ON user_goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_goals_insert_own" ON user_goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_goals_update_own" ON user_goals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "user_goals_delete_own" ON user_goals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger
CREATE TRIGGER set_user_goals_updated_at
  BEFORE UPDATE ON user_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- BOOKMARKS TABLE
-- Saved content articles
-- ============================================================================

CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  article_id UUID REFERENCES content_articles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Indexes
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_article ON bookmarks(article_id);

-- RLS Policies
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookmarks_select_own" ON bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_insert_own" ON bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_delete_own" ON bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS
-- Utility functions for common operations
-- ============================================================================

-- Function to get latest test result for a biomarker
CREATE OR REPLACE FUNCTION get_latest_test_result(p_user_id UUID, p_biomarker_id UUID)
RETURNS TABLE (
  value DECIMAL,
  tested_at DATE,
  source VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT tr.value, tr.tested_at, tr.source
  FROM test_results tr
  WHERE tr.user_id = p_user_id AND tr.biomarker_id = p_biomarker_id
  ORDER BY tr.tested_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to count unread insights
CREATE OR REPLACE FUNCTION count_unread_insights(p_user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM ai_insights
    WHERE user_id = p_user_id AND read_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- INITIAL DATA SETUP
-- Auto-create profile on user signup
-- ============================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE profiles IS 'Extended user information and subscription details';
COMMENT ON TABLE biomarker_categories IS 'Organization categories for biomarkers';
COMMENT ON TABLE biomarkers IS 'Master list of all trackable biomarkers';
COMMENT ON TABLE test_results IS 'User biomarker measurements over time';
COMMENT ON TABLE uploaded_files IS 'PDF test results and file uploads';
COMMENT ON TABLE ai_insights IS 'AI-generated personalized health insights';
COMMENT ON TABLE content_articles IS 'Educational content metadata';
COMMENT ON TABLE user_goals IS 'Personal health improvement goals';
COMMENT ON TABLE bookmarks IS 'User-saved articles';

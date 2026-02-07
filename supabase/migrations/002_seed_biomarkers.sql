-- Wellspring Biomarker Seed Data
-- Migration: 002_seed_biomarkers.sql
-- Created: 2026-02-07
-- Description: Seed biomarker categories and common longevity biomarkers

-- ============================================================================
-- BIOMARKER CATEGORIES
-- ============================================================================

INSERT INTO biomarker_categories (id, name_en, name_sv, description_en, description_sv, icon, display_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Metabolic', 'Metabolisk', 'Blood sugar, insulin, and metabolic health markers', 'Blodsocker, insulin och metabola hälsomarkörer', 'activity', 1),
  ('22222222-2222-2222-2222-222222222222', 'Cardiovascular', 'Kardiovaskulär', 'Heart health and lipid panel markers', 'Hjärthälsa och lipidpanelmarkörer', 'heart', 2),
  ('33333333-3333-3333-3333-333333333333', 'Inflammation', 'Inflammation', 'Inflammatory markers and immune system health', 'Inflammatoriska markörer och immunsystemets hälsa', 'flame', 3),
  ('44444444-4444-4444-4444-444444444444', 'Hormones', 'Hormoner', 'Hormone levels including thyroid and sex hormones', 'Hormonnivåer inklusive sköldkörtel och könshormon', 'zap', 4),
  ('55555555-5555-5555-5555-555555555555', 'Vitamins & Minerals', 'Vitaminer & Mineraler', 'Essential vitamins and mineral levels', 'Essentiella vitaminer och mineralnivåer', 'sun', 5),
  ('66666666-6666-6666-6666-666666666666', 'Kidney & Liver', 'Njure & Lever', 'Kidney and liver function markers', 'Njur- och leverfunktionsmarkörer', 'droplet', 6),
  ('77777777-7777-7777-7777-777777777777', 'Physical Performance', 'Fysisk Prestation', 'Body composition and fitness metrics', 'Kroppsammansättning och konditionsmått', 'trending-up', 7);

-- ============================================================================
-- METABOLIC BIOMARKERS
-- ============================================================================

INSERT INTO biomarkers (id, category_id, name_en, name_sv, unit, optimal_min, optimal_max, reference_min, reference_max, is_premium, description_en, description_sv) VALUES
  -- HbA1c
  ('b0000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'HbA1c', 'HbA1c', 'mmol/mol', 20, 36, 20, 42, false,
   'Hemoglobin A1c measures average blood sugar over 2-3 months. Lower is better for longevity.',
   'Hemoglobin A1c mäter genomsnittligt blodsocker under 2-3 månader. Lägre är bättre för långt liv.'),

  -- Fasting Glucose
  ('b0000002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Fasting Glucose', 'Fastande Glukos', 'mmol/L', 4.1, 5.0, 4.0, 5.6, false,
   'Blood sugar level after fasting. Optimal range indicates good insulin sensitivity.',
   'Blodsockernivå efter fasta. Optimalt intervall indikerar god insulinkänslighet.'),

  -- Fasting Insulin
  ('b0000003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Fasting Insulin', 'Fastande Insulin', 'pmol/L', 14, 48, 14, 140, true,
   'Insulin level after fasting. Lower levels indicate better metabolic health.',
   'Insulinnivå efter fasta. Lägre nivåer indikerar bättre metabolisk hälsa.');

-- ============================================================================
-- CARDIOVASCULAR BIOMARKERS
-- ============================================================================

INSERT INTO biomarkers (id, category_id, name_en, name_sv, unit, optimal_min, optimal_max, reference_min, reference_max, is_premium, description_en, description_sv) VALUES
  -- Total Cholesterol
  ('b0000004-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'Total Cholesterol', 'Totalt Kolesterol', 'mmol/L', 3.0, 5.0, 3.0, 5.2, false,
   'Total cholesterol in blood. Moderate levels are associated with longevity.',
   'Totalt kolesterol i blodet. Måttliga nivåer är förknippade med långt liv.'),

  -- LDL Cholesterol
  ('b0000005-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'LDL Cholesterol', 'LDL Kolesterol', 'mmol/L', 1.0, 2.6, 1.0, 3.4, false,
   'Low-density lipoprotein, "bad" cholesterol. Lower is better for heart health.',
   'Lågdensitetslipoprotein, "dåligt" kolesterol. Lägre är bättre för hjärthälsan.'),

  -- HDL Cholesterol
  ('b0000006-0000-0000-0000-000000000006', '22222222-2222-2222-2222-222222222222', 'HDL Cholesterol', 'HDL Kolesterol', 'mmol/L', 1.3, 2.3, 1.0, 2.3, false,
   'High-density lipoprotein, "good" cholesterol. Higher is better for heart health.',
   'Högdensitetslipoprotein, "bra" kolesterol. Högre är bättre för hjärthälsan.'),

  -- Triglycerides
  ('b0000007-0000-0000-0000-000000000007', '22222222-2222-2222-2222-222222222222', 'Triglycerides', 'Triglycerider', 'mmol/L', 0.5, 1.0, 0.4, 1.7, false,
   'Fat in blood. Lower levels indicate better metabolic and cardiovascular health.',
   'Fett i blodet. Lägre nivåer indikerar bättre metabolisk och kardiovaskulär hälsa.'),

  -- ApoB
  ('b0000008-0000-0000-0000-000000000008', '22222222-2222-2222-2222-222222222222', 'Apolipoprotein B', 'Apolipoprotein B', 'g/L', 0.4, 0.8, 0.4, 1.0, true,
   'Better predictor of heart disease than LDL. Lower is better.',
   'Bättre prediktor för hjärtsjukdom än LDL. Lägre är bättre.');

-- ============================================================================
-- INFLAMMATION BIOMARKERS
-- ============================================================================

INSERT INTO biomarkers (id, category_id, name_en, name_sv, unit, optimal_min, optimal_max, reference_min, reference_max, is_premium, description_en, description_sv) VALUES
  -- hsCRP
  ('b0000009-0000-0000-0000-000000000009', '33333333-3333-3333-3333-333333333333', 'hsCRP', 'hsCRP', 'mg/L', 0.0, 1.0, 0.0, 3.0, false,
   'High-sensitivity C-reactive protein. Measures inflammation. Lower is better.',
   'Högkänslig C-reaktivt protein. Mäter inflammation. Lägre är bättre.'),

  -- Homocysteine
  ('b0000010-0000-0000-0000-000000000010', '33333333-3333-3333-3333-333333333333', 'Homocysteine', 'Homocystein', 'μmol/L', 5.0, 10.0, 5.0, 15.0, true,
   'Amino acid linked to heart disease risk. Lower is better.',
   'Aminosyra kopplad till hjärtsjukdomsrisk. Lägre är bättre.');

-- ============================================================================
-- HORMONE BIOMARKERS
-- ============================================================================

INSERT INTO biomarkers (id, category_id, name_en, name_sv, unit, optimal_min, optimal_max, reference_min, reference_max, is_premium, description_en, description_sv) VALUES
  -- TSH
  ('b0000011-0000-0000-0000-000000000011', '44444444-4444-4444-4444-444444444444', 'TSH', 'TSH', 'mIU/L', 0.5, 2.5, 0.4, 4.0, false,
   'Thyroid stimulating hormone. Indicates thyroid function.',
   'Tyreoideastimulerande hormon. Indikerar sköldkörtelfunktion.'),

  -- Free T3
  ('b0000012-0000-0000-0000-000000000012', '44444444-4444-4444-4444-444444444444', 'Free T3', 'Fritt T3', 'pmol/L', 3.5, 6.5, 3.1, 6.8, true,
   'Active thyroid hormone. Important for metabolism.',
   'Aktivt sköldkörtelhormon. Viktigt för ämnesomsättningen.'),

  -- Free T4
  ('b0000013-0000-0000-0000-000000000013', '44444444-4444-4444-4444-444444444444', 'Free T4', 'Fritt T4', 'pmol/L', 12.0, 22.0, 12.0, 22.0, true,
   'Thyroid hormone precursor. Converts to active T3.',
   'Förstadium till sköldkörtelhormon. Omvandlas till aktivt T3.'),

  -- Testosterone (Total)
  ('b0000014-0000-0000-0000-000000000014', '44444444-4444-4444-4444-444444444444', 'Testosterone', 'Testosteron', 'nmol/L', 10.0, 35.0, 8.6, 29.0, false,
   'Primary male sex hormone. Important for muscle, energy, and vitality.',
   'Primärt manligt könshormon. Viktigt för muskler, energi och vitalitet.'),

  -- Estradiol
  ('b0000015-0000-0000-0000-000000000015', '44444444-4444-4444-4444-444444444444', 'Estradiol', 'Östradiol', 'pmol/L', 50, 200, 50, 300, true,
   'Primary female sex hormone. Varies by menstrual cycle phase.',
   'Primärt kvinnligt könshormon. Varierar med menstruationscykelfas.'),

  -- Cortisol
  ('b0000016-0000-0000-0000-000000000016', '44444444-4444-4444-4444-444444444444', 'Cortisol', 'Kortisol', 'nmol/L', 200, 500, 150, 700, true,
   'Stress hormone. High levels indicate chronic stress.',
   'Stresshormon. Höga nivåer indikerar kronisk stress.');

-- ============================================================================
-- VITAMINS & MINERALS
-- ============================================================================

INSERT INTO biomarkers (id, category_id, name_en, name_sv, unit, optimal_min, optimal_max, reference_min, reference_max, is_premium, description_en, description_sv) VALUES
  -- Vitamin D
  ('b0000017-0000-0000-0000-000000000017', '55555555-5555-5555-5555-555555555555', 'Vitamin D', 'Vitamin D', 'nmol/L', 75, 150, 50, 200, false,
   'Essential for bone health, immune function, and longevity.',
   'Avgörande för benhälsa, immunfunktion och långt liv.'),

  -- Vitamin B12
  ('b0000018-0000-0000-0000-000000000018', '55555555-5555-5555-5555-555555555555', 'Vitamin B12', 'Vitamin B12', 'pmol/L', 300, 1000, 200, 1200, false,
   'Important for nerve function, energy, and red blood cell production.',
   'Viktigt för nervfunktion, energi och bildning av röda blodkroppar.'),

  -- Folate
  ('b0000019-0000-0000-0000-000000000019', '55555555-5555-5555-5555-555555555555', 'Folate', 'Folat', 'nmol/L', 10, 45, 7, 45, false,
   'B vitamin essential for DNA synthesis and cell division.',
   'B-vitamin avgörande för DNA-syntes och celldelning.'),

  -- Magnesium
  ('b0000020-0000-0000-0000-000000000020', '55555555-5555-5555-5555-555555555555', 'Magnesium', 'Magnesium', 'mmol/L', 0.85, 1.10, 0.70, 1.10, false,
   'Essential mineral for muscle, nerve, and heart function.',
   'Essentiellt mineral för muskel-, nerv- och hjärtfunktion.'),

  -- Iron
  ('b0000021-0000-0000-0000-000000000021', '55555555-5555-5555-5555-555555555555', 'Iron', 'Järn', 'μmol/L', 9.0, 30.0, 9.0, 34.0, false,
   'Essential for oxygen transport. Too high or low is problematic.',
   'Avgörande för syretransport. För högt eller lågt är problematiskt.'),

  -- Ferritin
  ('b0000022-0000-0000-0000-000000000022', '55555555-5555-5555-5555-555555555555', 'Ferritin', 'Ferritin', 'μg/L', 50, 150, 30, 400, true,
   'Iron storage protein. Reflects total body iron stores.',
   'Järnlagringsprotein. Återspeglar kroppens totala järnlager.');

-- ============================================================================
-- KIDNEY & LIVER BIOMARKERS
-- ============================================================================

INSERT INTO biomarkers (id, category_id, name_en, name_sv, unit, optimal_min, optimal_max, reference_min, reference_max, is_premium, description_en, description_sv) VALUES
  -- Creatinine
  ('b0000023-0000-0000-0000-000000000023', '66666666-6666-6666-6666-666666666666', 'Creatinine', 'Kreatinin', 'μmol/L', 60, 100, 50, 120, false,
   'Waste product filtered by kidneys. Indicates kidney function.',
   'Avfallsprodukt filtrerad av njurarna. Indikerar njurfunktion.'),

  -- eGFR
  ('b0000024-0000-0000-0000-000000000024', '66666666-6666-6666-6666-666666666666', 'eGFR', 'eGFR', 'mL/min', 90, 120, 60, 120, false,
   'Estimated glomerular filtration rate. Measures kidney filtering capacity.',
   'Uppskattad glomerulär filtrationshastighet. Mäter njurarnas filtreringsförmåga.'),

  -- ALT
  ('b0000025-0000-0000-0000-000000000025', '66666666-6666-6666-6666-666666666666', 'ALT', 'ALT', 'U/L', 10, 35, 10, 50, false,
   'Liver enzyme. Elevated levels indicate liver stress or damage.',
   'Leverenzym. Förhöjda nivåer indikerar leverstress eller skada.'),

  -- AST
  ('b0000026-0000-0000-0000-000000000026', '66666666-6666-6666-6666-666666666666', 'AST', 'AST', 'U/L', 10, 35, 10, 50, false,
   'Liver and muscle enzyme. Elevated levels indicate tissue damage.',
   'Lever- och muskelenzym. Förhöjda nivåer indikerar vävnadsskada.');

-- ============================================================================
-- PHYSICAL PERFORMANCE BIOMARKERS
-- ============================================================================

INSERT INTO biomarkers (id, category_id, name_en, name_sv, unit, optimal_min, optimal_max, reference_min, reference_max, is_premium, description_en, description_sv) VALUES
  -- VO2 Max
  ('b0000027-0000-0000-0000-000000000027', '77777777-7777-7777-7777-777777777777', 'VO2 Max', 'VO2 Max', 'mL/kg/min', 40, 60, 30, 60, true,
   'Maximum oxygen uptake. Best single predictor of longevity.',
   'Maximal syreupptagning. Bästa enskilda prediktorn för långt liv.'),

  -- Body Fat Percentage
  ('b0000028-0000-0000-0000-000000000028', '77777777-7777-7777-7777-777777777777', 'Body Fat %', 'Kroppsfett %', '%', 10, 20, 10, 30, false,
   'Percentage of body weight that is fat. Lower is generally better.',
   'Procent av kroppsvikten som är fett. Lägre är generellt bättre.'),

  -- Resting Heart Rate
  ('b0000029-0000-0000-0000-000000000029', '77777777-7777-7777-7777-777777777777', 'Resting HR', 'Vilande HR', 'bpm', 50, 70, 60, 100, false,
   'Heart rate at rest. Lower indicates better cardiovascular fitness.',
   'Hjärtfrekvens i vila. Lägre indikerar bättre kardiovaskulär kondition.'),

  -- Heart Rate Variability
  ('b0000030-0000-0000-0000-000000000030', '77777777-7777-7777-7777-777777777777', 'HRV', 'HRV', 'ms', 50, 100, 20, 100, true,
   'Variation in time between heartbeats. Higher indicates better stress resilience.',
   'Variation i tid mellan hjärtslag. Högre indikerar bättre stressresiliens.');

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Count biomarkers by category
SELECT
  bc.name_en as category,
  COUNT(b.id) as biomarker_count
FROM biomarker_categories bc
LEFT JOIN biomarkers b ON bc.id = b.category_id
GROUP BY bc.name_en, bc.display_order
ORDER BY bc.display_order;

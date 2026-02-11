# Health Domain Knowledge Reference

> Science-based reference for building Wellspring features. Every recommendation the app surfaces must cite its evidence level and source. This document is the canonical guide for AI assistants working on health content, AI insights, recommendation logic, and nudging systems.

---

## 1. Evidence Grading System

All recommendations, insights, and educational content in Wellspring **must** carry an evidence grade. Use the following tiers:

| Grade | Label | Criteria | UI Treatment |
|-------|-------|----------|-------------|
| **A** | Strong | Supported by >=2 large RCTs or meta-analyses in top-tier journals (NEJM, Lancet, JAMA, BMJ, Nature Medicine) | Show as confident recommendation |
| **B** | Moderate | Supported by >=2 cohort/observational studies or 1 well-designed RCT | Show as standard recommendation with brief caveat |
| **C** | Preliminary | Supported by 1 study, small sample, or animal/in-vitro data only | Show with explicit "Emerging evidence" label and caveat: *"Based on limited research; more studies needed"* |
| **D** | Expert opinion | No direct study, but supported by mechanistic reasoning or clinical consensus | Show as "Expert perspective" with disclaimer |

### Rules for the AI insight engine

- Never present a Grade C or D finding as established fact.
- Always cite at minimum: first author, journal, year (e.g., *Sonnenburg et al., Cell, 2016*).
- When two studies conflict, present both sides with their respective grades.
- Prefer Nordic/European reference ranges when available (Scandinavian population data).
- Include a health disclaimer on every insight: *"This is educational information, not medical advice. Consult a healthcare professional before making changes."*

---

## 2. Biomarker Categories — Clinical Significance & Interrelationships

### 2.1 Metabolic Health

The metabolic panel is the single most actionable category for longevity.

| Marker | Why it matters | Optimal (longevity) | Key interactions |
|--------|---------------|---------------------|-----------------|
| **HbA1c** | 3-month glucose average; best single metabolic marker. Each 1% above 5.0% increases CVD mortality ~20% | <36 mmol/mol (<5.4%) | Driven by insulin resistance; correlates with triglycerides, visceral fat |
| **Fasting glucose** | Acute snapshot; less reliable than HbA1c alone | 4.1–5.0 mmol/L | Elevated by stress (cortisol), poor sleep, infection |
| **Fasting insulin** | Earlier signal of metabolic dysfunction than glucose | <48 pmol/L (<7 mIU/L) | High insulin with normal glucose = early insulin resistance |
| **HOMA-IR** | Calculated: (glucose x insulin) / 22.5. Gold-standard proxy for insulin resistance | <1.0 | Composite; tracks with triglycerides, waist circumference |
| **Triglycerides** | Strong independent CVD predictor; tightly linked to diet quality | <1.0 mmol/L | Elevated by refined carbs, alcohol, poor sleep; Trig/HDL ratio is a powerful CVD risk ratio |

**Key insight logic:** If a user has high HbA1c *and* high fasting insulin, flag as high-priority — this pattern precedes type 2 diabetes by 5-10 years (Tabák et al., Lancet, 2012).

**Nudge opportunity:** Users tracking only HbA1c should be nudged to add fasting insulin (Grade A: DeFronzo et al., Diabetes Care, 2009).

### 2.2 Cardiovascular

| Marker | Why it matters | Optimal (longevity) | Key interactions |
|--------|---------------|---------------------|-----------------|
| **ApoB** | Single best predictor of atherosclerotic CVD; counts all atherogenic particles | <0.8 g/L (ideally <0.7) | Superior to LDL-C alone (Sniderman et al., Lancet, 2019) |
| **LDL-C** | Traditional CVD marker; less precise than ApoB | <2.6 mmol/L | Discordant with ApoB in ~25% of people |
| **HDL-C** | Protective lipid; very low levels signal metabolic dysfunction | >1.3 mmol/L | Raised by exercise, moderate alcohol; lowered by metabolic syndrome |
| **Triglycerides** | See metabolic; also key CVD predictor | <1.0 mmol/L | Trig/HDL ratio >1.5 signals insulin resistance (McLaughlin et al., Circulation, 2005) |
| **Lp(a)** | Genetic; largely non-modifiable; strong independent CVD risk factor | <75 nmol/L (test once) | Not affected by lifestyle; important for risk stratification |
| **hs-CRP** | Vascular inflammation; predicts events independent of lipids | <1.0 mg/L | Elevated by infection, obesity, poor sleep, metabolic syndrome |

**Key insight logic:** ApoB and LDL-C can be discordant. If a user has normal LDL but high ApoB, the ApoB value is more predictive — flag this (Grade A: Sniderman et al., Lancet Diabetes Endocrinol, 2019).

**Nudge opportunity:** Users tracking LDL who haven't measured ApoB should be nudged — "ApoB is considered a better predictor of heart disease risk than LDL alone" (Grade A).

### 2.3 Inflammation

| Marker | Why it matters | Optimal (longevity) | Key interactions |
|--------|---------------|---------------------|-----------------|
| **hs-CRP** | Systemic inflammation; predicts CVD, cancer, all-cause mortality | <1.0 mg/L | Acutely elevated by infection (retest after 2 weeks if >10) |
| **Homocysteine** | Vascular damage marker; driven by B-vitamin status | <10 µmol/L | Lowered by B12, folate, B6 (Grade A: Homocysteine Studies Collaboration, JAMA, 2002) |
| **Fibrinogen** | Clotting factor; elevated = prothrombotic + inflammatory state | 2.0–3.5 g/L | Rises with infection, smoking, obesity |
| **IL-6** | Pro-inflammatory cytokine; key mediator of inflammaging | Low (no universal cutoff) | Elevated in obesity, sedentary behavior, poor gut health |
| **Ferritin** | Iron storage *and* acute phase reactant; very high levels can indicate inflammation, not just iron overload | 50–150 µg/L | Must interpret alongside hs-CRP; both elevated = inflammation, not iron overload |

**Key insight logic:** If ferritin is high AND hs-CRP is high, recommend retesting both after any acute illness resolves. Do not recommend iron reduction without ruling out inflammation (Grade B).

**Nudge opportunity:** Users tracking hs-CRP only — suggest adding homocysteine, as it is independently modifiable through B-vitamin supplementation (Grade A).

### 2.4 Hormones

| Marker | Why it matters | Optimal (longevity) | Key interactions |
|--------|---------------|---------------------|-----------------|
| **TSH** | Thyroid function gate-keeper | 0.5–2.5 mIU/L | Subclinical hypothyroidism (TSH 4–10) is common and undertreated |
| **Free T3 / Free T4** | Active thyroid hormones; needed if TSH is abnormal | Mid-range | Low T3 with normal TSH can indicate non-thyroidal illness or caloric restriction |
| **Testosterone** (total) | Muscle mass, energy, mood, bone density | Upper quartile for age | Declines ~1%/year after 30; modifiable by sleep, exercise, body fat (Travison et al., JCEM, 2007) |
| **Estradiol** | Bone health, cardiovascular protection (pre-menopause) | Varies by cycle phase | Track with cycle phase for meaningful trends |
| **Cortisol** (morning) | Stress axis; circadian rhythm indicator | 300–500 nmol/L (AM) | Must be morning sample; elevated by chronic stress, poor sleep |
| **DHEA-S** | Adrenal reserve; anti-aging marker | Upper half of age range | Declines with age; marker of biological aging (Grade B) |
| **IGF-1** | Growth signaling; complex longevity relationship | Mid-range | Too high: cancer risk. Too low: frailty risk. U-shaped mortality curve (Burgers et al., Horm Metab Res, 2011) |

**Key insight logic:** Testosterone assessment must factor in sleep quality, body fat, and exercise before suggesting hormonal causes. Low testosterone + high cortisol = investigate stress/sleep first (Grade B).

**Nudge opportunity:** Users tracking testosterone should add DHEA-S and cortisol for a complete hormonal picture (Grade B).

### 2.5 Vitamins & Minerals

| Marker | Why it matters | Optimal (longevity) | Nordic-specific notes |
|--------|---------------|---------------------|-----------------------|
| **Vitamin D** (25-OH) | Immune function, bone health, mood, all-cause mortality | 75–150 nmol/L | Deficiency is epidemic in Nordics; 80%+ insufficient in winter (Grade A: Lips et al., JCEM, 2019) |
| **Vitamin B12** | Nerve function, methylation, homocysteine metabolism | 300–1000 pmol/L | Deficiency common in vegetarians, elderly, metformin users |
| **Folate** | DNA repair, methylation, pregnancy, homocysteine metabolism | >20 nmol/L | Works synergistically with B12; both needed for homocysteine reduction |
| **Magnesium** (serum) | 300+ enzymatic reactions; sleep, muscle, heart | 0.85–1.10 mmol/L | Serum levels are poor indicator; RBC magnesium is better but rarely available. ~50% of population insufficient (DiNicolantonio et al., Open Heart, 2018) |
| **Iron / Ferritin** | Oxygen transport, energy, immune function | Ferritin 50–150 µg/L | Both excess and deficiency are harmful; "more is better" is wrong for iron |
| **Omega-3 Index** | EPA+DHA in red blood cell membranes; cardiovascular protection | >8% | Strong CVD predictor (Grade A: Harris et al., Atherosclerosis, 2018). Not yet in seed data — candidate for addition |
| **Zinc** | Immune function, wound healing, testosterone synthesis | 11–17 µmol/L | Depleted by exercise, stress, vegetarian diets (Grade B) |

**Key insight logic:** Vitamin D < 50 nmol/L in a Nordic user during October–March is expected and should trigger a supplementation nudge with dosing guidance (Grade A: Nordic Nutrition Recommendations, 2023).

**Nudge opportunity (seasonal):** In September, nudge Nordic users: "Winter is approaching — consider testing your Vitamin D. Most Scandinavians become deficient between October and April."

### 2.6 Kidney & Liver

| Marker | Why it matters | Optimal (longevity) | Key interactions |
|--------|---------------|---------------------|-----------------|
| **Creatinine** | Kidney filtration; affected by muscle mass | 60–100 µmol/L | Higher in muscular individuals — not always pathological |
| **eGFR** | Estimated kidney function; gold standard screening | >90 mL/min | Declines with age; <60 = chronic kidney disease |
| **ALT** | Liver-specific enzyme; most sensitive for liver fat | 10–35 U/L | Elevated by NAFLD, alcohol, medications, intense exercise |
| **AST** | Liver + muscle enzyme | 10–35 U/L | Less specific than ALT; also rises after exercise |
| **GGT** | Liver enzyme; marker of oxidative stress and alcohol intake | <30 U/L | Elevated GGT with normal ALT suggests alcohol or medication effect |
| **Cystatin C** | Superior kidney marker; not affected by muscle mass | 0.5–1.0 mg/L | Better than creatinine for athletes (Grade B: Shlipak et al., NEJM, 2013) |
| **Albumin** | Liver synthetic function + nutritional status | 40–50 g/L | Low albumin predicts all-cause mortality (Grade A) |

**Key insight logic:** Elevated ALT (>35 U/L) in an otherwise healthy user should trigger a question about alcohol, medications, and recent intense exercise before flagging liver concern (Grade B).

**Nudge opportunity:** Users tracking creatinine who exercise heavily should be nudged to add Cystatin C — "gives a more accurate kidney function reading for active people" (Grade B).

### 2.7 Physical Performance & Body Composition

| Marker | Why it matters | Optimal (longevity) | How to measure |
|--------|---------------|---------------------|---------------|
| **VO2max** | Single strongest predictor of all-cause mortality (Mandsager et al., JAMA Network Open, 2018) | >40 mL/kg/min (age-adjusted) | Lab test, wearable estimate, or field test (Cooper test) |
| **Grip strength** | Predicts all-cause mortality independent of other factors (Leong et al., Lancet, 2015) | >40 kg (men), >25 kg (women) | Dynamometer; cheap and repeatable |
| **Body fat %** | More informative than BMI for health risk | 10–20% (men), 18–28% (women) | DEXA scan, bioimpedance, calipers |
| **Lean mass / muscle mass** | Sarcopenia prevention; metabolic health | Maintain/increase with age | DEXA scan is gold standard |
| **Resting heart rate** | Cardiovascular fitness proxy | 50–65 bpm | Wearable or manual; morning measurement |
| **HRV (RMSSD)** | Autonomic nervous system balance; recovery and stress resilience | >50 ms (varies by age) | Wearable (Oura, Whoop, Apple Watch) |
| **Waist circumference** | Visceral fat proxy; stronger CVD predictor than BMI | <94 cm (men), <80 cm (women) | Tape measure at navel; simple but powerful |

**Key insight logic:** VO2max in the bottom 25th percentile for age carries greater mortality risk than smoking (Grade A: Mandsager et al., 2018). This should be flagged as high-priority.

**Nudge opportunity:** Users not tracking any physical marker should be encouraged to add at least VO2max and grip strength — "these two predict longevity more strongly than most blood tests" (Grade A).

---

## 3. Gut Microbiome — Testing, Markers & Health Connections

### 3.1 Why the Gut Microbiome Matters for Longevity

The gut microbiome is a community of ~38 trillion microorganisms that directly influences:

- **Immune function** — 70-80% of immune cells reside in the gut (Vighi et al., Clin Exp Immunol, 2008) [Grade A]
- **Metabolic health** — Microbiome composition predicts insulin resistance and type 2 diabetes risk (Qin et al., Nature, 2012) [Grade A]
- **Cardiovascular health** — Gut bacteria produce TMAO from carnitine/choline, linked to atherosclerosis (Wang et al., Nature, 2011) [Grade A]
- **Mental health (gut-brain axis)** — Bidirectional vagus nerve signaling; microbiome composition associated with depression and anxiety (Valles-Colomer et al., Nature Microbiology, 2019) [Grade B]
- **Inflammation** — Dysbiosis drives systemic inflammation ("leaky gut"), elevating hs-CRP, IL-6 (Fasano, Physiol Rev, 2011) [Grade A]
- **Nutrient absorption** — Microbiome synthesizes B-vitamins, vitamin K, and influences mineral absorption [Grade A]
- **Aging** — Centenarians show distinct microbiome signatures with higher diversity (Biagi et al., Current Biology, 2016) [Grade B]

### 3.2 Gut Microbiome Biomarkers

#### Proposed new biomarker category: "Gut Health"

These markers bridge gut microbiome testing with actionable health tracking:

| Marker | What it measures | Optimal | Evidence | Clinical utility |
|--------|-----------------|---------|----------|-----------------|
| **Microbiome diversity** (Shannon Index) | Species richness and evenness | >3.5 (Shannon) | Grade A: Higher diversity consistently associated with better health outcomes (Lozupone et al., Nature, 2012) | Foundation metric; low diversity linked to obesity, IBD, metabolic disease |
| **Firmicutes/Bacteroidetes ratio** | Phylum-level balance | 1:1 to 3:1 | Grade C: Widely cited but inconsistent across studies; oversimplified (Magne et al., Microorganisms, 2020) | Context-dependent; not actionable alone |
| **Butyrate producers abundance** | Faecalibacterium, Roseburia, Eubacterium spp. | >15% relative abundance | Grade B: Butyrate is primary fuel for colonocytes; anti-inflammatory (Louis & Flint, FEMS Microbiol Lett, 2009) | Low levels = impaired gut barrier; actionable via fiber intake |
| **Bifidobacterium abundance** | Key beneficial genus | Detectable, >5% | Grade A: Associated with immune health, pathogen resistance, lower inflammation (O'Callaghan & van Sinderen, Front Microbiol, 2016) | Declines with age; responsive to prebiotics and fermented foods |
| **Akkermansia muciniphila** | Mucin-degrading bacterium; gut barrier integrity | Detectable | Grade B: Associated with lean phenotype, insulin sensitivity (Depommier et al., Nature Medicine, 2019) | Responds to polyphenols, metformin, cranberries |
| **Fecal calprotectin** | Gut inflammation (neutrophil-derived protein) | <50 µg/g | Grade A: Gold standard non-invasive gut inflammation marker (Tibble et al., Gut, 2000) | Differentiates IBS from IBD; tracks treatment response |
| **Fecal zonulin** | Intestinal permeability ("leaky gut") | <107 ng/mL | Grade C: Promising but assay standardization issues; interpretation varies (Ajamian et al., Nutrients, 2019) | Research use; not yet gold standard |
| **Fecal secretory IgA** | Mucosal immune function | 500–2500 µg/mL | Grade B: Low = impaired mucosal defense; high = active immune response (Mantis et al., Mucosal Immunol, 2011) | Reflects gut immune tone |
| **Short-chain fatty acids (SCFAs)** | Butyrate, propionate, acetate in stool | Butyrate >10 µmol/g | Grade A: SCFAs regulate immune function, gut barrier, metabolism (Koh et al., Cell, 2016) | Directly modifiable via fiber intake |
| **TMAO** (blood) | Trimethylamine N-oxide; gut-derived CVD risk metabolite | <6.2 µmol/L | Grade B: Elevated TMAO associated with CVD events (Tang et al., NEJM, 2013) | Modifiable by diet (reduce red meat/choline supps) and microbiome composition |

### 3.3 Gut Microbiome Testing Providers (Nordic-relevant)

| Provider | Test type | Available in Sweden | Price range |
|----------|----------|-------------------|-------------|
| **Atlas Biomed** | 16S rRNA sequencing + report | Yes (mail-order) | ~€150 |
| **Verisana** | Comprehensive stool analysis | Yes (mail-order) | ~€130 |
| **GI-MAP** (Diagnostic Solutions) | qPCR stool analysis | Via practitioner | ~$350 |
| **Biomesight** | 16S rRNA sequencing | Yes (mail-order) | ~$100 |
| **Genova Diagnostics (GI Effects)** | Culture + PCR + chemistry | Via practitioner | ~$400 |

**App integration note:** Users can manually enter results from any provider. Future PDF parsing should support common gut test report formats.

### 3.4 How Gut Microbiome Connects to Other Biomarkers

These cross-category connections are critical for the AI insight engine:

| Gut marker | Connected blood marker | Mechanism | Evidence |
|------------|----------------------|-----------|----------|
| Low diversity | High hs-CRP | Dysbiosis → LPS translocation → systemic inflammation | Grade A (Cani et al., Diabetes, 2007) |
| Low butyrate producers | High fasting insulin | Impaired gut barrier → endotoxemia → insulin resistance | Grade B (Canfora et al., Nature Rev Endocrinol, 2019) |
| Low Bifidobacterium | Low Vitamin B12 | Bifidobacteria synthesize B-vitamins | Grade B (LeBlanc et al., Curr Opin Biotechnol, 2013) |
| High TMAO | High ApoB / hs-CRP | Gut-derived metabolite promoting atherosclerosis | Grade B (Tang et al., NEJM, 2013) |
| Low Akkermansia | High HbA1c, high body fat % | Impaired mucin layer → metabolic endotoxemia | Grade B (Depommier et al., Nature Medicine, 2019) |
| Low sIgA | Frequent infections (self-reported) | Mucosal immune impairment | Grade B |
| High calprotectin | Low ferritin, low albumin | Active gut inflammation → malabsorption | Grade A |
| Low diversity | Low HRV | Gut-brain axis; vagal tone reflects gut health | Grade C (Koenig et al., Psychosom Med, 2021) |

---

## 4. Nutrition Biomarkers & Dietary Patterns

### 4.1 Key Nutrition-Linked Markers

Beyond the vitamin/mineral panel, these markers reflect dietary patterns:

| Marker | What it reflects | Diet connection | Actionability |
|--------|-----------------|----------------|---------------|
| **Triglycerides** | Carbohydrate and alcohol intake | Drop 20-50% within weeks of reducing refined carbs (Grade A) | Highly actionable |
| **HbA1c** | Long-term glycemic load | Mediterranean diet reduces by 0.3-0.5% (Esposito et al., Ann Intern Med, 2009) [Grade A] | Highly actionable |
| **Homocysteine** | B-vitamin status (B12, folate, B6) | Responds to supplementation within 4-8 weeks [Grade A] | Highly actionable |
| **Omega-3 Index** | Marine omega-3 intake | Directly reflects fish/supplement consumption [Grade A] | Highly actionable |
| **Vitamin D** | Sun exposure + supplementation | In Nordics, almost entirely supplement-dependent Oct–Apr [Grade A] | Highly actionable |
| **Ferritin** | Iron intake and absorption | Red meat, vitamin C co-ingestion increase; tea/coffee decrease absorption [Grade A] | Actionable, direction depends on baseline |
| **GGT** | Alcohol and toxin exposure | Sensitive to even moderate alcohol intake [Grade A] | Highly actionable |
| **hs-CRP** | Overall anti-inflammatory diet quality | Mediterranean diet reduces by ~30% (Casas et al., J Intern Med, 2014) [Grade A] | Moderately actionable (multi-factorial) |

### 4.2 Dietary Pattern Recommendations (Evidence-Based)

Only recommend dietary patterns with Grade A or B evidence for relevant outcomes:

| Pattern | Strongest evidence for | Key studies | Grade |
|---------|----------------------|-------------|-------|
| **Mediterranean diet** | CVD reduction (-30%), type 2 diabetes prevention, all-cause mortality | PREDIMED trial (Estruch et al., NEJM, 2018) | **A** |
| **Time-restricted eating (16:8)** | Insulin sensitivity, weight management | Wilkinson et al., Cell Metabolism, 2020 | **B** |
| **High-fiber diet (>30g/day)** | Microbiome diversity, metabolic health, colorectal cancer prevention | Reynolds et al., Lancet, 2019 | **A** |
| **Reduced ultra-processed food** | All-cause mortality, CVD, metabolic health | NOVA studies; Hall et al., Cell Metabolism, 2019 | **B** |
| **Nordic diet** | CVD biomarkers, inflammation | Poulsen et al., J Intern Med, 2014 | **B** |

**Do NOT recommend:** Extreme elimination diets, prolonged fasting >72h, or carnivore/all-meat diets — insufficient longevity evidence.

---

## 5. Exercise & Physical Performance

### 5.1 Exercise Recommendations by Evidence Grade

| Recommendation | Effect on longevity | Evidence | Grade |
|---------------|--------------------|---------|----|
| **150 min/week moderate or 75 min/week vigorous cardio** | 30-35% reduction in all-cause mortality | Arem et al., JAMA Intern Med, 2015 | **A** |
| **2x/week resistance training** | Reduced mortality independent of cardio; sarcopenia prevention | Momma et al., Br J Sports Med, 2022 | **A** |
| **VO2max training (zone 2 + HIIT)** | VO2max is strongest single predictor of lifespan | Mandsager et al., JAMA Network Open, 2018 | **A** |
| **Daily movement (>7000 steps)** | Dose-response mortality reduction up to ~10,000 steps | Paluch et al., Lancet, 2022 | **A** |
| **Grip strength maintenance** | Independent mortality predictor; proxy for overall strength | Leong et al., Lancet, 2015 | **A** |
| **Flexibility / mobility training** | Injury prevention; sitting-rising test predicts mortality | de Brito et al., Eur J Prev Cardiol, 2014 | **B** |
| **Cold exposure (cold plunging)** | Dopamine, norepinephrine increase; metabolic benefits | Srámek et al., Eur J Appl Physiol, 2000 | **C** |
| **Sauna use (4-7x/week)** | Reduced CVD mortality in Finnish cohort | Laukkanen et al., JAMA Intern Med, 2015 | **B** (single cohort) |

### 5.2 Exercise ↔ Biomarker Connections

| Exercise type | Biomarkers improved | Timeframe | Notes |
|--------------|--------------------|-----------|----|
| Zone 2 cardio | VO2max, resting HR, HRV, triglycerides, HbA1c | 4-12 weeks | Foundation of exercise programming |
| HIIT | VO2max (fastest gains), HDL, insulin sensitivity | 2-8 weeks | 1-2x/week sufficient; more is not always better |
| Resistance training | Testosterone, IGF-1, grip strength, lean mass, body fat % | 8-16 weeks | Essential for longevity; often underemphasized |
| Walking (>7k steps) | hs-CRP, fasting glucose, triglycerides, resting HR | 2-4 weeks | Lowest barrier; high impact for sedentary users |
| Yoga/stretching | Cortisol, HRV, blood pressure | 4-8 weeks | Stress reduction; complements intense training |

---

## 6. Probiotics, Prebiotics & Gut-Targeted Interventions

### 6.1 Probiotic Strains with Clinical Evidence

Only recommend strains with human RCT evidence for specific outcomes:

| Strain(s) | Indicated for | Evidence | Key study | Grade | Available in Nordics |
|-----------|--------------|----------|-----------|-------|---------------------|
| **Lactobacillus rhamnosus GG** | General gut health, antibiotic-associated diarrhea, immune support | Multiple RCTs, Cochrane review | Szajewska et al., Aliment Pharmacol Ther, 2013 | **A** | Yes (widely) |
| **Saccharomyces boulardii** | Antibiotic-associated diarrhea, C. difficile prevention | Multiple RCTs | McFarland, World J Gastroenterol, 2010 | **A** | Yes |
| **Bifidobacterium lactis BB-12** | Immune function, gut regularity | Multiple RCTs | Jungersen et al., Microorganisms, 2014 | **B** | Yes (common in Nordic dairy) |
| **Lactobacillus reuteri DSM 17938** | Infant colic, adult gut motility, vitamin D metabolism | Multiple RCTs | Savino et al., Pediatrics, 2010 | **B** | Yes (BioGaia, Swedish company) |
| **VSL#3 (multi-strain)** | Ulcerative colitis maintenance, IBS | RCTs in IBD populations | Tursi et al., Am J Gastroenterol, 2010 | **B** | Available via pharmacy |
| **Akkermansia muciniphila** (pasteurized) | Insulin sensitivity, metabolic health | 1 small RCT | Depommier et al., Nature Medicine, 2019 | **C** | Limited (novel product) |
| **Lactobacillus plantarum 299v** | IBS symptoms, iron absorption | RCTs | Ducrotté et al., WJG, 2012 | **B** | Yes (Swedish origin — Probi) |

### 6.2 Prebiotic Fibers

| Fiber type | Food sources | Primary benefit | Microbes fed | Grade |
|-----------|-------------|-----------------|-------------|-------|
| **Inulin/FOS** | Chicory, garlic, onion, leek, asparagus | Bifidobacterium growth, SCFA production | Bifidobacterium spp. | **A** (Roberfroid et al., Br J Nutr, 2010) |
| **Resistant starch** | Cooked-then-cooled potato/rice, green banana | Butyrate production, insulin sensitivity | Firmicutes (Ruminococcus, Roseburia) | **A** (Maier et al., Cell Host Microbe, 2017) |
| **Pectin** | Apples, citrus peel, berries | Diversity increase, SCFA production | Diverse taxa | **B** |
| **Beta-glucan** | Oats, barley, mushrooms | Immune modulation, cholesterol reduction | Diverse taxa | **A** for cholesterol (Whitehead et al., Am J Clin Nutr, 2014) |
| **Polyphenols** | Berries, dark chocolate, green tea, coffee | Akkermansia growth, anti-inflammatory | Akkermansia, Bifidobacterium | **B** (Cardona et al., J Nutr Biochem, 2013) |

### 6.3 Fermented Foods

| Food | Key microbes | Evidence for health benefit | Nordic relevance | Grade |
|------|-------------|---------------------------|-----------------|-------|
| **Yogurt** (live cultures) | L. bulgaricus, S. thermophilus | CVD reduction, metabolic health | Staple | **A** (Godos et al., Nutr Metab Cardiovasc Dis, 2020) |
| **Kefir** | Diverse LAB + yeasts (>50 species) | Microbiome diversity, lactose tolerance | Available | **B** |
| **Sauerkraut** (unpasteurized) | Leuconostoc, Lactobacillus | Diversity increase | Traditional Nordic | **C** (limited human RCTs) |
| **Kimchi** | Diverse LAB | Metabolic health, immune function | Growing popularity | **B** (Kim et al., J Med Food, 2018) |
| **Kombucha** | Acetobacter, yeasts, LAB | Antioxidant properties | Growing popularity | **C** (mostly in vitro data) |
| **Filmjölk / Fil** | L. lactis, Leuconostoc | Gut health, traditional Nordic cultured milk | Swedish staple | **C** (minimal dedicated research; extrapolated from fermented dairy evidence) |

**Key study to cite:** Stanford fermented food study — 6-week high-fermented food diet increased microbiome diversity and decreased inflammatory markers (Wastyk et al., Cell, 2021) [Grade B — single RCT but well-designed].

---

## 7. Nudging Strategy — Expanding User Tracking Over Time

### 7.1 Principles

1. **Goal-anchored:** Nudges should connect to the user's stated onboarding goals (e.g., "improve energy" → thyroid panel + ferritin + B12).
2. **Evidence-driven:** Only nudge to add markers with Grade A or B connections to existing markers.
3. **Timely:** Trigger nudges after the user has at least 2 data points for an existing marker (shows engagement and allows trend analysis).
4. **Non-intrusive:** Maximum 1 nudge per week. Never interrupt core workflows.
5. **Educational:** Every nudge should teach *why* the new marker matters, not just ask the user to add it.
6. **Seasonal:** Leverage Nordic seasons (Vitamin D in autumn, allergy markers in spring).
7. **Life-stage aware:** Age-appropriate suggestions (e.g., bone density markers for 45+, fertility markers for reproductive age).

### 7.2 Nudge Triggers & Expansion Paths

Starting from common onboarding goals, here are recommended expansion paths:

#### Goal: "Improve metabolic health"
```
Start: HbA1c, Fasting Glucose
  → After 2 tests: Add Fasting Insulin (earlier signal of IR)
  → After insulin added: Suggest HOMA-IR calculation (auto-derive)
  → After 2 metabolic tests: Add Triglycerides + HDL (Trig/HDL ratio)
  → If any metabolic markers suboptimal: Add Waist Circumference
  → 3 months in: Suggest Gut Microbiome test (microbiome-metabolism connection)
  → 6 months in: Suggest Omega-3 Index (insulin sensitivity, inflammation)
```

#### Goal: "Heart health / cardiovascular"
```
Start: Total Cholesterol, LDL, HDL, Triglycerides
  → After first lipid panel: Suggest ApoB (better single predictor)
  → After ApoB: Add hs-CRP (vascular inflammation)
  → If family history: Suggest Lp(a) (one-time genetic test)
  → 3 months in: Add Homocysteine (modifiable CVD risk)
  → 6 months in: Suggest VO2max + Resting HR (functional CVD risk)
  → If hs-CRP elevated: Suggest Gut Health panel (systemic inflammation source)
```

#### Goal: "More energy / reduce fatigue"
```
Start: Ferritin, B12, Vitamin D
  → After initial panel: Add Thyroid (TSH, Free T3, Free T4)
  → If male: Suggest Testosterone
  → After thyroid panel: Add Cortisol (adrenal fatigue pattern)
  → 3 months in: Add Magnesium + Folate (energy metabolism cofactors)
  → If persistent fatigue: Suggest Gut Health panel (malabsorption, inflammation)
  → 6 months in: Suggest HRV tracking (recovery/stress balance)
```

#### Goal: "Gut health / digestive wellness"
```
Start: Fecal Calprotectin, Microbiome Diversity
  → After first test: Add sIgA (mucosal immunity)
  → Add dietary tracking: Fiber intake (prebiotics)
  → After 2 gut tests: Add hs-CRP (systemic inflammation connection)
  → 3 months in: Add SCFA profile (butyrate production)
  → Suggest Ferritin + B12 (absorption markers)
  → 6 months in: Full metabolic panel (gut-metabolic axis)
```

#### Goal: "Optimize fitness / athletic performance"
```
Start: VO2max, Resting HR, Body Fat %
  → After 2 tests: Add HRV (recovery tracking)
  → Add Grip Strength (overall strength proxy)
  → 3 months in: Add Testosterone + Cortisol (recovery hormones)
  → Add Ferritin + Iron (oxygen transport)
  → 6 months in: Add Cystatin C (kidney health for athletes)
  → Suggest Creatinine context: "Your creatinine may be elevated due to muscle mass — Cystatin C is more accurate for active people"
```

#### Goal: "Longevity / healthspan"
```
Start: VO2max, HbA1c, ApoB, hs-CRP, Vitamin D
  → After first panel: Add Grip Strength (mortality predictor)
  → Add Fasting Insulin (metabolic aging)
  → 3 months in: Full hormonal panel (DHEA-S, IGF-1, cortisol)
  → Add Homocysteine (modifiable mortality risk)
  → 6 months in: Gut Microbiome diversity (biological aging marker)
  → Add Omega-3 Index + Waist Circumference
  → Annually: Full reassessment with trend analysis
```

### 7.3 Seasonal Nudge Calendar (Nordic)

| Month | Nudge | Rationale |
|-------|-------|-----------|
| **September** | "Test Vitamin D before winter" | Last month of meaningful sun exposure in Nordics |
| **October** | "Start Vitamin D supplementation (2000-4000 IU/day)" | Based on baseline test result (Grade A) |
| **January** | "New year health baseline — consider a comprehensive panel" | Engagement opportunity; natural goal-setting time |
| **March** | "Retest Vitamin D — check if supplementation is working" | Mid-winter follow-up |
| **April** | "Spring metabolic reset — retest HbA1c and lipids" | Post-winter dietary patterns; good retest timing |
| **June** | "Summer fitness check — test VO2max and body composition" | Outdoor activity season; motivation peak |

### 7.4 Lifetime Tracking Milestones

| Data points | Unlock | User message |
|-------------|--------|-------------|
| **First result entered** | Baseline established | "Great start! One reading is your baseline. Your second reading unlocks trend tracking." |
| **2 results (same marker)** | Trend arrow | "You now have a trend! We can show whether you're improving." |
| **3+ results** | Trend chart | "Your trend chart is ready. This is where real insights begin." |
| **5+ markers tracked** | Cross-marker correlations | "With 5+ markers, we can now spot connections between your biomarkers." |
| **2 time periods** | Period comparison | "Compare your results across seasons or interventions." |
| **12 months of data** | Annual health report | "Your first annual health report is ready — a full year of your health journey." |
| **Gut test + blood panel** | Gut-systemic connections | "We can now connect your gut health to your blood markers for deeper insights." |

---

## 8. Cross-Marker Correlation Rules for AI Insights

These patterns should be detected by the insight engine when sufficient data exists:

### 8.1 Red Flag Combinations (flag as warning/critical)

| Pattern | What it suggests | Action | Grade |
|---------|-----------------|--------|-------|
| High HbA1c + High Fasting Insulin + High Triglycerides | Metabolic syndrome / pre-diabetes | Urgent: recommend comprehensive metabolic workup | A |
| High hs-CRP + High Ferritin | Active inflammation (not iron overload) | Retest after illness resolves; investigate cause | B |
| Low Vitamin D + High hs-CRP + Low HRV | Inflammation-stress-deficiency triad | Common in Nordic winters; address Vitamin D first | B |
| High ApoB + High Lp(a) | Very high CVD risk (genetic + lipid) | Flag for medical review; may need pharmacotherapy | A |
| Low eGFR + High Creatinine (non-athlete) | Kidney function decline | Flag for medical review | A |
| High ALT + High GGT + High Ferritin | Fatty liver disease pattern | Assess alcohol, diet, medications | B |
| Low Testosterone + High Cortisol + Low HRV | Stress-driven hormonal suppression | Prioritize sleep and stress management before hormonal interventions | B |

### 8.2 Positive Patterns (flag as encouraging)

| Pattern | What it suggests | Message |
|---------|-----------------|---------|
| Improving VO2max + Decreasing resting HR | Cardiovascular fitness improving | "Your heart is getting stronger — keep it up!" |
| Decreasing HbA1c + Decreasing Triglycerides | Metabolic health improving | "Your metabolic markers are trending in the right direction." |
| Stable Vitamin D >75 nmol/L through winter | Adequate supplementation | "Your Vitamin D strategy is working — well done through the dark months." |
| High microbiome diversity + Low hs-CRP | Good gut-immune axis function | "Your gut health appears to be supporting low inflammation." |
| Improving grip strength + Stable lean mass | Resistance training is working | "Your strength is improving — this is one of the strongest longevity predictors." |

---

## 9. Supplement Recommendations Framework

### Rules

1. **Only recommend supplements with Grade A or B evidence for the specific deficiency/goal.**
2. **Always recommend food-first** — supplements are second-line unless the deficiency is severe or food-based correction is impractical.
3. **Cite dosing from established guidelines** (Nordic Nutrition Recommendations 2023, EFSA, or specific RCTs).
4. **Flag interactions** — e.g., iron + calcium compete for absorption; take separately.
5. **Prefer forms with better bioavailability** where evidence exists (e.g., magnesium glycinate over oxide).
6. **Include Nordic-available brands/forms** where relevant.

### Common Supplement Recommendations

| Deficiency | First-line | Dose (evidence-based) | Duration to retest | Grade | Nordic notes |
|-----------|-----------|----------------------|--------------------|----|------------|
| Vitamin D <50 nmol/L | Cholecalciferol (D3) | 2000–4000 IU/day | 3 months | **A** | D-vitamin from Apoteket; standard in Sweden |
| B12 <200 pmol/L | Methylcobalamin or cyanocobalamin | 1000 µg/day | 3 months | **A** | |
| Ferritin <30 µg/L | Iron bisglycinate | 25-50 mg every other day (better absorption) | 3 months | **A** | Every-other-day dosing superior (Stoffel et al., Lancet Haematology, 2017) |
| Magnesium (suspected low) | Magnesium glycinate or citrate | 200-400 mg/day | 3 months | **B** | Serum test unreliable; supplement if symptomatic |
| Omega-3 Index <8% | EPA+DHA fish oil or algae oil | 2-3 g combined EPA+DHA/day | 4 months | **A** | |
| Homocysteine >12 µmol/L | Methylfolate + Methylcobalamin + P5P (B6) | 400-800 µg folate + 1000 µg B12 + 50 mg B6 | 2 months | **A** | |
| Low gut diversity | Prebiotic fiber (inulin, resistant starch) | 5-15 g/day, titrate slowly | 3 months (retest microbiome) | **B** | Start low to avoid GI distress |

---

## 10. Data Model Implications

### 10.1 Proposed New Biomarker Category

Add an 8th category to the database:

```sql
-- Gut Health category
INSERT INTO biomarker_categories (id, name_en, name_sv, description_en, description_sv, icon, display_order) VALUES
  ('88888888-8888-8888-8888-888888888888', 'Gut Health', 'Tarmhälsa',
   'Gut microbiome and digestive health markers',
   'Tarmflora och matsmältningshälsomarkörer', 'bug', 8);
```

### 10.2 Proposed New Biomarkers for Gut Health Category

Priority markers for the gut health category:

1. **Fecal Calprotectin** (free tier — most clinically validated)
2. **Microbiome Diversity Index** (premium)
3. **Fecal Zonulin** (premium)
4. **Secretory IgA** (premium)
5. **SCFA — Butyrate** (premium)

### 10.3 New Tables Needed (Future)

- **nudge_rules** — configurable nudge triggers and messages
- **nudge_log** — track which nudges were shown, clicked, dismissed
- **user_dietary_log** — optional dietary pattern tracking (connects to gut health)
- **supplement_tracking** — what supplements a user takes (for correlation analysis)

### 10.4 Additional Biomarkers to Add to Existing Categories

Candidates to add in future seed migrations:

| Category | Marker | Rationale | Priority |
|----------|--------|-----------|----------|
| Metabolic | HOMA-IR | Gold-standard IR proxy; can auto-calculate | High |
| Cardiovascular | Lp(a) | Genetic CVD risk; test once | High |
| Inflammation | Fibrinogen | Clotting + inflammation | Medium |
| Inflammation | IL-6 | Key inflammaging cytokine | Low (expensive, research-grade) |
| Hormones | DHEA-S | Adrenal aging marker | Medium |
| Hormones | IGF-1 | Growth/aging axis | Medium |
| Vitamins | Omega-3 Index | Strong CVD predictor | High |
| Vitamins | Zinc | Immune, testosterone cofactor | Medium |
| Kidney & Liver | GGT | Alcohol/toxin marker | High |
| Kidney & Liver | Cystatin C | Better kidney marker for athletes | Medium |
| Kidney & Liver | Albumin | Nutritional/liver status | Medium |
| Physical | Grip Strength | Mortality predictor | High |
| Physical | Waist Circumference | Visceral fat proxy | High |
| Physical | Lean Mass | Sarcopenia prevention | Medium |

---

## 11. Content Article Topics (Phase 2 — Prioritized)

Based on the health domain knowledge above, prioritized educational content:

### Must-have (Launch)
1. "Understanding Your Blood Test Results" — beginner guide to biomarker interpretation
2. "The Nordic Guide to Vitamin D" — seasonal supplementation for Scandinavia
3. "ApoB: The Heart Disease Marker Your Doctor Might Not Test" — why it matters
4. "VO2max: The Strongest Predictor of How Long You'll Live" — and how to improve it
5. "Your Gut Microbiome and Longevity" — introduction to gut health tracking

### High priority (Month 1-2)
6. "Metabolic Health 101: Beyond Blood Sugar" — insulin resistance, HbA1c, HOMA-IR
7. "Probiotics That Actually Work: An Evidence Guide" — strain-specific recommendations
8. "Fiber and Your Microbiome" — prebiotic foods and their effects
9. "The Inflammation Panel: hs-CRP, Homocysteine, and What They Mean"
10. "Resistance Training for Longevity" — why strength matters as much as cardio

### Medium priority (Month 2-3)
11. "Hormones and Aging" — testosterone, estradiol, DHEA-S, cortisol
12. "The Gut-Brain Connection" — microbiome and mental health
13. "Iron: The Goldilocks Mineral" — dangers of both deficiency and excess
14. "Fermented Foods: A Nordic Tradition for Gut Health" — filmjölk, sauerkraut, kefir
15. "Cold Plunging and Sauna: What Does the Science Say?" — Nordic wellness traditions

---

*Last updated: 2026-02-11*
*Evidence grades reflect the state of research as of early 2026.*
*All citations should be verified against current literature when building content.*

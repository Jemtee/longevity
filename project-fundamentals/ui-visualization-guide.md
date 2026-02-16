# UI Visualization Guide — Health Interview & Dashboard

> Design reference for building Wellspring's health data visualization, AI interview flow, and insight presentation. All components use the existing design system: Shadcn/ui, Tailwind CSS, Lucide React icons, and the primary blue palette.

---

## 1. Design Principles

1. **Progressive disclosure.** Don't overwhelm — show summary first, details on demand.
2. **Visual hierarchy through evidence grades.** Strong evidence = prominent, preliminary = muted.
3. **Actionable, not decorative.** Every visualization should answer "so what?" — what should the user do?
4. **Consistent color semantics.** Colors always mean the same thing across the app.
5. **Mobile-first.** Every visualization must work on a phone screen.
6. **Accessible.** Never rely on color alone — always pair with icons, labels, or patterns.

---

## 2. Color Semantics

Assign consistent meaning to colors across the entire app:

```
Biomarker Status:
  Optimal     → success (#22c55e / green-500)    + CheckCircle icon
  Borderline  → warning (#f59e0b / amber-500)    + AlertTriangle icon
  Out of range → error (#ef4444 / red-500)        + AlertCircle icon
  No data     → gray-300                          + Circle icon (empty)

Trend Direction:
  Improving   → success + TrendingUp icon
  Stable      → primary-500 + Minus icon
  Declining   → error + TrendingDown icon
  New (1 reading) → gray-400 + Dot icon

Evidence Grades:
  Grade A (Strong)      → primary-600 bg, white text, solid badge
  Grade B (Moderate)    → primary-100 bg, primary-700 text, solid badge
  Grade C (Preliminary) → amber-100 bg, amber-700 text, dashed border
  Grade D (Expert)      → gray-100 bg, gray-600 text, dashed border

Priority Levels:
  Priority 1 (urgent)   → error bg-red-50 border-red-200
  Priority 2 (important) → warning bg-amber-50 border-amber-200
  Priority 3 (suggested) → primary bg-primary-50 border-primary-200

Environmental Risk:
  High exposure  → error red-500 + ShieldAlert icon
  Moderate       → warning amber-500 + ShieldQuestion icon (custom: Shield + ?)
  Low/safe       → success green-500 + ShieldCheck icon
```

---

## 3. AI Health Interview — Conversation UI

### 3.1 Layout: Chat-Style with Structured Inputs

The interview uses a hybrid chat + form pattern — the AI presents questions conversationally, but answers are captured via structured inputs (not free text) for data integrity.

```
┌──────────────────────────────────────────────────┐
│  ← Back                    Section 2 of 7        │
│                         ████████░░░░░░░ 28%      │
├──────────────────────────────────────────────────┤
│                                                   │
│  ┌─ AI Message ────────────────────────────────┐ │
│  │ 🧬 Let's talk about your nutrition.         │ │
│  │                                              │ │
│  │ How would you describe your typical diet?    │ │
│  │                                              │ │
│  │ Your diet pattern is the single strongest    │ │
│  │ modifiable factor for heart and metabolic    │ │
│  │ health.                                      │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  ┌─ Answer Options (card grid) ────────────────┐ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │ 🥗       │  │ 🐟       │  │ 🌱       │  │ │
│  │  │ Mediter- │  │ Nordic   │  │ Vegeta-  │  │ │
│  │  │ ranean   │  │          │  │ rian     │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │ 🥑       │  │ 🍽️       │  │ ✏️       │  │ │
│  │  │ Keto /   │  │ No       │  │ Other    │  │ │
│  │  │ Low carb │  │ specific │  │          │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  ┌─ Info Tooltip ──────────────────────────────┐ │
│  │ ℹ️ Why we ask: The PREDIMED trial showed    │ │
│  │ Mediterranean diet reduces CVD by 30%       │ │
│  │ (Grade A).                                  │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
└──────────────────────────────────────────────────┘
```

### 3.2 Question Input Types

| Input type | When to use | Component |
|-----------|------------|-----------|
| **Option cards** (grid) | Single-select with 3-6 options | Grid of tappable cards with icon + label |
| **Slider** | Numeric ranges (alcohol drinks/week, exercise min/week) | Shadcn Slider with labeled tick marks |
| **Multi-select pills** | Multiple answers (supplements, stress practices) | Pill/chip toggles that highlight when selected |
| **Yes / No** | Binary questions (do you filter water?) | Two large buttons, side by side |
| **Segmented control** | Ordered scale (poor / fair / good / excellent) | Horizontal button group |

### 3.3 Section Transitions

Between sections, show a **mini-insight card** summarizing what we learned:

```
┌─ Section Summary ──────────────────────────────┐
│                                                  │
│  ✅ Nutrition assessment complete                │
│                                                  │
│  Based on your answers:                          │
│  • Your high-fiber diet supports gut health      │
│  • Low fermented food intake — consider adding   │
│    yogurt or kefir (Grade B)                     │
│  • Your fish intake looks good for omega-3s      │
│                                                  │
│  Suggested markers: Omega-3 Index, Microbiome    │
│  Diversity, hs-CRP                               │
│                                                  │
│          [ Continue to Section 3 → ]             │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 3.4 Progress Tracking

- **Top bar:** Section indicator (1-7 dots or labeled segments) + percentage progress bar
- **Section labels visible on desktop:** Goals → Nutrition → Kitchen → Exercise → Sleep → Medical → Environment
- **Mobile:** Condensed to "Section 2 of 7" + progress bar

---

## 4. Health Profile — Post-Interview Dashboard

### 4.1 Profile Summary Card (Hero)

Displayed at the top of the dashboard after the interview is complete. Replaces the onboarding card.

```
┌──────────────────────────────────────────────────┐
│  YOUR HEALTH PROFILE                             │
│  Last updated: Feb 12, 2026                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ 🎯       │ │ 📊       │ │ ⚠️       │         │
│  │ Goal:    │ │ Tracking │ │ 2 flags  │         │
│  │ Heart    │ │ 8 markers│ │          │         │
│  │ Health   │ │          │ │          │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│                                                   │
│  [ View Full Profile ]  [ Retake Interview ]     │
└──────────────────────────────────────────────────┘
```

### 4.2 Recommended Panel — Prioritized Biomarker List

```
┌─ Recommended Biomarker Panel ────────────────────┐
│                                                    │
│  PRIORITY 1 — Start tracking now                  │
│  ┌────────────────────────────────────────────┐   │
│  │ ❤️ ApoB                          [A]      │   │
│  │ Best single predictor of heart disease      │   │
│  │ ────────────────────────────────────────    │   │
│  │ ❤️ hs-CRP                        [A]      │   │
│  │ Vascular inflammation marker                │   │
│  │ ────────────────────────────────────────    │   │
│  │ 🔬 HbA1c                         [A]      │   │
│  │ 3-month metabolic health snapshot           │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
│  PRIORITY 2 — Add at your next test               │
│  ┌────────────────────────────────────────────┐   │
│  │ 🧬 Lp(a)                         [A]      │   │
│  │ Genetic risk — family history flagged       │   │
│  │ ────────────────────────────────────────    │   │
│  │ 💊 Homocysteine                   [A]      │   │
│  │ Modifiable CVD risk via B-vitamins          │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
│  PRIORITY 3 — Expand in 3-6 months               │
│  ┌────────────────────────────────────────────┐   │
│  │ 🏃 VO2max                         [A]      │   │
│  │ Strongest single longevity predictor        │   │
│  │ ────────────────────────────────────────    │   │
│  │ 🦠 Gut Microbiome Diversity       [A]      │   │
│  │ Connects gut health to inflammation         │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
└──────────────────────────────────────────────────┘
```

### 4.3 Environmental Flags Card

```
┌─ Environmental Health Flags ─────────────────────┐
│                                                    │
│  🛡️🔴 HIGH: Non-stick cookware (scratched)       │
│  PFAS exposure linked to elevated cholesterol      │
│  and thyroid disruption (Grade A).                 │
│  → Replace with stainless steel or enameled        │
│    cast iron                                       │
│                                                    │
│  🛡️🟡 MODERATE: Unfiltered tap water             │
│  Consider activated carbon filter for PFAS         │
│  removal (~60-70%) (Grade A).                      │
│                                                    │
│  🛡️🟢 LOW: Glass food storage                    │
│  Your food storage choices minimize chemical        │
│  exposure. No action needed.                       │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## 5. Biomarker Dashboard — Enhanced Visualization

### 5.1 Biomarker Card (Redesigned)

Replace the current text-only card with a visual card showing status at a glance:

```
┌─ ApoB ─────────────────────────────── ❤️ ─────┐
│                                                  │
│  0.72 g/L              ↗ Improving               │
│  Tested: Jan 15, 2026      vs 0.85 (Oct 2025)   │
│                                                  │
│  ├──────────[████████░░]──────────┤              │
│  0.4      optimal      0.8    1.0 ref            │
│           ← you are here                         │
│                                                  │
│  ✅ Optimal range        Grade A marker          │
│                                                  │
│  [ View History ]  [ Related Insights ]          │
└──────────────────────────────────────────────────┘
```

**Key elements:**
- **Value + trend arrow** — large, prominent, at the top
- **Range bar** — horizontal bar showing where the value falls within reference and optimal ranges
- **Status badge** — color-coded (green/amber/red) with icon
- **Mini-trend** — comparison to previous reading
- **Actions** — view history chart, see related insights

### 5.2 Range Bar Component

A horizontal bar that visually shows where a value sits relative to optimal and reference ranges:

```
Reference range:  |─────────────────────────────|
Optimal range:        |══════════════|
User value:                    ▼

Visual:
  ┌──────┬════════▼═══════┬──────────┐
  │ low  │    optimal     │   high   │
  └──────┴════════════════┴──────────┘

Colors:
  - Left of optimal: amber (borderline low)
  - Optimal zone: green
  - Right of optimal: amber (borderline high)
  - Beyond reference: red
  - User marker: black/dark dot or line
```

Implementation: A single div with CSS gradient background sections, proportionally sized.

### 5.3 Trend Sparkline

Small inline chart (64x24px) showing the last 3-6 readings as a sparkline:

```
  .    .
 . .  .
.   ..

↗ Improving (3 readings over 6 months)
```

Use SVG path or a tiny chart library. No axes, no labels — just the shape of the trend. Color matches the trend direction (green=improving, red=declining, blue=stable).

### 5.4 Category Overview — Ring Chart

For each biomarker category, show a summary ring/donut:

```
┌─ Cardiovascular ──────── ❤️ ──────┐
│                                    │
│      ┌──────────┐                  │
│      │  4 / 5   │   4 optimal     │
│      │ ●●●●○    │   1 no data     │
│      └──────────┘                  │
│                                    │
│  ApoB ✅  LDL ✅  HDL ✅  Trig ✅ │
│  Lp(a) ○ (not tracked)            │
│                                    │
│  [ Expand Category ]               │
└────────────────────────────────────┘
```

The dots (●○) or a small donut chart show proportion tracked and in-range vs. needing attention.

---

## 6. Biomarker Connection Graph

### 6.1 Concept: The "Health Web"

A visual graph showing how biomarkers connect to each other. This is the key differentiator — no other consumer health app shows cross-marker relationships.

```
                    ┌─────────┐
              ┌────→│ hs-CRP  │←────┐
              │     └────┬────┘     │
              │          │          │
        ┌─────┴──┐   ┌──┴──────┐  ┌┴────────┐
        │ Gut    │   │ HbA1c   │  │ ApoB    │
        │Microbi.│   │         │  │         │
        └────┬───┘   └──┬──────┘  └┬────────┘
             │          │          │
             └──────┬───┘          │
                    │              │
              ┌─────┴──┐    ┌─────┴──┐
              │Fasting │    │ Trig   │
              │Insulin │    │        │
              └────────┘    └────────┘
```

### 6.2 Implementation Approach

**Phase 1 (simpler):** A flat card-based "connections" view:

```
┌─ Connections for: hs-CRP (2.3 mg/L ⚠️) ────────┐
│                                                    │
│  Your hs-CRP is borderline. These markers are     │
│  connected:                                        │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ → Gut Microbiome Diversity     NOT TRACKED   │ │
│  │   Low diversity drives hs-CRP up (Grade A)   │ │
│  │   [ Start Tracking ]                          │ │
│  ├──────────────────────────────────────────────┤ │
│  │ → HbA1c                        5.2% ✅      │ │
│  │   Metabolic inflammation pathway (Grade A)    │ │
│  │   Status: Your HbA1c is fine — less likely   │ │
│  │   to be the source of your inflammation.      │ │
│  ├──────────────────────────────────────────────┤ │
│  │ → Vitamin D                    45 nmol/L ⚠️  │ │
│  │   Low Vitamin D linked to higher hs-CRP      │ │
│  │   (Grade B)                                   │ │
│  │   → Suggestion: Supplement 2000-4000 IU/day  │ │
│  ├──────────────────────────────────────────────┤ │
│  │ → Body Fat %                   NOT TRACKED   │ │
│  │   Visceral fat is a major CRP driver (A)     │ │
│  │   [ Start Tracking ]                          │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Phase 2 (richer):** Interactive node graph using a library like `react-force-graph`, `d3-force`, or `@xyflow/react` (formerly ReactFlow). Nodes are biomarkers, edges are relationships, colors reflect status.

### 6.3 Recommended Libraries

| Library | Purpose | Why |
|---------|---------|-----|
| **Recharts** | Line/bar/area charts for trends | Already React-native, composable, lightweight |
| **@xyflow/react** | Node-edge graph for biomarker connections | Interactive, React-native, supports custom nodes |
| **Nivo** | Heatmaps, radar charts, chord diagrams | Beautiful defaults, React-native |
| **Tremor** | Dashboard chart components | Built on Recharts, Tailwind-compatible, fast to build |

**Recommendation:** Start with **Recharts** for trend charts and **Tremor** for dashboard metrics. Add **@xyflow/react** for the connection graph in Phase 3.

---

## 7. Evidence Grade Badges

A consistent visual pattern used everywhere recommendations appear:

```
Grade A (Strong):
  ┌────┐
  │ A  │  Solid primary-600 background, white text
  └────┘  Font: bold, text-xs, rounded-md, px-2 py-0.5

Grade B (Moderate):
  ┌────┐
  │ B  │  primary-100 background, primary-700 text
  └────┘  Same sizing

Grade C (Preliminary):
  ┌╌╌╌╌┐
  │ C  │  amber-100 background, amber-700 text, dashed border
  └╌╌╌╌┘  Dashed border signals weaker evidence

Grade D (Expert):
  ┌╌╌╌╌┐
  │ D  │  gray-100 background, gray-600 text, dashed border
  └╌╌╌╌┘
```

**Usage:** These badges appear:
- Next to every recommendation in the Health Profile
- In insight cards
- In educational content
- In nudge cards
- In the AI interview section summaries

### Tooltip on badge hover/tap:

```
┌─ Grade A — Strong Evidence ────────────────────┐
│ Supported by 2+ large randomized controlled     │
│ trials or meta-analyses in top-tier journals.    │
│                                                  │
│ You can have high confidence in this             │
│ recommendation.                                  │
└──────────────────────────────────────────────────┘
```

---

## 8. Insight Cards

### 8.1 Card Types by Severity

**Positive Insight (encouraging):**
```
┌─────────────────────────────────────────────────┐
│ 🟢 ✅ Your metabolic health is improving         │
│                                                   │
│ Your HbA1c dropped from 38 to 35 mmol/mol over  │
│ the last 3 months, now in the optimal range.     │
│ Combined with improving triglycerides, your       │
│ metabolic markers are trending well.              │
│                                                   │
│ 📎 Connected: HbA1c ↗, Triglycerides ↗          │
│                                      [A]         │
│                                                   │
│ Keep doing what you're doing — your dietary       │
│ changes appear to be working.                     │
└─────────────────────────────────────────────────┘
  Border-left: 4px solid green-500
  Background: green-50
```

**Warning Insight (attention needed):**
```
┌─────────────────────────────────────────────────┐
│ 🟡 ⚠️ Vitamin D dropping into deficiency         │
│                                                   │
│ Your Vitamin D is 42 nmol/L, down from 68 in    │
│ June. This is common in Nordics entering winter. │
│                                                   │
│ 📎 Connected: hs-CRP (may rise), Immune function│
│                                      [A]         │
│                                                   │
│ Recommendation: Start 2000-4000 IU/day D3.       │
│ Retest in 3 months.                              │
│                                                   │
│ [ Mark as Read ]  [ Set Reminder to Retest ]     │
└─────────────────────────────────────────────────┘
  Border-left: 4px solid amber-500
  Background: amber-50
```

**Critical Insight (flag for review):**
```
┌─────────────────────────────────────────────────┐
│ 🔴 🚨 Metabolic pattern needs attention          │
│                                                   │
│ High HbA1c (43) + High Fasting Insulin (165     │
│ pmol/L) + High Triglycerides (2.1 mmol/L)       │
│ together suggest insulin resistance.              │
│                                                   │
│ 📎 Connected: HbA1c ↘, Insulin ↘, Trig ↘       │
│                                      [A]         │
│                                                   │
│ ⚕️ Consider discussing these results with your   │
│ healthcare provider. This pattern can precede     │
│ type 2 diabetes by 5-10 years (Tabák et al.,     │
│ Lancet, 2012).                                   │
│                                                   │
│ [ Mark as Read ]  [ Find a Provider ]            │
└─────────────────────────────────────────────────┘
  Border-left: 4px solid red-500
  Background: red-50
```

**Informational Insight (educational):**
```
┌─────────────────────────────────────────────────┐
│ 🔵 💡 Did you know?                              │
│                                                   │
│ Your ApoB (0.72 g/L) and LDL-C (2.4 mmol/L)    │
│ are concordant — they tell the same story. In     │
│ ~25% of people these diverge, making ApoB the    │
│ more reliable predictor.                          │
│                                      [A]         │
│                                                   │
│ [ Learn More About ApoB ]                        │
└─────────────────────────────────────────────────┘
  Border-left: 4px solid primary-500
  Background: primary-50
```

---

## 9. Nudge Cards

Nudges appear as subtle, dismissible cards — never modal or blocking.

### 9.1 Biomarker Expansion Nudge

```
┌─ 💡 Suggestion ──────────────────────────────────┐
│                                                    │
│  You're tracking LDL cholesterol — nice!           │
│                                                    │
│  Have you considered ApoB?                         │
│  It's a better predictor of heart disease than     │
│  LDL alone. About 25% of people have normal LDL   │
│  but elevated ApoB.                                │
│                                      [A]           │
│  Sniderman et al., Lancet, 2019                    │
│                                                    │
│  [ Add ApoB to My Panel ]    [ Not Now ]           │
│                                                    │
└──────────────────────────────────────────────────┘
  Background: white
  Border: 1px solid primary-200
  Subtle shadow
```

### 9.2 Seasonal Nudge

```
┌─ 🌙 Seasonal Reminder ──────────────────────────┐
│                                                    │
│  Winter is coming — time to check Vitamin D        │
│                                                    │
│  80%+ of Scandinavians become deficient between    │
│  October and April. A simple blood test now         │
│  establishes your baseline for winter               │
│  supplementation.                              [A] │
│                                                    │
│  [ Test Vitamin D ]  [ Dismiss ]                   │
│                                                    │
└──────────────────────────────────────────────────┘
  Background: gradient primary-50 → white
```

### 9.3 Milestone Nudge

```
┌─ 🎉 Milestone Unlocked ─────────────────────────┐
│                                                    │
│  You now have 5+ markers tracked!                  │
│                                                    │
│  We can now show cross-marker correlations —       │
│  connections between your biomarkers that reveal    │
│  patterns a single marker can't show.              │
│                                                    │
│  [ View My Connections ]                           │
│                                                    │
└──────────────────────────────────────────────────┘
  Background: gradient from primary-50 to secondary-50
  Border: 1px solid primary-200
```

---

## 10. Trend Charts

### 10.1 Single Biomarker Trend

```
┌─ HbA1c — 12 Month Trend ────────────────────────┐
│                                                    │
│  42 ┤─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  reference max  │
│     │                                              │
│  38 ┤          •                                   │
│     │         / \                                  │
│  36 ┤────────/───\──────────────── optimal max     │
│     │       /     \    •                           │
│  34 ┤      •       \  / \                          │
│     │               \/   •    ← current            │
│  32 ┤─────────────────────────── optimal min       │
│     │                                              │
│  20 ┤────────────────────────── reference min      │
│     ├───┬───┬───┬───┬───┬───┤                     │
│     Feb Apr Jun Aug Oct Dec                        │
│                                                    │
│  Zones: 🟢 Optimal  🟡 Reference  🔴 Out of range│
│                                                    │
└──────────────────────────────────────────────────┘
```

**Implementation:**
- Use Recharts `<AreaChart>` with reference areas for optimal/reference zones
- Green-shaded optimal zone, amber-shaded borderline zones
- Data points as dots; line connecting them
- Hover/tap a point to see exact value and date
- Responsive: full chart on desktop, simplified sparkline on mobile

### 10.2 Multi-Marker Comparison (Overlay)

For correlated markers (e.g., hs-CRP + Vitamin D), overlay two trends:

```
┌─ hs-CRP vs Vitamin D ───────────────────────────┐
│                                                    │
│  hs-CRP (mg/L)              Vitamin D (nmol/L)    │
│  3.0 ┤                                   ┤ 100   │
│      │  •                                 │       │
│  2.0 ┤   \        hs-CRP ───            ┤ 75    │
│      │    \      /                  •     │       │
│  1.0 ┤     •───•        Vitamin D ---  / ┤ 50    │
│      │                          ---•--•   │       │
│  0.0 ┤                                   ┤ 25    │
│      ├────┬────┬────┬────┬────┬────┤              │
│      Jun  Jul  Aug  Sep  Oct  Nov                  │
│                                                    │
│  💡 As Vitamin D dropped, hs-CRP rose —           │
│  this is a common pattern (Grade B)                │
│                                                    │
└──────────────────────────────────────────────────┘
```

### 10.3 Period Comparison

Side-by-side comparison of two time periods:

```
┌─ Metabolic Panel: Summer vs Winter ──────────────┐
│                                                    │
│  Marker        Summer 2025    Winter 2026   Trend │
│  ─────────────────────────────────────────────────│
│  HbA1c         34 ✅          36 ✅          →    │
│  F. Glucose     4.6 ✅         4.9 ✅        ↗    │
│  F. Insulin     38 ✅          52 ⚠️         ↘    │
│  Triglycerides  0.8 ✅         1.2 ⚠️        ↘    │
│                                                    │
│  💡 Your fasting insulin and triglycerides rose    │
│  over winter. This is common with seasonal dietary │
│  changes and reduced activity.                     │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## 11. Gut Health Visualization

### 11.1 Microbiome Overview Card

```
┌─ 🦠 Gut Health Overview ────────────────────────┐
│                                                    │
│  Diversity Score: 3.8 (Shannon Index)              │
│  ████████████████████░░░░░ Good                    │
│  (Target: >3.5)                                    │
│                                                    │
│  Key Populations:                                  │
│  ┌────────────────────────────────────────────┐   │
│  │ Bifidobacterium    ██████████░░░ 8%  ✅    │   │
│  │ Butyrate producers █████████████ 18% ✅    │   │
│  │ Akkermansia        ████░░░░░░░░░ 2%  ⚠️   │   │
│  │ Proteobacteria     ███░░░░░░░░░░ 3%  ✅    │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
│  Gut-Blood Connections:                            │
│  🔗 Low Akkermansia may relate to your            │
│     elevated HbA1c (Grade B)                       │
│  🔗 Good butyrate producers support your           │
│     low hs-CRP (Grade B)                          │
│                                                    │
│  [ View Full Report ]  [ Retest Microbiome ]      │
└──────────────────────────────────────────────────┘
```

### 11.2 Gut-Systemic Connection Map

```
┌─ How Your Gut Connects to Blood Markers ─────────┐
│                                                    │
│  GUT MARKER          →   BLOOD MARKER    STATUS   │
│  ──────────────────────────────────────────────── │
│  Diversity (3.8)     →   hs-CRP (0.8)    ✅ ✅   │
│  "Good gut diversity supports low inflammation"    │
│                                           [A]     │
│                                                    │
│  Akkermansia (2%)    →   HbA1c (37)      ⚠️ ⚠️  │
│  "Low Akkermansia linked to insulin resistance"    │
│                                           [B]     │
│                                                    │
│  Butyrate (12 µmol/g)→  F.Insulin (45)  ✅ ✅   │
│  "Adequate butyrate supports insulin sensitivity"  │
│                                           [B]     │
│                                                    │
│  Calprotectin (28)   →   Ferritin (55)   ✅ ✅   │
│  "No gut inflammation — nutrient absorption OK"    │
│                                           [A]     │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## 12. Environmental Health Dashboard Section

### 12.1 Exposure Summary Cards

```
┌─ 🛡️ Your Environmental Profile ─────────────────┐
│                                                    │
│  ┌─ Kitchen ────────────┐  ┌─ Water ────────────┐│
│  │ 🍳 Cookware: Mixed   │  │ 🚰 Source: Tap    ││
│  │ ⚠️ Scratched PTFE    │  │ ⚠️ No filter      ││
│  │ detected              │  │                    ││
│  │                       │  │ Consider carbon    ││
│  │ Risk: PFAS exposure   │  │ filter for PFAS   ││
│  │ → TSH, LDL-C    [A]  │  │ → LDL-C, TSH [A]  ││
│  │                       │  │                    ││
│  │ [See Alternatives]    │  │ [Filter Options]   ││
│  └───────────────────────┘  └────────────────────┘│
│                                                    │
│  ┌─ Food Storage ───────┐  ┌─ Overall ──────────┐│
│  │ 📦 Mostly glass      │  │ 🟢 2 flags        ││
│  │ ✅ Low exposure       │  │ 🟡 1 action taken ││
│  │                       │  │ 🔴 0 critical     ││
│  │ No changes needed     │  │                    ││
│  └───────────────────────┘  └────────────────────┘│
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## 13. Shadcn/ui Components to Add

The following Shadcn/ui components should be installed to support these visualizations:

```bash
npx shadcn@latest add badge          # Evidence grade badges
npx shadcn@latest add tooltip        # Hover explanations
npx shadcn@latest add tabs           # Section navigation
npx shadcn@latest add dialog         # Detail modals
npx shadcn@latest add alert          # Insight severity variants
npx shadcn@latest add separator      # Section dividers
npx shadcn@latest add slider         # Interview numeric inputs
npx shadcn@latest add toggle-group   # Multi-select pills
npx shadcn@latest add accordion      # Expandable sections
npx shadcn@latest add sheet          # Mobile slide-out panels
npx shadcn@latest add avatar         # User profile
npx shadcn@latest add skeleton       # Loading states
npx shadcn@latest add collapsible    # Progressive disclosure
```

---

## 14. Chart Libraries to Install

```bash
npm install recharts              # Primary charting (trend lines, areas)
npm install tremor                # Dashboard metric components (optional)
```

Future additions (Phase 3):
```bash
npm install @xyflow/react         # Interactive biomarker connection graph
```

---

## 15. Responsive Breakpoints

| Breakpoint | Layout behavior |
|-----------|----------------|
| **Mobile** (<640px) | Single column. Sparklines instead of full charts. Stacked cards. Collapsible sections. |
| **Tablet** (640-1024px) | 2-column grids. Medium charts. Side-by-side comparisons. |
| **Desktop** (>1024px) | 3-4 column grids. Full trend charts. Connection graph. Multi-panel dashboard. |

---

## 16. Page Structure — Information Architecture

```
/dashboard
  ├── Hero: Health Profile summary (post-interview) or Onboarding (pre-interview)
  ├── Active Nudge (max 1, dismissible)
  ├── Recent Insights (top 3, by severity)
  └── Quick Stats (markers tracked, trends, next test due)

/dashboard/interview
  ├── Section progress bar
  ├── Current question (chat-style)
  ├── Structured input
  ├── Section summaries (between sections)
  └── Final: Health Profile generation

/dashboard/biomarkers
  ├── Category overview rings
  ├── Biomarker cards (grouped by category)
  │   └── Each card: value, range bar, trend sparkline, status badge
  └── Expansion suggestions (based on nudge engine)

/dashboard/biomarkers/[id]
  ├── Full trend chart (6-12 months)
  ├── Range visualization
  ├── Connected markers (flat list → graph in Phase 3)
  ├── Related insights
  └── Related content articles

/dashboard/insights
  ├── Insight feed (sorted by severity, then date)
  ├── Filter: All / Positive / Warning / Critical / Educational
  └── Each insight: severity card with evidence badge + actions

/dashboard/profile
  ├── Health Profile from interview
  ├── Environmental flags
  ├── Recommended panel (prioritized)
  ├── Supplement suggestions
  └── [Retake Interview] button
```

---

*Last updated: 2026-02-15*

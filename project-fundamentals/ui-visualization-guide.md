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

## 17. UX Audit — Competitor Analysis & Improvement Plan

### 17.1 Competitor Benchmarks

Based on analysis of Oura, Whoop, Levels, Apple Health, InsideTracker, Neko Health, Eight Sleep, and Cronometer:

| Principle | Industry best practice | Current Wellspring | Gap |
|-----------|----------------------|-------------------|-----|
| **"One big thing" on home screen** | Oura shows readiness score; Whoop shows recovery; Levels shows metabolic zone — all in 0 taps | Welcome text + static goal cards with hardcoded data | No hero metric. User sees text, not data. |
| **Color-coded health status** | Universal green/amber/red for optimal/borderline/action (Oura, Whoop, InsideTracker) | Only green for "optimal" label on biomarker page; no amber/red system | No status indicators on biomarker cards. Range bar missing. |
| **Trend direction at a glance** | Oura sparklines, Apple Health trend arrows, Eight Sleep score history | None — no trend visualization anywhere | No trend data shown; no sparklines, no arrows |
| **Score/ring visualization** | Oura circle progress, Whoop strain gauge, Levels zone ring | Only `Progress` bar (h-2, primary-500) for goal tracking | Flat progress bars only; no category health rings |
| **Progressive disclosure** | All top apps: headline → detail on tap → deep dive on scroll | All content visible at once on every page | No expand/collapse; no detail views; no drill-down |
| **Animated transitions** | Oura color state transitions; Eight Sleep curve animations; Whoop recovery gauge animation | `transition-colors` on hover only (border, text color) | No entrance animations, no data transitions, no skeleton loading |
| **Skeleton loading states** | Standard in all modern apps — prevents layout shift and signals content incoming | None — pages render blank then full content | No loading states; jarring flash on server component render |
| **Onboarding personalization** | Whoop starts simple + reveals depth; Oura "one big thing"; Levels customizes to goal | 3-step form in a single card — checkboxes and selects, no feedback until submit | No progressive feedback; no "here's what we learned" summary; no immediate value |
| **Journal / habit tracking** | Whoop: 140+ customizable daily parameters; auto-prompts every morning | Checkbox list of 5 habits in onboarding only | No ongoing habit tracking; habits are asked once and never revisited |
| **Scandinavian design aesthetic** | Neko Health: pastels, generous whitespace, minimal surfaces, psychological safety | Gray-50 backgrounds, standard card borders, no distinctive warmth | Functional but generic; doesn't evoke the Neko-style calm/premium feel |

### 17.2 Critical UX Issues (Fix Now)

#### Issue 1: Dashboard has no data — it's a static wireframe

**Current state:** The returning user dashboard shows hardcoded goals ("3 of 5 biomarkers tracked" — always) and a static recommendations list. There's no actual user data displayed.

**Fix:** The dashboard hero should show real data:
- If user has test results → show the most important metric as a hero number
- If user has no data yet → show the interview CTA as a prominent action card
- Replace hardcoded goals with actual database-driven counts

**Competitor reference:** Oura shows your readiness score front-and-center the moment you open the app. Whoop shows recovery percentage. The "one big thing" principle.

#### Issue 2: Biomarker cards show reference ranges but no user values

**Current state:** Biomarker page lists all 30 markers grouped by category, showing name + reference/optimal ranges. But no user values are displayed — there's no way to see your actual results on this page.

**Fix:**
- Fetch user's latest test results and display them on each biomarker card
- Add the range bar visualization (Section 5.2) showing where the value falls
- Add trend sparkline if 2+ readings exist
- Add status badge (green/amber/red) based on where value sits

**Competitor reference:** InsideTracker shows value + color coding + trend for every biomarker on a single dashboard view. Cronometer shows fill bars for every nutrient.

#### Issue 3: No "Add Test Result" flow anywhere

**Current state:** There is no way for a user to enter a biomarker value. The `test_results` table exists in the schema but there's no UI to write to it.

**Fix:** Add a prominent "Log Result" button on:
- Each biomarker card (small icon button)
- The biomarker detail page (primary CTA)
- A floating action button on mobile

Use a Dialog (Shadcn/ui) with: biomarker selector, value input, date picker, optional notes field.

#### Issue 4: No transitions or motion — the app feels static

**Current state:** The only motion is `transition-colors` on hover (border and text color changes). No page transitions, no data animations, no entrance effects.

**Fix — Motion Design System:**

```
Entry animations (pages & cards):
  - Cards: fade-in + translate-y-2 → 0, duration-300, stagger 50ms per card
  - Pages: fade-in opacity 0 → 1, duration-200
  - Numbers: count-up animation on first render (for hero metrics)

State transitions:
  - Range bar fill: animate width from 0 → actual%, duration-500, ease-out
  - Progress bars: already have transition-all duration-300 (good)
  - Status color: cross-fade between states, duration-200

Micro-interactions:
  - Button press: scale-95 on active, duration-75
  - Card tap: subtle scale-[0.98] + shadow increase, duration-100
  - Checkmark toggle: spring animation (scale 0 → 1.1 → 1.0)
  - Sparkline draw: SVG stroke-dashoffset animation, duration-800

Loading states:
  - Skeleton shimmer: bg-gradient animate-pulse (Shadcn skeleton)
  - Replace every data fetch with skeleton → real content transition

Page transitions:
  - Use CSS View Transitions API (Next.js 16 supports this)
  - Or framer-motion: AnimatePresence for route changes
  - Keep it subtle: opacity + y-translate, max 200ms
```

**Implementation — Tailwind animation utilities to add:**

```js
// tailwind.config.js — extend animation
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'count-up': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'draw-line': 'draw-line 0.8s ease-out forwards',
      },
    },
  },
}
```

**Usage pattern for staggered card entry:**
```tsx
{items.map((item, i) => (
  <div
    key={item.id}
    className="animate-fade-in"
    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'backwards' }}
  >
    <BiomarkerCard marker={item} />
  </div>
))}
```

### 17.3 Design Improvements (Polish Phase)

#### Improvement 1: Warm Scandinavian aesthetic (Neko-inspired)

**Current:** Generic gray-50 backgrounds, standard borders, no warmth.

**Proposed changes:**
- Background: shift from `gray-50` to a subtle warm tone: `bg-[#fafaf8]` (off-white with warm undertone)
- Card backgrounds: keep white but add `shadow-sm hover:shadow-md transition-shadow` for depth
- Border color: soften from `gray-200` to `gray-150` / `border-[#e8e6e3]` (warmer gray)
- Add subtle gradient headers on key cards: `bg-gradient-to-r from-white to-primary-50/30`
- Typography: increase line-height on body text to 1.6 (more breathable)
- Spacing: increase `space-y-6` to `space-y-8` on main containers (more whitespace)

**Neko principle:** Premium health UX comes from generous whitespace and visual restraint, not feature density.

#### Improvement 2: Hero health score (Oura-inspired)

Replace the generic "Welcome back" header with a dynamic health overview:

```
┌──────────────────────────────────────────────────────┐
│                                                        │
│   Good morning, Erik                                   │
│                                                        │
│   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐         │
│   │  🟢  │   │  🟡  │   │  🟢  │   │  ○○  │         │
│   │  5/5  │   │  3/5  │   │  2/2  │   │  0/3  │         │
│   │ Meta- │   │ Cardio│   │ Vita- │   │ Gut   │         │
│   │ bolic │   │       │   │ mins  │   │ Health│         │
│   └──────┘   └──────┘   └──────┘   └──────┘         │
│   optimal     mixed      optimal     not tracked      │
│                                                        │
│   ┌────────────────────────────────────────────────┐  │
│   │ 💡 Your Vitamin D is due for a retest (last:   │  │
│   │    Sep 2025). Winter supplementation check. [A] │  │
│   │    [ Schedule Retest ]      [ Dismiss ]         │  │
│   └────────────────────────────────────────────────┘  │
│                                                        │
└──────────────────────────────────────────────────────┘
```

**Key elements:**
- Horizontally scrolling category health rings (mobile) or grid (desktop)
- Each ring: donut showing proportion of markers in optimal/borderline/out-of-range
- Single most important nudge/insight below
- Greeting uses actual time of day ("Good morning" / "Good afternoon" / "Good evening")

#### Improvement 3: Biomarker card redesign with data

**Current card:**
```
┌────────────────────────┐
│ HbA1c          [Sv]    │
│ Reference: 20-42       │
│ Optimal: 20-36         │
└────────────────────────┘
```

**Proposed card (with data):**
```
┌────────────────────────────────────────────┐
│  HbA1c                          ↗ 33 → 35 │
│  35 mmol/mol             ┌──────────────┐  │
│  ✅ Optimal              │ ··  ·        │  │
│                          │·  ··  ·      │  │
│  ├──[████████░░]─────┤   └──────────────┘  │
│  20   optimal    36  42   6-month sparkline │
│      ↑ you                                 │
│                                            │
│  [ + Log Result ]    [ View Details → ]    │
└────────────────────────────────────────────┘
```

**Key additions:**
- Large value number (prominent, left-aligned)
- Status badge with icon (CheckCircle/AlertTriangle/AlertCircle)
- Range bar with marker showing position
- Sparkline (last 3-6 readings, 64x24px SVG)
- Trend direction + delta from previous reading
- Action buttons: log new result, view detail page

#### Improvement 4: Loading skeletons everywhere

Every data-dependent component should show a skeleton before real data loads:

```tsx
// components/ui/biomarker-card-skeleton.tsx
export function BiomarkerCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-8 w-20 bg-gray-200 rounded mb-2" />
      <div className="h-2 w-full bg-gray-200 rounded-full mb-3" />
      <div className="flex justify-between">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  )
}
```

Use React Suspense boundaries around data-fetching components, with skeleton fallbacks.

#### Improvement 5: Empty states that guide action

Every page needs a designed empty state when there's no data:

```
┌──────────────────────────────────────────────────┐
│                                                    │
│            ┌────────────────┐                      │
│            │   📊           │                      │
│            │                │                      │
│            └────────────────┘                      │
│                                                    │
│   No biomarker data yet                            │
│                                                    │
│   Log your first test result to start tracking     │
│   your health journey. We recommend starting with  │
│   your most recent blood test.                     │
│                                                    │
│   [ Log Your First Result ]                        │
│                                                    │
│   Or take the Health Interview to get personalized │
│   recommendations on what to test first.           │
│                                                    │
│   [ Start Health Interview → ]                     │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Competitor reference:** Oura shows "wear your ring tonight" as first empty state — clear, single action. Not a wall of placeholder content.

### 17.4 Motion Design Specification

#### Hierarchy of Motion

| Priority | Element | Animation | Duration | Easing |
|----------|---------|-----------|----------|--------|
| 1 (critical) | Page content entrance | fade-in + slide-up | 300ms | ease-out |
| 1 | Skeleton → real content | cross-fade | 200ms | ease-in-out |
| 2 (important) | Card entrance (staggered) | fade-in + translate-y(8px) | 300ms, stagger 50ms | ease-out |
| 2 | Range bar fill | width 0 → value | 500ms | ease-out |
| 2 | Number count-up (hero metrics) | 0 → actual value | 600ms | ease-out |
| 3 (delightful) | Sparkline draw | stroke-dashoffset | 800ms | ease-out |
| 3 | Status badge appear | scale(0.8) → scale(1) | 200ms | spring |
| 3 | Trend arrow | fade-in + slight bounce | 300ms | spring |
| 4 (subtle) | Button press | scale(0.97) | 75ms | ease-in |
| 4 | Card hover | shadow-sm → shadow-md | 150ms | ease-out |
| 4 | Nav link active state | background color fade | 150ms | ease-in-out |

#### Animation Timing Rules

1. **Never animate anything longer than 800ms** — feels slow.
2. **Content entrance: 200-400ms.** Any faster feels abrupt; any slower blocks the user.
3. **Stagger: 30-60ms between cards.** More than 100ms feels sequential instead of grouped.
4. **Data transitions: 400-600ms.** Give the eye time to follow the change.
5. **Micro-interactions: 50-150ms.** Instant feedback for clicks and hovers.
6. **Respect prefers-reduced-motion.** Disable all animation when this media query is active:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Recommended Animation Library

**framer-motion** (lightweight, React-native, SSR-compatible):

```bash
npm install framer-motion
```

Use for:
- Page transitions (AnimatePresence + layout animations)
- Staggered card entrance (staggerChildren)
- Number count-up (useSpring + useMotionValue)
- Gesture responses (whileTap, whileHover)

Keep Tailwind CSS transitions for simple hover/focus states. Use framer-motion only where Tailwind's `animate-*` is insufficient.

### 17.5 Typography & Spacing Refinements

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| Page heading | `text-3xl font-bold` | `text-3xl font-bold tracking-tight` | Tighter tracking on large text looks more premium |
| Body line-height | Default (1.5) | `leading-relaxed` (1.625) | More breathable, easier to read health content |
| Card internal spacing | `p-6` | `p-6 lg:p-8` | More generous padding on desktop |
| Section spacing | `space-y-6` | `space-y-8` | More whitespace between sections |
| Muted text | `text-gray-600` | `text-gray-500` | Slightly softer for less visual noise |
| Small labels | `text-xs` | `text-xs font-medium tracking-wide uppercase` | Consistent label treatment for categories/badges |

### 17.6 Accessibility Additions

| Requirement | Current state | Fix |
|------------|--------------|-----|
| Color-blind safety | Colors alone indicate status | Add icons to every status indicator (CheckCircle, AlertTriangle, AlertCircle) |
| Focus indicators | Default browser focus ring | `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2` on all interactive elements |
| Screen reader labels | Inputs have labels; some icons don't have sr-only text | Add `aria-label` to all icon-only buttons; add `role="status"` to live-updating metrics |
| Reduced motion | No consideration | Add `prefers-reduced-motion` media query to disable all animations |
| Touch targets | Some links/buttons are small (`px-3 py-1.5` on mobile nav) | Minimum 44x44px touch targets on all interactive elements |
| Semantic HTML | Mostly divs | Use `<section>`, `<article>`, `<nav>` landmarks; use `<h2>` for card titles instead of `<div>` |

### 17.7 Priority Implementation Order

| Phase | What | Impact | Effort |
|-------|------|--------|--------|
| **Now** | Add test result entry dialog | Unblocks core app functionality | Medium |
| **Now** | Show user's actual values on biomarker cards | Makes the app useful | Medium |
| **Now** | Add loading skeletons (Shadcn skeleton component) | Eliminates blank-screen flash | Low |
| **Now** | Add range bar component | Key data visualization | Medium |
| **Next** | Dashboard hero with category health rings | "One big thing" principle | Medium |
| **Next** | Card entrance animations (Tailwind keyframes) | Premium feel | Low |
| **Next** | Empty state designs for all pages | Guides new users | Low |
| **Next** | Trend sparkline component (SVG) | Shows trajectory at a glance | Medium |
| **Later** | framer-motion page transitions | Smooth navigation | Medium |
| **Later** | Number count-up animation | Delightful detail | Low |
| **Later** | Interactive connection graph (@xyflow/react) | Differentiator feature | High |
| **Later** | Dark mode polish | Currently defined in CSS but not user-togglable | Medium |

---

## 18. 3D Body Layer System (Future Feature)

An interactive anatomical visualization where users can explore different body systems, each connected to relevant biomarkers.

### 18.1 Available Layers

| Layer | Visual Style | Primary Color | Connected Biomarker Categories |
|-------|-------------|---------------|-------------------------------|
| **Default/Skin** | Wireframe hologram body | Cyan `#00d4ff` | All categories overview |
| **Organs** | Solid organs rendered inside wireframe | Mixed organ colors | Metabolic, Kidney & Liver, Gut Health |
| **Skeletal** | Bone structure, joints highlighted | White/cream `#f0f0e8` | Calcium, Vitamin D, Phosphorus, Bone density |
| **Muscular** | Muscle groups, fiber direction | Red/maroon `#8b0000` | Testosterone, Creatinine, Protein markers |
| **Circulatory** | Heart, arteries, veins network | Red/blue vessels | Cardiovascular (LDL, HDL, ApoB, Lp(a)), hs-CRP |
| **Nervous** | Brain, spinal cord, nerve branches | Yellow/gold `#ffd700` | B12, Homocysteine, Cortisol, HRV |
| **Lymphatic** | Lymph nodes, vessels | Green `#90ee90` | Immune markers, sIgA, White blood cells |

### 18.2 Layer-Biomarker Mapping Detail

```
Organs Layer:
  Brain      → B12, Homocysteine, Cortisol
  Thyroid    → TSH, T3, T4
  Heart      → ApoB, Lp(a), hs-CRP, Triglycerides
  Lungs      → VO2max, Ferritin (oxygen transport)
  Liver      → ALT, AST, GGT, Albumin
  Pancreas   → HbA1c, Fasting Glucose, Fasting Insulin
  Kidneys    → Creatinine, eGFR, Cystatin C
  Gut        → Calprotectin, Microbiome diversity, Zonulin

Skeletal Layer:
  Spine      → Vitamin D, Calcium
  Joints     → hs-CRP (inflammation), Vitamin D
  Bones      → Calcium, Phosphorus, Vitamin D, Bone density markers

Circulatory Layer:
  Heart      → All cardiovascular markers
  Arteries   → ApoB, LDL, Lp(a), Homocysteine
  Blood      → Ferritin, Hemoglobin, Iron, B12

Nervous Layer:
  Brain      → B12, Omega-3 Index, Homocysteine
  Nerves     → B vitamins, Magnesium
  Stress     → Cortisol, HRV
```

### 18.3 Interaction Patterns

**Sidebar Layer Selector:**
```
┌─ Body Layers ───────────────────┐
│                                  │
│  ○ Overview (Default)            │
│  ◉ Organs                   ←    │
│  ○ Skeletal                      │
│  ○ Muscular                      │
│  ○ Circulatory                   │
│  ○ Nervous                       │
│  ○ Lymphatic                     │
│                                  │
│  ─────────────────────────────   │
│  🔒 Full Anatomical (Premium)    │
│                                  │
└──────────────────────────────────┘
```

**Click-to-Cycle on Body:**
- Single click on body → Cycle to next layer
- Click on specific region → Select that organ/area
- Double-click → Reset to default view

**Layer Transition Animation:**
- Crossfade between layers (300ms)
- Current layer fades out while new layer fades in
- Particles flow during transition for continuity
- Optional: Morph animation where vertices shift positions

### 18.4 Layer-Specific Hotspots

Each layer shows only relevant hotspots:

```
Organs Layer Hotspots:
  [Brain] [Thyroid] [Heart] [Lungs] [Liver] [Pancreas] [Kidneys] [Gut]

Skeletal Layer Hotspots:
  [Skull] [Spine] [Ribcage] [Pelvis] [Joints]

Circulatory Layer Hotspots:
  [Heart] [Carotid] [Aorta] [Coronary] [Femoral]

Nervous Layer Hotspots:
  [Brain] [Brainstem] [Spinal Cord] [Peripheral Nerves]
```

### 18.5 Technical Implementation Notes

**3D Models Required:**
- Option A: Parametric generation (current approach, extended per layer)
- Option B: Load GLTF models for each system (higher quality, larger bundle)
- Option C: Hybrid — wireframe base + GLTF organs overlay

**State Management:**
```typescript
interface BodyViewerState {
  currentLayer: 'default' | 'organs' | 'skeletal' | 'muscular' | 'circulatory' | 'nervous' | 'lymphatic'
  selectedRegion: string | null
  hoveredRegion: string | null
  transitionProgress: number // 0-1 for animation
  isPremium: boolean
}
```

**Performance Considerations:**
- Lazy-load layer geometries on first selection
- Use instanced meshes for repeated structures (bones, vessels)
- LOD (Level of Detail) for complex layers on mobile
- Preload next likely layer based on user behavior

### 18.6 Connected Biomarker Panel

When a layer is active, the biomarker detail panel filters to show only relevant markers:

```
┌─ Circulatory System ────────────────────────┐
│                                              │
│  Your cardiovascular biomarkers              │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ ApoB          92 mg/dL    🟢 Optimal │   │
│  │ ████████████░░░░░░░░░░░             │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ LDL-C         118 mg/dL   🟡 Border  │   │
│  │ ██████████████░░░░░░░░░             │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ Lp(a)         45 nmol/L   🟢 Optimal │   │
│  │ ████████░░░░░░░░░░░░░░░             │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  [ View All Cardiovascular Markers → ]       │
│                                              │
└──────────────────────────────────────────────┘
```

---

*Last updated: 2026-02-25*

# Design System Specification (Teal-Trust & Slate Architecture)

This document formalizes the production-ready tokens, structural metrics, layout ratios, and accessibility constraints derived from the core interface modules. All subsequent feature screens, modal layers, dashboards, and responsive blocks must strictly adapt these principles to ensure unified platform consistency.

---

## 1. The 60-30-10 Color Architecture

The user interface strictly implements the 60-30-10 hierarchy rule to preserve micro-contrast, visual breathing room, and dynamic illumination transformations across light and dark system viewports.

### 60% Dominant (Surface & Canvas Backdrops)

Establishes the macro-environment layout wrapper. Always pure, neutral, or deep baseline colors with seamless hardware transitions.

- **Light Mode Base:** `Pure Crisp White (#FFFFFF)`
- **Light Mode Alternate:** `Slate Tint (#F8FAFC)`
- **Dark Mode Base:** `Deep Night Slate (#020617)`
- **Dark Mode Alternate:** `System Dark Charcoal (#0F172A)` / `Tailwind Slate-950`

### 30% Secondary (Typography Copy & Structural Framing)

Establishes structural presence, textual visual hierarchy, and high-trust identification fields.

- **Light Mode Focus Color:** `Premium High-Trust Navy (#1E3A8A)`
- **Dark Mode Focus Color:** `Pure Silver Chalk (#FFFFFF)` / `Slate-100`
- **Sub-text Base Text Color:** `Slate Muted Text (#475569)` / `Tailwind Slate-600`
- **Sub-text Dark Mode Color:** `Slate Soft Muted (#94A3B8)` / `Tailwind Slate-400`
- **Ambient Accent Micro-Glow Canvas:** `Soft Ice Hue (#E6F0FA)`

### 10% Accent Highlight (Interactive Call-To-Action Controls)

Reserved exclusively for primary high-conversion targets, operational micro-badges, validation alerts, and status notifications.

- **Light Mode Action Accent:** `High-Conversion Deep Teal (#008080)`
- **Light Mode Accent Hover:** `Saturated Teal Core (#006666)`
- **Dark Mode Action Accent:** `Electric Glowing Cyan-Teal (#3CD1C2)`
- **Dark Mode Accent Hover:** `Neon Mint Teal (#2AB0A2)`

---

## 2. Micro-Incline Typography Hierarchies

All text blocks must preserve structural line-height ratios (`leading`) to maximize readability constraints across varying responsive device factors.

| Level Element                      | Typography Size | Weights Code      | Leading Line-Height | Tracking Alignment         |
| :--------------------------------- | :-------------- | :---------------- | :------------------ | :------------------------- |
| **Display Title (Desktop)**        | `52px`          | Bold (`700`)      | `1.15`              | `tracking-tight`           |
| **Display Title (Mobile)**         | `36px`          | Bold (`700`)      | `1.15`              | `tracking-tight`           |
| **Section Header Title**           | `26px`          | Bold (`700`)      | `1.25`              | `tracking-tight`           |
| **Component Subtitle / Card**      | `20px`          | Bold (`700`)      | `1.3`               | `tracking-normal`          |
| **Platform Analytics Data**        | `18px`          | Semi-Bold (`600`) | `1.35`              | `tracking-tight`           |
| **Primary Base Copy Text**         | `16px`          | Normal (`400`)    | `leading-relaxed`   | `tracking-normal`          |
| **Call-To-Action Label Text**      | `15px`          | Semi-Bold (`600`) | `1.0`               | `tracking-normal`          |
| **System Description Copy**        | `13px`          | Medium (`500`)    | `leading-normal`    | `tracking-normal`          |
| **Micro Analytic Category Labels** | `11px`          | Semi-Bold (`600`) | `1.0`               | `tracking-wider uppercase` |
| **Badge / Footnote Micro-Tags**    | `10px`          | Semi-Bold (`600`) | `1.0`               | `tracking-wider uppercase` |

---

## 3. Structural Mechanics, Padding & Radius Rules

Layout configurations must prevent alignment breaking inside liquid grids. The interface maintains strict container boundary restrictions.

### Global Container Maximum Constraints

- **Global Content Bound Wrapper:** `max-w-[1280px]`
- **Horizontal Page Layout Gutter Padding:** `px-6 sm:px-8`
- **Vertical Block Margin Padding (Desktop Section):** `py-24 lg:py-32`
- **Vertical Block Margin Padding (Mobile Section):** `py-32`

### Component Radius Token Specifications

- **Primary Interactive Controls (Buttons):** `rounded-[12px]`
- **Floating Structural Badge Elements:** `rounded-[10px]`
- **Macro Glassmorphic Panel Cards:** `rounded-[20px]`

---

## 4. Interaction States & Transitions

Visual assets require uniform duration metrics across all device screens.

- **Global Transitions System Config:** `transition-all duration-200 ease-in-out`
- **Color Map Transitions Modifiers:** `transition-colors duration-300`
- **Scale-Down Active Interaction Factor:** `active:scale-[0.98]`
- **Hover Transform Scaling Matrix:** `scale-105 transform hover:scale-110 transition-transform duration-500`

---

## 5. Ambient Micro-Glow Layering & Glassmorphism

To elevate UI depth without increasing data payload overhead, utilize layered, blurred structural canvas accents.

### Radial Vector Blur Filters

- **Top-Right Sector Aura Ambient Glow:** `absolute top-0 right-0 h-96 w-96 rounded-full bg-[#E6F0FA]/40 dark:bg-slate-900/20 blur-3xl`
- **Bottom-Left Sector Aura Ambient Glow:** `absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#008080]/5 dark:bg-[#008080]/3 blur-3xl`

### Glassmorphic Card Mix-Blends

- **Backdrop Container Panel Matrix:** `bg-[#E6F0FA]/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg`
- **Floating Micro Badge Layer System:** `bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl`
- **Responsive Dark-Mode Asset Balancing:** In light modes, apply `mix-blend-multiply` to blend graphics naturally with white surfaces. In dark modes, transition to `mix-blend-screen dark:brightness-95 dark:contrast-115 dark:opacity-90` to preserve deep vector readability.

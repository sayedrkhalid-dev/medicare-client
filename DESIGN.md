# Design System Specification: The Trustworthy Classic

This document anchors the spatial, color, and typographic tokens for the web application platform. Adhere to these tokens strictly across all interface modules to preserve complete design uniformity.

---

## 1. Color Strategy (The 60/30/10 Rule)

The layout distribution utilizes three strict structural weight properties across both lighting environments:

| Weight                         | Palette Assignment         | Light Mode Target            | Dark Mode Target             |
| :----------------------------- | :------------------------- | :--------------------------- | :--------------------------- |
| **60% (Dominant Background)**  | Pure Crisp Foundation      | `#FFFFFF`                    | `#020617` (`slate-950`)      |
| **30% (Secondary Structural)** | Clean Medical Navy / Slate | `#1E3A8A` / `#E6F0FA`        | `#0F172A` (`slate-900`)      |
| **10% (Action Accent)**        | High-Conversion Deep Teal  | `#008080` / Hover: `#006666` | `#3cd1c2` / Hover: `#2ab0a2` |

### Utility Tailwind Mappings:

- **Light Borders / Accents:** `#E6F0FA` (Soft Sky Blue)
- **Body Typography:** `text-slate-600` (Light) | `text-slate-400` (Dark)

---

## 2. Corner Radius & Structural Curvature

To avoid conflicting visual cues, shapes are limited to the following uniform constraints:

- **Standard Interactive Controls:** `rounded-[12px]`
  - Applied directly to: Buttons, Form Fields, Dropdown Menu Blocks, Navbar list items, and Alert triggers.
- **Component Layout Frame Containers:** `rounded-[20px]`
  - Applied directly to: Main hero cards, floating UI validation containers, and media wrapper layouts.

---

## 3. Typographic Scale

The structural font family relies on calibrated modern sans-serif values with strict, uncompromised tracking controls:

- **Primary Hero Main Banner Headings:** `text-[36px]` scaling gracefully on desktops to `sm:text-[52px]` (`font-bold`, `tracking-tight`, `leading-[1.15]`).
- **Sub-Hero Section Copy Blocks:** `text-[26px]` scaling on desktops to `md:text-[34px]`.
- **Standard Navigation Interface Links:** `text-[15px]` (`font-medium`, `tracking-tight`).
- **General Interface Body Copy Text:** `text-[16px]` scaling to `md:text-[18px]` (`leading-relaxed`).
- **Micro Metadata Overviews / Badges:** `text-[11px]` down to `text-[9px]` (`font-bold`, `uppercase`, `tracking-widest`).

---

## 4. UI Layout Rules

1. **Interactive State Scaling:** Active clicks or taps on main navigation controls or actions trigger a quick transform change of `active:scale-[0.98]` or `active:scale-95` to give smooth physical feedback.
2. **Component Separation:** Always divide distinct page rows using light/dark border dividers (`border-[#E6F0FA]` or `dark:border-slate-900`) instead of relying purely on empty margins.

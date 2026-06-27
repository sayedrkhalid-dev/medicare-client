# DESIGN.md

## 1. Color Palette Blueprint (Ocean Breeze)

This palette adapts gracefully across themes. [cite_start]The core colors are derived directly from your updated configuration, utilizing clean, high-contrast states to ensure excellent accessibility and visual clarity[cite: 5, 7].

### Color Tokens Map

| Token                 | Hex / RGB Code       | Primary Purpose                                                                     |
| :-------------------- | :------------------- | :---------------------------------------------------------------------------------- |
| **Deep Abyssal Blue** | `#03045E`            | [cite_start]Light mode text headings, Dark mode structural panels [cite: 1]         |
| **Honolulu Blue**     | `#0077B6`            | [cite_start]Branding, Primary interactive buttons, Focus states [cite: 2]           |
| **Oceanic Cyan**      | `#00B4D8`            | [cite_start]Secondary interactive states, Links, Informative badges [cite: 3]       |
| **Breeze Tint**       | `rgb(144, 224, 239)` | [cite_start]Soft borders, Light mode accent fills, Dark mode text accents [cite: 4] |
| **Ice White**         | `#CAF0F8`            | [cite_start]Light mode subtle backgrounds, Dark mode high-contrast text [cite: 6]   |

---

## 2. Theme Implementation (Light vs. Dark Mode)

To keep your user experience simple and cohesive, colors shift predictably across themes to preserve optimal contrast ratios:

### Light Mode Layout Matrix

- **Primary Page Canvas:** `#FFFFFF` (Pure White)
- [cite_start]**Secondary Surface/Cards:** `#CAF0F8` at `20%` opacity, or flat `#F4FBFD` for subtle separation[cite: 6].
- [cite_start]**Component Borders:** `rgb(144, 224, 239)` with tight alpha blending (`/30`)[cite: 4].
- [cite_start]**Primary Text Headers:** `#03045E` (Deep Abyssal Blue)[cite: 1].
- **Body Text / Labels:** `#475569` (Slate 600) / `#64748B` (Slate 500)

### Dark Mode Layout Matrix

- [cite_start]**Primary Page Canvas:** `#03045E` blended down with dark slate (`#02042A`) to ensure text readability[cite: 1].
- [cite_start]**Secondary Surface/Cards:** `#03045E` at a slightly lighter, raised opacity elevation layer[cite: 1].
- [cite_start]**Component Borders:** `#0077B6` blended down (`/20`) to create soft, glowing divisions[cite: 2].
- [cite_start]**Primary Text Headers:** `#CAF0F8` (Ice White)[cite: 6].
- [cite_start]**Body Text / Labels:** `rgb(144, 224, 239)` at high opacity for clean readability[cite: 4].

---

## 3. Spatial Sizing & Typography Scale

A strict sizing structure ensures your layouts remain clean and easily readable across desktop monitors, tablets, and phones.

### Layout Padding & Spacing (Tailwind CSS Equivalents)

- **Micro Spacing (`4px` / `xs`):** Tight content relationships (e.g., separating user icons from text labels).
- **Element Padding (`8px - 12px` / `sm`):** Inside buttons, badge elements, and table header cells.
- **Component Containers (`16px - 24px` / `md` to `lg`):** Internal padding for dashboards, data cards, and interactive wizard configurations.
- **Page Margin Grid (`16px` on mobile, scaling up to `24px` on desktop layouts):** Structural edge alignment.

### Responsive Typography Hierarchy

- **Screen Titles (Dashboard / Summary Headers):** `24px` (bold) on desktop $\rightarrow$ `20px` (bold) on mobile.
- **Sub-Section Headers (Card Modules):** `16px` (semibold) on desktop $\rightarrow$ `14px` (semibold) on mobile.
- **Data Fields / Standard Body Text:** `14px` (regular) on desktop $\rightarrow$ `13px` (regular) on mobile.
- **Labels / Micro Metadata Stamps:** `12px` (medium) on desktop $\rightarrow$ `11px` (medium/mono) on mobile.

---

## 4. Component Border Radius Tokens

To capture a professional, modern aesthetic, hard edges are minimized in favor of progressive rounding based on component scale:

> ### The Progressive Rounding Principle
>
> Larger outer containers require broader corners, while smaller interactive elements nested inside them scale down symmetrically.

- **Nested Utility Tags & Badges (`rounded-md`):** `6px` radius. Great for role/status badges.
- **Buttons, Input Fields, Actions (`rounded-xl`):** `10px - 12px` radius. Fits the average human touch target comfortably.
- **Main UI Cards & Tables (`rounded-2xl`):** `16px` radius. Softens content frames elegantly.
- **Avatars & Radial Toggles (`rounded-full`):** Completely circular (`9999px`) to immediately isolate user profiles.

---

## 5. User Experience (UX) Guardrails

- **Data Overflow Preservation:** Tables must encapsulate structural rows using a parent container with horizontal overflow capabilities (`overflow-x-auto`). Columns containing static logs or creation dates drop off cleanly on small screens (`hidden sm:table-cell`).
- **Visual Action States:** Every button interaction must include explicit hover and active states using transition easing functions (`transition-all duration-150`).
- [cite_start]**Instant Async Feedback:** Long-running API processes must instantly display a spinner block utilizing your primary brand color (`#0077B6`) to reassure the user that data is currently being fetched or saved[cite: 2].

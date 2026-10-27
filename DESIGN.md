---
name: Sebastián Ibarra · Portfolio
description: A software engineer presented as a product keynote; dark stage, silver floor, one blue.
colors:
  stage: "#000000"
  graphite: "#1d1d1f"
  graphite-2: "#2a2a2d"
  floor: "#f5f5f7"
  paper: "#ffffff"
  ink-light: "#f5f5f7"
  ink-dark: "#1d1d1f"
  mute-dark: "#86868b"
  mute-light: "#6e6e73"
  body-dark: "#a1a1a6"
  rule-dark: "#333336"
  rule-light: "#d2d2d7"
  ghost-edge: "#424245"
  link-dark: "#2997ff"
  link-light: "#0066cc"
  action: "#0071e3"
  action-hover: "#0077ed"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(48px, 8.6vw, 96px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
    fontFeature: "'ss01', 'cv11'"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px, 6vw, 80px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title-lg:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(36px, 5vw, 56px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  subhead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(21px, 2.4vw, 28px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.47
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
rounded:
  focus: "6px"
  screen: "12px"
  bezel: "22px"
  tile: "28px"
  pill: "9999px"
spacing:
  nav: "44px"
  gutter: "22px"
  tile-gap: "12px"
  section: "96px"
  section-md: "128px"
  container: "1024px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-primary-sm:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "3px 11px"
    typography: "{typography.label}"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  link-chevron-dark:
    textColor: "{colors.link-dark}"
    typography: "{typography.body}"
  link-chevron-light:
    textColor: "{colors.link-light}"
    typography: "{typography.body}"
  nav-global:
    backgroundColor: "rgba(0,0,0,0.75)"
    textColor: "{colors.ink-light}"
    height: "{spacing.nav}"
  tile-product-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.tile}"
  tile-product-dark:
    backgroundColor: "{colors.stage}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.tile}"
  deck-stage:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.tile}"
  deck-control:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.rule-light}"
    rounded: "{rounded.pill}"
    size: "56px"
  deck-control-hover:
    backgroundColor: "{colors.graphite-2}"
    textColor: "{colors.ink-light}"
  card-quote:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.tile}"
    padding: "40px"
---

# Design System: Sebastián Ibarra · Portfolio

## Overview

**Creative North Star: "The Product Keynote"**

The site is staged like a launch event. A pitch-black stage carries the big statements (the galaxy hero, the About deck, experience, contact), and a silver floor with white paper carries the "hardware": product tiles, testimonials, the spec sheet. Each section commits to exactly one ground and says one idea in very large, very tight Geist at weight 600, usually ending on a period. Everything else recedes: a single blue for actions and links, neutral greys for secondary voice, hairline rules instead of boxes.

Density is low and deliberate. Sections breathe with 96px to 128px of vertical padding, content sits in a 1024px column with 22px gutters, and tiles bleed nearly edge to edge with 12px gaps. Motion is cinematic but restrained: one easing curve (`--ease-keynote`, a long ease-out), blur-plus-rise reveals, cross-dissolving slides, and a scroll-scrubbed hero. All of it stands down under `prefers-reduced-motion`.

The world refuses the developer-portfolio default: no terminal backgrounds, no typing headlines, no cards studded with icons and tech badges, no gradient-filled text.

**Key Characteristics:**
- Alternating grounds: stage black, floor silver, paper white; never mixed within a section.
- One display weight (600) with tracking that tightens as size grows (-0.01em to -0.04em).
- Two-tone headlines: statement in ink, second line in the muted grey.
- One accent family: action blue for pills, link blue for chevron links.
- Tonal containers at a 28px radius; no borders, almost no shadow.
- Pill actions and chevron text links as the only two action shapes.

## Colors

A near-monochrome Apple-neutral palette with one blue doing all the pointing.

### Primary
- **Keynote Action Blue** (action): the fill of every pill button (Download CV, Visit site, Send email) and the text-selection highlight. Hover lifts to **Action Hover Blue** (action-hover).
- **Night Link Blue** (link-dark): chevron links and the large email link on dark grounds; also the focus ring colour.
- **Day Link Blue** (link-light): chevron links on floor and paper grounds.

### Neutral
- **Stage Black** (stage): the page's base ground, hero, Experience, Contact, dark product tiles. Also `theme-color`.
- **Keynote Graphite** (graphite): the About deck surface and its round controls; the bezel of the device frame on light tiles.
- **Graphite Lift** (graphite-2): hover state of graphite controls.
- **Floor Silver** (floor): ground for Projects, Testimonials and the footer.
- **Paper White** (paper): light product tiles, testimonial cards and the spec-sheet section.
- **Ink Light / Ink Dark** (ink-light, ink-dark): primary text on dark and light grounds respectively.
- **Dark Secondary** (mute-dark): muted second headline lines, meta and captions on dark.
- **Light Secondary** (mute-light): the same role on light grounds.
- **Soft Body Grey** (body-dark): long-form body copy on dark (slide bodies, tile descriptions, contact lede, experience descriptions), one step brighter than mute-dark so paragraphs stay legible.
- **Hairline Dark / Hairline Light** (rule-dark, rule-light): 1px rules that structure Experience, the spec sheet, testimonial footers and the footer. rule-light's value also serves as the dimmed nav link and deck icon colour on dark.
- **Ghost Edge** (ghost-edge): border of the ghost pill on dark, footer link text, testimonial arrow icons.

### Named Rules
**The One Blue Rule.** Blue is the only chroma in the interface. Action blue fills pills; link blue colours text links, picked by ground (night on dark, day on light). No second accent, no coloured icons, no coloured section backgrounds.

**The One Ground Rule.** Every section sits on exactly one of stage, floor or paper. Light sections carry the `on-light` scope so the focus ring switches from night link blue to action blue.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Geist (same stack)
**Label/Mono Font:** Geist Mono is loaded but not used on the page; tabular numerals come from `font-variant-numeric: tabular-nums` on dates.

**Character:** One family, set like a launch slide: heavy-ish 600 headlines tracked tight until the letters almost touch, quiet 400 body at 17px. Stylistic sets `ss01` and `cv11` are on globally; headings use `text-wrap: balance`, paragraphs `pretty`.

### Hierarchy
- **Display** (600, clamp(48px, 8.6vw, 96px), 0.98, -0.04em): the hero name. The Contact "Let's talk." and the scroll-revealed keynote words share this scale (up to 96px, leading 1 to 1.02).
- **Headline** (600, clamp(40px, 6vw, 80px), 1.02, -0.035em): every section title, often with a second line in the muted grey.
- **Title Large** (600, clamp(36px, 5vw, 56px), 1.05, -0.03em): product names on tiles; slide statements run larger (up to 96px).
- **Subhead** (500, clamp(21px, 2.4vw, 28px), 1.2, -0.01em): the hero role and product taglines. The only place weight 500 appears.
- **Title** (600, 24px, 1.15, -0.015em): spec-sheet row labels, experience column heads; 21px for experience entry titles.
- **Body** (400, 17px, 1.47): descriptions, spec items, links and buttons. Measure capped at 34ch to 52ch.
- **Caption** (400, 14px): technology lists joined by middle dots, roles, availability notes.
- **Label** (400, 12px, 1.33): nav links, language toggle, small nav pill, footer.

### Named Rules
**The Tight-At-Scale Rule.** Tracking tightens as size grows: -0.01em at 21-28px, -0.015em at 24px, -0.03em at 56px, -0.035em at 80px, -0.04em at 96px. Body text is never tracked.

**The Period Rule.** Keynote statements end on a period ("Proyectos.", "Hablemos.", "Sebastián Ibarra."). The headline is a sentence, not a label.

**The Two-Tone Headline Rule.** A section headline may carry a second line, set at the same size and weight, coloured mute-dark or mute-light. That line completes the statement; it is not a small label above the title.

## Layout

A centred 1024px column (1180px for the About deck) with 24px mobile and 22px desktop gutters. Sections stack vertically with 96px padding on mobile and 128px from md up; Contact runs larger (112px / 160px). Product tiles break the column: they span the viewport inside a 12px inset, stacked with 12px gaps, alternating paper and stage. The testimonial rail is a horizontal snap-scroller whose left padding aligns with the column edge. The spec sheet is a two-column definition grid (1fr : 2.4fr) from md up, single column below. Experience is two equal columns from md up. The hero is a 230svh sticky runway (100svh under reduced motion), and the global nav reserves 44px via `scroll-padding-top`. A single md breakpoint (768px) carries nearly every responsive change, with sm (640px) only revealing the nav CV pill.

## Elevation & Depth

The system is flat and tonal. Depth comes from ground changes (stage to floor to paper), the translucent blurred nav, and photographic light (the Andromeda image, its vignettes and masks). There is exactly one shadow, under the device bezel on product tiles, making the screen read as hardware standing on the floor.

### Shadow Vocabulary
- **Device Stand** (`box-shadow: 0 30px 60px -20px rgba(0,0,0,0.35)`): only beneath the display frame in a product tile.

### Named Rules
**The Hardware-Only Shadow Rule.** Containers, cards and buttons cast no shadow. A shadow is earned only by an object presented as a physical device.

## Shapes

Two silhouettes: the fully round pill (buttons, deck controls, dots, toggle chips) and the generous 28px rounded rectangle (product tiles, the About deck, testimonial cards). Device frames nest radii: a 22px bezel around a 12px screen, rounded only at the top and cropped by the tile's bottom edge. Borders are rare and always 1px hairlines: rules between rows, the ghost pill outline, the placeholder marker. Icons are hand-drawn SVG strokes (the thin chevron at 1.6px stroke) or simple filled shapes (play, pause).

## Components

### Buttons
Calm, flat, decisive.
- **Shape:** full pill (9999px).
- **Primary:** action blue fill, white 17px text at weight 400, 11px by 22px padding. Small variant in the nav: 12px text, 3px by 11px.
- **Hover / Focus:** fill shifts to action hover over 200ms; active darkens slightly. Focus is a 2px link-blue outline at 3px offset with a 6px radius.
- **Ghost (dark):** transparent with a 1px ghost-edge outline and ink-light text, 10px by 22px; hover brightens the outline to mute-light and adds a 4% white wash.

### Chevron Links
The secondary action, always paired beside or below a pill.
- **Style:** 17px link-blue text followed by a thin SVG chevron at 0.72em height. Hover underlines (1px, 0.18em offset) and nudges the chevron 2px right over 300ms.

### Cards / Containers
- **Corner Style:** 28px.
- **Background:** paper on floor (testimonials, light tiles), stage on floor (dark tiles), graphite on stage (About deck).
- **Shadow Strategy:** none (see Hardware-Only Shadow Rule).
- **Border:** none; internal divisions use a 1px rule-light hairline.
- **Internal Padding:** 32px mobile, 40px desktop for testimonial cards; tiles use 56px / 80px top padding and centred content.

### Navigation
A 44px bar fixed to the top: black at 75% opacity with a heavy backdrop blur and 1.8x saturation, and a 6% white hairline below. The name sits left at 14px weight 600; anchors at 12px in rule-light at 80% turn ink-light when hovered or when their section is in view. Right side: ES/EN toggle in 12px uppercase and the small action pill. Mobile collapses to a two-bar toggle that morphs into an X, opening a 95% black full-screen sheet with 28px weight-600 links that drop in with a 35ms stagger.

### Product Tile (signature)
A near-full-bleed 28px tile, alternating paper and stage, with centred title-large name, subhead tagline, body description, caption tech list, then a pill plus chevron link. Below, a device frame (graphite bezel on light tiles, #2c2c2e on dark) holds a 16:10 screen and is cropped by the tile's bottom edge.

### Keynote Deck (signature)
A graphite 16:9 stage (taller on mobile) cross-dissolving five slides over 900ms with blur and a slight scale. A 3px progress bar fills along the top during autoplay. Below it sits a pill tray of dots (the active one stretches to 32px wide) and 56px round graphite controls for previous, next and play/pause. Keyboard arrows and swipe also advance it.

### Spec Sheet (signature)
A definition list between hairline rules: 24px weight-600 labels in the left column, 17px item lists on the right, 32px to 40px row padding.

### Keynote Word Reveal (signature)
Inside the sticky hero, scroll progress hands off from the name to stacked display-scale words. Each word rises 36px out of a 10px blur in sequence, then all of them exit together. Section headlines elsewhere use the CSS `headline-rise` view-timeline reveal (28px rise, 6px blur) where supported.

## Do's and Don'ts

### Do:
- **Do** give every section a single ground (stage, floor or paper) and alternate them down the page.
- **Do** set headlines in Geist 600 with tracking from the Tight-At-Scale Rule, ending on a period.
- **Do** pair one action blue pill with one chevron text link as the action group.
- **Do** use link-dark on dark grounds and link-light on light grounds; never swap them.
- **Do** use 28px tonal containers and 1px hairlines for structure.
- **Do** run all motion on `--ease-keynote` and provide a still state under reduced motion.

### Don't:
- **Don't** introduce a second accent hue or coloured section backgrounds.
- **Don't** build cards with icons and tech badges; list technologies as a caption joined by middle dots.
- **Don't** fill text with gradients.
- **Don't** add shadows to cards, tiles or buttons; the only shadow belongs under a device frame.
- **Don't** use terminal backgrounds or typing-effect headlines.
- **Don't** put a small label above a headline; extend the statement with a muted second line instead.

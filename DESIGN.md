---
name: ТОПИТОП
description: Personal gifts from family photographs, presented in a vivid illustrated palette.
colors:
  bg: "#fff9e9"
  surface: "#ffe0e9"
  ink: "#590b2d"
  muted: "#75424f"
  action: "#c50a5a"
  action-ink: "#fff9e9"
  action-hover: "#a50648"
  blue: "#1475b0"
  blue-dark: "#075b91"
  yellow: "#ffd239"
  lemon: "#ffec8c"
  pink: "#f8b7cc"
  white: "#fffdf6"
  line: "#dfb6c1"
  field-border: "#b67b90"
  error: "#9b163b"
typography:
  display:
    fontFamily: "Dela Gothic One, sans-serif"
    fontSize: "clamp(54px,5.15vw,76px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Dela Gothic One, sans-serif"
    fontSize: "clamp(32px,3.8vw,54px)"
    fontWeight: 400
    lineHeight: 1.17
    letterSpacing: "-.035em"
  title:
    fontFamily: "Onest, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-.025em"
  body:
    fontFamily: "Onest, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Onest, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  image: "4px"
  btn: "6px"
  sm: "6px"
  md: "8px"
  lg: "8px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  s-10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.white}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.btn}"
    padding: "13px 24px"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  gift-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  order-form:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "32px"
---

# Design System: ТОПИТОП

## Overview

ТОПИТОП presents personalised dolls, colouring books, and photo calendars for children and families. Its visual direction comes from the author's illustrated logo and supplied pink, blue, yellow, and cream reference materials. The result is warm, vivid, and filled with tangible products. Product photographs, pages, and portrait video carry the story alongside compact explanations and clear prices.

This document records the implemented static website in `index.html` and `assets/styles.css`, with product commitments from `PRODUCT.md`. It describes the source as supplied; no browser inspection or rendered verification was performed. The frontmatter captures the principal reusable values, while contextual colour overrides and responsive behaviour are explained below. This is documentation of the current implementation, not a proposed redesign.

Key characteristics:

- An illustrated author identity, visible in the fixed header and closing section.
- Broad coloured sections with cream reading surfaces and raspberry actions.
- Heavy, compact Cyrillic display lettering paired with comfortable text.
- Real supplied media, including all six vertical videos.
- Small soft corners, crisp borders, and flat surfaces.

## Colors

The palette combines saturated raspberry and blue with sunlit yellow, pink paper, and warm cream. It uses colour over whole sections as well as on controls; there is no narrow accent-percentage rule.

Raspberry `action` is the standard solid button, selected detail, selection, and decorative outline colour. The same value originates in `--p-accent` and `--p-action`. Its dark hover value is used by ordinary primary buttons. Deep plum `ink` is the default readable foreground and outlined-control colour. Body copy uses this foreground rather than black. The active muted foreground is `--muted: #75424f`; the earlier `--p-muted: #8c525e` declaration is a separate source value and is not the resolved default body-muted colour.

Blue fills the personalised-colouring section and selected decorative or product elements. That section locally changes `--ink` to `--white`, `--muted` to `#e2f2ff`, `--action` to `#fff6d2`, `--action-ink` to plum, and `--surface` to `#0f6499`. Its button hover is `#ffe9a0`, with plum lettering. Keep these local assignments together when extending this section.

Yellow anchors the footer and small stars; lighter lemon fills the hero and calendar section. Pink appears in hearts and one product-format illustration. Cream `bg` is the baseline reading surface; near-white `white` is a slightly brighter product and form surface. Pink `surface` fills dolls, process, and demonstration-review sections. `line` separates rows, prices, form groups, and navigation from their neighbours.

Cards also contain existing pale blue and pale yellow variations, such as `#d8ecf5`, `#fff0b5`, and `#e4f1f7`. These are contextual fills rather than a second systematic scale. Preserve the supplied illustration colours instead of recolouring source media to match a single token.

## Typography

Display font: **Dela Gothic One**, followed by sans-serif. Text font: **Onest**, followed by sans-serif. Both are loaded from local font stylesheets. The display face supplies the chunky, playful identity; Onest keeps product comparisons, instructions, navigation, and forms legible.

The hero uses 400-weight Dela Gothic One at `clamp(54px,5.15vw,76px)` and 1.12 line height. At 1600px and above it becomes 82px. Standard section headings use the headline role, with 1.17 line height, balanced wrapping, and a maximum width of 23 characters. They use deliberate line breaks where present. Negative tracking is part of the display treatment, not a reason to compress text further.

Section-specific heading sizes remain valid: the process headline tops out at 48px and the closing headline at 58px. The general third-level heading is Onest 26px, weight 600, line height 1.3. Product titles have local 19–27px variations. Avoid applying the display font to every card heading; the current hierarchy relies on this distinction.

Body text is 16px/1.6, weight 400, with paragraphs capped at 62 characters. The general lead is 21px/1.55; hero copy is 19px on desktop. Section introductions are 18px and capped at 42 characters. Smaller delivery and review metadata commonly use 14px. Buttons use 15px/1.4, weight 600. These labels retain normal sentence case. Prices frequently use the display face at 28–40px, depending on component.

At 639px and below the standard headline becomes `clamp(28px,7.8vw,38px)`. The hero becomes `clamp(35px,8.8vw,48px)` at 1.17 line height, then 32px below 360px. These overrides keep the same hierarchy while fitting narrow Russian text.

## Layout

The main wrapper is `min(calc(100% - 2 * var(--gut)),1280px)`, centred. Desktop gutters are 64px. They step to 48px at 1199px, 32px at 1023px, 20px at 639px, and 16px below 360px. The declared spacing scale runs from 4px through 128px; the most repeated working gaps are 16, 24, 32, 48, and 64px.

Desktop sections generally have 112px top and 88px bottom padding, with a viewport-height minimum. At 1023px they use 96px and 72px; at 639px they use 80px and 56px and drop the minimum height. Media and product content keep these spaces occupied. The hero accounts for the fixed navigation height in its own top padding.

Section introductions use a 1.2:1 two-column grid with a 64px gap. Product and editorial pairs use equal columns. The hero, colouring introduction, and calendar introduction place text beside a 360px portrait-media column with 96px between them. Gift, format, colouring-price, and calendar-video collections use three columns; outfits use four. Tablet rules progressively tighten these layouts. Mobile introductions and major pairs become one column; outfits retain two compact columns.

All six videos preserve a **9:16** frame. The wrapper and video both declare that aspect ratio; video fills the wrapper at 100% width and height using `object-fit: cover`. There is no padding or artificial background around portrait footage. Mobile video groups stack and cap at 350px; hero art caps at 300px. Preserve media proportions when changing surrounding grids.

## Elevation & Depth

The base stylesheet uses no box shadows. Depth comes from large colour changes, bordered panels, overlapping star and heart decorations, contained media, and the fixed header. Cards do not need a shadow to separate them from the page. The modal viewer uses a dark `rgb(39 6 22 / .72)` backdrop, which is a modal separation treatment rather than a reusable card elevation.

Standard links and buttons transition colour, background colour, and border colour over 150ms. The shared easing token is `cubic-bezier(.2,.8,.2,1)`. Additional entrance and section motion are linked through separate asset stylesheets and are outside this source extraction. The base stylesheet explicitly reduces animation and transition durations to `.01ms` when reduced motion is requested.

## Shapes

The interface uses modest rounding: 6px on controls and disclosures, 8px on cards, videos, forms, and the viewer, and 4px on inner imagery and illustrated paper shapes. The named medium and large radius variables both resolve to 8px. Do not infer an escalating corner scale from those names.

Circular cropping belongs to the author's logo: 68px in the desktop header and up to 340px in the footer. The source image itself remains the supplied illustrated logo. Stars, hearts, simple page outlines, and thin arrow icons supply playful detail around otherwise rectangular products. Borders are usually 1px; paper-size illustrations use a 2px coloured stroke. Icons use rounded stroke caps and joins.

## Components

**Navigation.** A cream fixed header has a bottom line, 96px desktop height, and z-index 30. It always includes the actual author logo and the ТОПИТОП wordmark. Height becomes 88, 80, and 76px at the established breakpoints. Desktop links hide at 1023px; the menu button appears, revealing a scrollable full-height panel below the header. At 639px the desktop order button also hides. Preserve the accessible menu label and expanded state.

**Buttons and links.** Primary buttons are solid raspberry with cream text; secondary buttons are transparent with a plum border. Both have a 6px radius, 52px desktop minimum height, and `13px 24px` padding. Mobile defaults use 50px minimum height and `13px 20px`. Icons are 20px inside buttons. Text actions remain visibly underlined, with a 48px minimum height. Global keyboard focus is a 3px dark-blue outline offset by 5px; the blue colouring section uses yellow focus.

**Product cards and price rows.** Gift cards use a 24px inset and a four-to-five image crop. Product formats and colouring cards keep price and selection controls aligned at the bottom through flex layout. Doll prices use bordered rows rather than fully boxed cards. On mobile, colouring prices become compact two-column media/text arrangements with a full-width button. Keep product contents, price, and action together.

**Order form.** A cream bordered 8px panel contains persistent labels, near-white fields, and a visible total. Inputs use 6px corners, 52px minimum height, and `12px 16px` padding. Textareas resize vertically. Errors use the error colour and disappear when empty. The prepared-request panel provides a readonly message, copy control, and Direct link; the interface prepares a conversation with the author. Keep payment, delivery, and final details attached to that workflow.

**Demonstration reviews.** A cream quote panel sits on pink, with manual arrows and pagination controls. The disclosure and per-item metadata state that all ten samples are generated demonstrations. These samples must never become customer recommendations, ratings, named buyers, or aggregate-review evidence.

**Image viewer.** The native dialog has an 8px cream surface, a close button, original-image link, and contained full image. Its width is `min(94vw,1000px)` with a 92svh maximum height and scrolling when needed. It preserves source imagery rather than cropping price sheets inside the viewer.

## Do's and Don'ts

- **Do** keep the author's real illustrated logo in the fixed header.
- **Do** use Dela Gothic One for display and Onest for reading and controls.
- **Do** preserve the supplied product photographs, illustrations, and all six 9:16 videos.
- **Do** maintain vivid section colours, meaningful product detail, and readable cream surfaces.
- **Do** retain labels, visible keyboard focus, reduced-motion support, and accessible control text.
- **Don't** add padding around the portrait video to manufacture a different aspect ratio.
- **Don't** present generated review samples as real customer evidence or attach ratings to them.
- **Don't** replace supplied products with generic decorative imagery or the author's logo with a wordmark alone.
- **Don't** invent manufacturing promises, delivery deadlines, or checkout behaviour unsupported by the actual order workflow.

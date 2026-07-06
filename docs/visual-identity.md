# Melo — visual identity

The complete brand system: logo, color, typography, motifs, voice. Built to be
internally consistent and to translate from app to investor deck to social
post without rewriting it each time.

Brand assets live in `brand/`.

---

## 1. Brand essence

**Melo is the calm hand that walks alongside every new family.**

Three words carry the brand: **warm**, **calm**, **for two**. Every design
decision — color, type, spacing, motion — passes through that filter.

What Melo is *not*: clinical, gendered as feminine-only, manipulative,
busy, loud, judgmental. We earn the return visit by being genuinely useful,
not by gaming attention.

---

## 2. Logo

### The full mark (primary use)

The Melo icon is the rounded-square version with the two parents, heart, and
two dots on the moss-green background. This is the App Store icon and the
primary brand mark.

Use the full mark whenever the surface allows for a bordered shape: app
icon, favicon, social profile photo, business card corner, deck cover.

→ `brand/melo-app-icon-full.png`

### The figure mark (secondary use)

When the surface already provides framing — a moss-green deck cover, a
cream card, a printed banner — use just the figures (two parents, heart,
two dots) without the green background. Lets the icon breathe and prevents a
"badge inside a badge" look.

Available recolored for different contexts:

| File | Color | Use on |
|---|---|---|
| `brand/melo-mark-figures.png` | Original sage/cream | Pure decoration on white |
| `brand/melo-mark-moss.png` | Moss (`#264236`) | Light backgrounds: cream, warm-white, sage-light |
| `brand/melo-mark-cream.png` | Cream (`#F6F1E7`) | Dark backgrounds: moss, bark, dark sage |
| `brand/melo-mark-clay.png` | Clay (`#C57B57`) | Mom-context surfaces — accents in postpartum content |
| `brand/melo-mark-sage.png` | Sage (`#7A9C82`) | Dad-context surfaces — accents in co-parent content |

### Clear space

The minimum clear space around the mark equals the height of one of the
small head-dots inside the mark. Don't crowd it.

### Minimum size

- Full mark with background: **40 × 40 px** (smaller than this and the
  heart loses its silhouette)
- Figure mark only: **24 × 24 px** (it carries more clearly at small sizes
  because there's no frame to crowd the figures)

### Don't

- Don't change the color of the green background of the full mark
- Don't rotate the mark
- Don't outline the mark with a stroke
- Don't drop-shadow it heavily — a soft 4–8% shadow is fine, anything more
  fights the calm tone
- Don't compose it with other logos in a row without giving each ≥ 24 px
  of clear space

---

## 3. Color

Three tiers: **brand core** (always present), **mom palette** (clay-based),
and **far/co-parent palette** (sage-based). The mom and far palettes never
replace the brand core — they layer on top to color-code the role.

### Why split mom and far at all

Existing research in family interfaces (and our own design decisions in the
app today) supports this: when two people share an app, color-coding their
contributions reduces cognitive load. A glance tells you "this is mine" or
"this came from them." The mom palette draws on clay/terracotta tones —
warm, embodied, rooted in the physical experience of pregnancy and
recovery. The far palette draws on sage/moss tones — calm, grounded,
supportive. They're harmonious because they share the same warmth and
saturation, but they're distinguishable at a glance.

### Brand core

Used everywhere. Sets the universal Melo feel.

| Token | HSL | Hex | Role |
|---|---|---|---|
| `--moss` | `154 27% 20%` | `#264236` | Primary brand color. CTAs, headlines, the icon background. |
| `--cream` | `37 30% 94%` | `#F6F1E7` | Universal background. Calm, warm. |
| `--warm-white` | `38 30% 97%` | `#FBF8F2` | Card surfaces on cream backgrounds. |
| `--bark` | `32 24% 34%` | `#4E3C2C` | Heavy text accent. Use sparingly. |
| `--stone` | `30 6% 58%` | `#9A958B` | Quiet neutrals — borders, captions, page numbers. |
| `--stone-light` | `30 10% 80%` | `#D5D0C8` | Lighter neutral, subtle dividers. |
| `--stone-lighter` | `34 14% 90%` | `#E7E2D5` | Almost-background, raised surfaces. |

### Mom palette — `--mom`

Layered on mom's dashboard, postpartum content, mom-specific cards, the
"appreciation she sent" surfaces, and milestone celebrations for her.

| Token | HSL | Hex | Mood |
|---|---|---|---|
| `--clay` | `30 35% 64%` | `#C57B57` | Primary mom color. Warm terracotta. |
| `--clay-light` | `30 38% 88%` | `#F1E0D6` | Mom's card backgrounds. |
| `--clay-text` | `30 35% 38%` | `#825133` | Mom-context body text on light backgrounds. |
| `--bark` | shared | `#4E3C2C` | Headlines in mom surfaces. |
| `--sand` | `33 42% 80%` | `#E5C9A5` | Secondary mom accent, gold-adjacent. |

**When to reach for it:** content about her body, recovery, postpartum
mental health, breastfeeding/feeding decisions, the milestones she's living
through. Don't use it for shared content like family tasks — that's brand
core.

### Far / co-parent palette — `--far`

Layered on the far dashboard, co-parent missions, "support mom" tips, and
the appreciation he sent.

| Token | HSL | Hex | Mood |
|---|---|---|---|
| `--sage` | `140 18% 54%` | `#7A9C82` | Primary far color. Calm grounded green. |
| `--sage-light` | `140 22% 90%` | `#E4EBE3` | Far's card backgrounds. |
| `--sage-dark` | `150 26% 30%` | `#3F6B4E` | Headlines and emphasis in far surfaces. |
| `--moss` | shared | `#264236` | Body emphasis. |

**When to reach for it:** kettlebell-weight comparisons, daily missions for
him, the "support mom" content, far-specific knowledge cards. Workout-frame
content lives here.

### Functional accents

| Token | Hex | Use |
|---|---|---|
| `--success` | sage (re-use) | Confirmations, completed tasks. |
| `--warning` | clay (re-use) | Soft warnings, not error states. |
| `--destructive` | `#B85042` | Real errors and destructive actions only. |

### Contrast notes

- `moss` text on `cream` background: AAA contrast ✓
- `clay` text on `cream`: AA contrast ✓ at 16 px+, AAA at 18.5 px+
- `clay-text` (darker) on `cream`: AAA at all sizes
- Use `clay-text` whenever clay is doing the work of body type; reserve
  `clay` itself for accents, icons, and chunky headlines.

### Forbidden combinations

- Clay text on sage background and vice-versa — the mom/far palettes
  should never compete in the same composition.
- Pure black on cream — too cold. Use `bark` instead.
- Pure white on moss — slightly too clinical. Use `cream` instead.

---

## 4. Typography

### The pairing

- **Fraunces** (variable serif) — display and headlines. Warm, has
  personality, never academic. Use weights 400–600. Italic version is
  generous and emotional.
- **Inter** — body and UI. The gold standard for screen readability. Use
  weights 400, 500, 600. Tabular numerics for any numbers in tables, stats,
  or dashboards.

Why this pairing works: Fraunces is a *soft serif* — its curves match the
rounded shapes in the logo and the app's rounded cards. Inter's neutrality
balances Fraunces's personality so the brand never feels precious. Same
generation (both contemporary), so they look intentional together rather
than accidental.

### Type scale

| Token | Size | Use |
|---|---|---|
| `--text-3xl` | 30 px | Hero headlines on splash/dashboard, pitch-deck slide titles. Fraunces 500. |
| `--text-2xl` | 24 px | Page titles, section openers. Fraunces 500. |
| `--text-xl` | 20 px | Card titles, feature names. Fraunces 500 or Inter 600. |
| `--text-lg` | 17 px | Lead body, key callouts. Inter 400–500. |
| `--text-md` / `--text-base` | 15 px | Default body. Inter 400. |
| `--text-sm` | 13 px | Secondary text, captions, helper. Inter 400. |
| `--text-xs` | 11 px | Eyebrow labels (uppercase, tracked), page numbers. Inter 500, letter-spacing 0.12 em. |

### Headline rules

- Use Fraunces for *anything* the user reads emotionally — greetings, week
  numbers, congratulations, the splash screen. Don't use it for buttons or
  small UI labels.
- Don't underline Fraunces headlines; the serif does the work of
  emphasis.
- Allow generous leading: 1.18 for display, 1.25 for h4-level.

### Body rules

- Body line-height 1.5, sometimes 1.45 for dense surfaces (cards).
- Maximum line length around 65 characters — past that, eyes lose the line.
- Numerals in stats, prices, ages: `font-variant-numeric: tabular-nums` so
  digits line up vertically.

### Eyebrow labels — the Melo signature

The small uppercase tracked label (`UPPERCASE 11 PX, LETTER-SPACING 0.14 EM`)
is everywhere in the app: above headlines, on cards, in dashboards. Treat
it as a brand element, not a default. It works because it gives the eye a
quiet pre-headline orientation: *category → headline*.

---

## 5. Visual motifs

### Soft rounded shapes

`rounded-2xl` cards, `rounded-full` CTAs, `rounded-xl` inputs. The roundness
echoes the rounded square of the logo. Never use a sharp 90° corner on
anything bigger than an icon — it reads as cold in this system.

### The "two arches meet at a heart" silhouette

The logo's central shape — two arches joining at a heart — can be quoted
sparingly as a divider, a section opener, or a watermark on hero cards.
Don't over-use it; the heart should feel earned.

### Earth-tone palette discipline

Every accent comes from the earth-tone family. No neon, no electric blue,
no high-saturation pink. If a competitor's palette would look at home in
Melo, we've drifted.

### Calm motion

- Use `cubic-bezier(0.16, 1, 0.3, 1)` (the in-app `--ease-out-soft`) for
  entrances. 440 ms is the default duration; never below 200, never above
  600.
- Don't bounce. Don't shake. Don't spring past the resting state.
- Subtle blur (`filter: blur(3px) → blur(0)`) is the Melo entrance signature
  — it lets a card "settle" rather than fly in.

---

## 6. Voice and tone

The full guidance lives in `melo-indhold` (the brand-voice skill). The
shortest version:

- **Warm, never saccharine.** "Du gør det godt" — not "you've got this,
  mama!"
- **Specific, not vague.** "Læg en hånd på maven og vent" — not "be
  present."
- **Inclusive by default.** "Din medforælder" — not "din mand." Solo
  parents, same-sex parents, adoptive parents.
- **No judgment on choices.** Amning, flaske, vaginal fødsel, kejsersnit
  — all valid, never qualified.
- **Defer to professionals on health.** Always point to jordemoder,
  sundhedsplejerske, læge, 1813, 112 when relevant.

---

## 7. Applications — quick rules

### In-app
- Background: `cream`. Cards: `warm-white`. Headlines: Fraunces in `bark`
  or `moss`. CTAs: `moss` background, `cream` text, `rounded-full`.
- Mom-context elements: pull from clay palette. Far-context: sage palette.

### Web / landing
- Hero: large Fraunces headline on cream. The figure mark in moss or as
  the full app icon, never both side-by-side.
- Sections separated by 96–128 px of vertical breathing room.

### Investor / business deck
- Cover and closing slides: moss background, cream text, full mark
  top-right.
- Content slides: cream background, small badge mark + wordmark in top
  corner.
- Stats: oversized Fraunces in moss or clay.

### Social
- Profile picture: full mark (rounded-square).
- Post backgrounds: cream or moss-on-cream. Photography: warm
  natural-light tones, never high-contrast or moody.
- Stories/Reels: vertical compositions, Fraunces oversized,
  one clean headline per frame.

### Email
- Sender name: `Melo` (not "Melo Parents ApS" or similar).
- Sender address: `hej@meloparents.com`.
- Subject lines: no emojis in transactional, sparingly in lifecycle.
- Footer: small figure mark in moss, address, unsubscribe link.

---

## 8. Brand assets checklist

For a designer, marketer, or partner picking this up cold:

- [ ] `brand/melo-app-icon-full.png` — full icon, App Store / favicon size
- [ ] `brand/melo-mark-figures.png` — figures only, original sage tones
- [ ] `brand/melo-mark-moss.png` — for light backgrounds
- [ ] `brand/melo-mark-cream.png` — for dark backgrounds
- [ ] `brand/melo-mark-clay.png` — for mom-context surfaces
- [ ] `brand/melo-mark-sage.png` — for far-context surfaces
- [ ] Fraunces and Inter fonts loaded from `src/index.css`
- [ ] All color tokens defined in `src/index.css` `:root` and `.dark`

Anything else (wordmark variants, photography library, motion presets) can
be added to `brand/` and listed here as it's created.

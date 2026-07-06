# Marbella pitch package — summary

Everything produced for the potential Marbella investor pitch, in one
place. Two halves: what's done, and what still needs you.

---

## What's ready

### Pitch materials (English)

- **Pitch deck (PowerPoint, 14 slides)** — `outputs/melo-pitch/Melo-pitch-deck.pptx`
  Cover · 67% hook · Problem · Solution · Product · Why now · Market · Business
  model · Competitive landscape · Traction · Roadmap · Team · The ask · Thank you.
  Branded in moss/sage/clay/cream — designed to feel like Melo, not generic.
- **Business plan (markdown)** — `docs/business-plan-en.md`
  Twelve-section investor-grade plan. Executive summary, market sizing,
  business model, competitive moat, traction, roadmap, team, financials,
  the ask. Uses `[PLACEHOLDER]` where you need to fill in specifics
  (financial projections, exact funding amount, team bios beyond founder).

### App for English demo

- **`src/lib/pregnancyContent.en.ts`** — full English mirror of the week 5–40
  pregnancy content + trimester content (symptoms, red flags, partner tips,
  preparation).
- **`src/lib/farBabyContent.ts`** — extended with `farBabyContentEN` array
  (5 age buckets × all content) so the dad post-birth experience works in
  English.
- **Helper functions** now take an optional `lang` parameter.
  `getWeekContent(week, "en")` and `getFarBabyContent(ageWeeks, "en")`
  return the English data.
- **`DashboardBabyFar.tsx`** already passes `i18n.language` through, so a
  user (or you on stage) toggling the app to English will see the new far-
  baby content in English.

### App Store metadata

- **App name** now contains both pregnancy + new parents in both languages:
  - DA: `Melo — gravid & nye forældre` (28 chars)
  - EN: `Melo — pregnancy & new parents` (30 chars)
- **Category** changed from Medical (high rejection risk) to
  **Health & Fitness (primary) + Lifestyle (secondary)**.

---

## What still needs you (before pitch)

### Pitch deck — placeholders to fill

- **Slide 12 (Team)** — "[Background — to fill in...]". Add your story:
  designer/product/parent — whatever fits.
- **Slide 13 (Ask)** — "€ [AMOUNT]". Replace with your specific funding
  amount.
- **Business plan PLACEHOLDERS** — financial projections table, exact
  funding amount, team composition beyond founder, specific traction
  numbers if you have early waitlist or pilot data.

### Practice the demo

- Demo flow: toggle the app to English (Indstillinger → sprog → English),
  log in as a `mor` and `far` profile to show both perspectives, walk
  through the dashboard, take-a-task mechanic, appreciation, and the
  unique far-baby content. The English content in the new files will
  render correctly.

### Known untranslated legacy content (acceptable for v1)

Some inline arrays in older components are still Danish-only:

- `DashboardPregnantFar.tsx` — `getWeekContent` inline arrays
- `DashboardPregnant.tsx` — facts arrays
- `BarnPage.tsx` — nutrition arrays
- `WeekUnlockModal.tsx`

If you stick to the **baby dashboard (far + mor) and the post-birth flow**
in the demo, everything you show will be English. The pregnancy
dashboards still contain some Danish strings in inline arrays — flag this
to investors as "Nordic localization in progress" if anyone notices.
A full migration to `pregnancyContent.ts` post-launch will close this.

---

## Quick test the night before

1. `npm run dev`
2. Open `localhost:5173` in browser
3. Onboard as English-speaking "far" + "barnet er født"
4. Verify: kettlebell weight, mom support tips, activities all show
   English.
5. Take a screenshot in case the simulator crashes during pitch.

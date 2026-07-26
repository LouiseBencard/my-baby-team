# Melo — fase-relevans-audit (21. juli 2026)

Gennemgang af hvor godt appen kun viser indhold, der er relevant for brugerens
aktuelle fase (gravid / nyfødt / baby). Udført på tværs af navigation,
dashboards, menu og delte indholdssider.

## Hovedkonklusion

**Appen er allerede solidt fase-bevidst.** Det er finpudsning, ikke en
ombygning. Fundamentet — `effectivePhase` udregnet fra terminsdato/fødselsdato
som eneste sandhed — er rigtigt bygget, og de fleste flader respekterer det.

---

## Allerede fase-bevidst (verificeret ✓)

- **`effectivePhase`** udregnes fra datoen i FamilyContext og eksponeres som
  `profile.phase` til hele appen. Én sandhed, dato-styret.
- **Fire dashboards** vælges af fase × rolle (gravid/baby × mor/far).
- **Bundnavigation** har separate sæt: gravid viser Hjem · **Gravid** · MELO ·
  Sammen · Menu — baby viser Hjem · Baby · Chat · Sammen · Mere. "Baby"-fanen
  omdøbes korrekt til "Gravid" under graviditeten.
- **Mere-menuen** deler både "Dine sider" og "Opdag mere" efter fase (gravid:
  gravid-dagbog, gravid-kalender, veer, fødselsplan, babynavne — baby: dagbog,
  søvn, kalender, leg). Barsel-sektion og mor-restitution vises **kun** efter
  fødsel.
- **Råd/guides** (`RaadGuidesPage`) tilpasser kort efter barnets alder og mors
  fødselstype.
- **Ve-tæller** (nyt) vises kun fra uge 36+ på begge gravid-dashboards.
- **Separate ruter** for fase-følsomt indhold: `/gravid-kalender` vs
  `/kalender`, `/gravid-dagbog` vs `/dagbog`.

---

## Fundet og rettet i denne audit ✓

- **Gammelt app-navn "Lille"** stod stadig i to tjekliste-tekster
  (`TjeklistePage.tsx` b4 og a6). Rettet til Melo-neutral formulering. Det er
  en brand-lækage der ikke måtte stå ved launch.
- **Uverificeret produkt-integration** ("Moonboon synkroniserer automatisk med
  Lille") fjernet — en påstand om en funktion der næppe findes, og som kunne
  vildlede.

---

## Tilbage — prioriteret

**MELLEM — i18n-lækager (kun kritisk hvis I lancerer engelsk):**
Nogle navigations- og menutekster er hardkodet på dansk og oversættes ikke,
så en forælder med engelsk valgt ser dansk tekst:
- `BottomNav` gravid-labels: "Hjem", "Gravid", "MELO", "Sammen", "Menu".
- `MerePage`: "Gravid dagbog", "Ønskeliste", "Veer", "Fødselsplan",
  "Forbind med partner", samt fremtids-dato-dialogen.
Da I lancerer DK-først er dette accepteret backlog — men det bør ryddes før en
engelsk launch, netop fordi per-forælder-sprog er en kernefeature.

**RETTET ✓ — produkt-tjekliste:**
- `TjeklistePage`s produkt-tjekliste ("forberedelse") havde en manuel før/efter-
  fødsel-omskifter, der **altid** startede på "før fødsel" — så en baby-forælder
  landede på "køb barneseng inden hjemsendelse". Standardvalget følger nu
  brugerens faktiske fase (gravid → før, baby → efter). Omskifteren er bevaret,
  så man frit kan kigge på den anden fase.

**LAV — indholdsfiltrering at bekræfte:**
- **Shop** (`ShopPage`) filtrerer ikke på fase. Produkterne spænder over begge
  faser, så det er acceptabelt, men kunne tilpasses (gravid ser barsels-forberedelse,
  baby ser alders-relevant grej).

---

## Anbefaling

Fase-fundamentet er stærkt nok til launch som det er. De to reelle bugs (gammelt
brandnavn) er rettet. Resten er:

1. **Hvis DK-only launch:** intet mere kritisk her — appen er fase-korrekt på dansk.
2. **Før engelsk launch:** ryd i18n-lækagerne i BottomNav + MerePage.
3. **Nice-to-have:** fase-filtrér produkt-tjeklisten og evt. shoppen, så en
   baby-forælder aldrig ser "køb inden hjemsendelse"-opgaver.

Det gennemgående princip fremover: nyt indhold tagges med fase fra start og
gates mod `profile.phase` (= effectivePhase), præcis som ve-tælleren.

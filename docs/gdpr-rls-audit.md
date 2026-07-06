# Melo — GDPR & Row Level Security-audit

Gennemgang af Supabase-opsætningen for at sikre, at én familie ikke kan se en
andens data. Helbredsoplysninger om gravide og børn er **særligt følsomme
personoplysninger** under GDPR — RLS er den primære tekniske beskyttelse.

---

## Det, der allerede er rigtigt

RLS er aktiveret og veldokumenteret for de fleste tabeller. Mønstret er
konsistent: ejer kan læse/skrive sit eget, partner kan læse via
`partner_user_id`-koblingen.

- `nursing_logs`, `diaper_logs`, `sleep_logs`, `night_shifts` — owner manage +
  partner read.
- `daily_questions`, `weekly_rituals` — family-scoped (alle i samme
  `family_id` kan læse og skrive).
- `memories`, `appreciations` — owner manage + partner read.
- `device_tokens` — owner manage (partner-read har en bug, se nedenfor).
- `profiles`, `tasks`, `check_ins` — partner-read-politikker eksisterer fra
  family_linking-migrationen.

---

## To rigtige fund — rettet i ny migration

**1. Hver profil kunne læses af enhver autentiseret bruger.**

Politikken `"Anyone can look up profile by invite_code"` på `profiles` har
betingelsen `USING (invite_code IS NOT NULL)`. Hver profil får automatisk et
`invite_code` ved oprettelse — så betingelsen matcher *alle* profiler. Det
betyder, enhver bruger med en gyldig Supabase-session kunne `SELECT *` fra
`profiles` og se navne, terminsdato, fase, børn (med fødselsdato) og
`mor_health` (fødselstype, komplikationer, ernæringsform).

→ Det er **følsomme personoplysninger og helbredsdata** under GDPR. Det er
det største fund i denne audit.

**Løsningen:** Den brede politik fjernes. I stedet bruges en
`SECURITY DEFINER`-funktion `lookup_invite(code)`, der KUN returnerer det
minimum, der skal til for at gennemføre en sammenkobling: `user_id`,
`family_id`, `parent_name`, `partner_name`. Ingen helbredsdata, ingen børn,
ingen datoer.

`InvitePage`'s "tilslut jer"-flow er ændret i `FamilyContext.tsx` til at
kalde `supabase.rpc("lookup_invite", ...)` i stedet for den direkte
`profiles`-SELECT.

**2. `device_tokens` partner-read bruger forkert kolonne.**

Politikken bruger `profiles.id = auth.uid()`. Men `profiles` har *to*
uuid-kolonner: `id` (rækkens primærnøgle) og `user_id` (peger på
`auth.users`). Politikken matcher derfor aldrig og fejler stille — så
partner-aflæsning af push-tokens virker ikke som tilsigtet. Funktionel bug,
ikke et sikkerhedshul, men værd at rette.

→ Rettet til `profiles.user_id = auth.uid()`.

Begge fixes ligger i `supabase/migrations/20260530_rls_hardening.sql`.

---

## Sådan deployer du

1. **Først** push koden (FamilyContext-ændringen er allerede lavet).
2. **Derefter** kør migrationens SQL i Supabase Dashboard → SQL Editor.
3. Test `InvitePage` "tilslut jer"-flowet med en gyldig invite-kode.

Hvis du deployer SQL'en før koden, vil "tilslut jer" fejle i nogle minutter
indtil koden er live — fordi den åbne politik er fjernet, men koden stadig
prøver den direkte SELECT.

---

## Tilbage til verifikation i Supabase Dashboard

Disse kunne ikke verificeres herfra, men bør tjekkes:

- **At base owner-politikker findes for `profiles`, `tasks` og `check_ins`.**
  De er sandsynligvis sat op i en initial migration, der ikke ligger i
  `supabase/migrations/`-mappen. Den nye migration tilføjer dem defensivt
  (idempotent), så hvis de mangler, bliver de oprettet.
- **At `supabase_realtime`-publication kun inkluderer tabeller, hvor det er
  meningsfuldt.** Realtime-events kan teknisk filtreres ud af RLS, men det er
  god skik at dobbelttjekke.
- **At Supabase Auth-indstillingerne** kræver e-mail-bekræftelse (eller bevidst
  ikke gør det) og har rate limiting slået til.

---

## Mindre observationer (ikke launch-blockers)

- **Invite-koder er 6 tegn base36** (~31 bits entropi). Brute-force er teoretisk
  muligt over tid, men Supabase rate-limiter aktivt. Hvis I vil være sikre,
  kan I udvide til 8–10 tegn og evt. tilføje en cooldown-tæller efter X
  forkerte forsøg fra samme bruger.
- **Bidirektional partner-link**: når bruger B joiner bruger A via kode,
  sættes kun B's `partner_user_id`. A's profil opdateres ikke. Det betyder,
  A's partner-read-politikker virker ikke begge veje. Skal fixes hvis
  symmetri er ønsket — formentlig kræver en database trigger eller en
  edge function der opdaterer begge profiler atomart.
- **types.ts** er udløbet — den genereres fra Supabase-skemaet, men de
  seneste tabeller (`memories`, `appreciations`, `daily_questions`,
  `weekly_rituals`, `device_tokens`) er ikke med. Kør `supabase gen types`
  for at få fuld TypeScript-dækning.
- **`.env` er committet til Git.** Tjek at den kun indeholder
  `VITE_SUPABASE_URL` og `VITE_SUPABASE_PUBLISHABLE_KEY` (begge sikre at
  være offentlige). Hvis der ligger en `service_role`-key, skal den roteres
  i Supabase Dashboard og fjernes fra git-historikken med `git filter-repo`.

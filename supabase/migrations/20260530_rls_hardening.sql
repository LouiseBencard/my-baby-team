-- Migration: GDPR / RLS hardening
-- Run i Supabase Dashboard → SQL Editor.
--
-- VIGTIG REKKEFØLGE: Deploy denne migration SAMTIDIG med koden i
-- src/context/FamilyContext.tsx, der skifter fra direkte profiles-SELECT til
-- supabase.rpc("lookup_invite"). Hvis SQL deployes alene først, fejler
-- "tilslut jer"-flowet i InvitePage indtil koden er pushet.
--
-- To rigtige problemer fundet i den eksisterende RLS-opsætning:
--
-- 1. Politikken "Anyone can look up profile by invite_code" gav adgang til
--    HVER eneste profile (inkl. mor_health med komplikationer, børn med
--    fødselsdato, fase, terminsdato osv.) til alle autentiserede brugere.
--    Hver profil får et invite_code ved oprettelse, så betingelsen
--    "invite_code IS NOT NULL" matchede alle. Det er en GDPR-relevant
--    data-eksponering.
--
-- 2. Politikken "Partners can read device tokens" bruger profiles.id hvor
--    den skulle bruge profiles.user_id. profiles har begge kolonner — id
--    er rækkens primærnøgle, user_id peger på auth.users. Den nuværende
--    politik matcher derfor aldrig og fejler stille.

-- ── 1. Fjern den for brede SELECT-politik på profiles ───────────────────────
DROP POLICY IF EXISTS "Anyone can look up profile by invite_code" ON profiles;

-- ── 2. Erstat med en SECURITY DEFINER-funktion, der KUN returnerer det
--    minimum, der skal til for at gennemføre en sammenkobling:
--    user_id (til linket), family_id, parent_name, partner_name.
--    Ingen helbredsdata, ingen børn, ingen datoer.
CREATE OR REPLACE FUNCTION public.lookup_invite(code text)
RETURNS TABLE (
  user_id      uuid,
  family_id    text,
  parent_name  text,
  partner_name text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT p.user_id, p.family_id, p.parent_name, p.partner_name
  FROM public.profiles p
  WHERE p.invite_code = code
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.lookup_invite(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lookup_invite(text) TO authenticated;

-- ── 3. Fix device_tokens partner-read-politik (forkert kolonne) ─────────────
DROP POLICY IF EXISTS "Partners can read device tokens" ON device_tokens;
CREATE POLICY "Partners can read device tokens"
  ON device_tokens FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
        AND profiles.partner_user_id = device_tokens.user_id
    )
  );

-- ── 4. Defensiv hærdning: sikrer at base owner-politikker findes for
--    profiles, tasks og check_ins. Disse ER sandsynligvis sat op i en
--    tidlig migration, men ved at gentage dem her bliver det umuligt for
--    appen at fungere uden dem.
ALTER TABLE profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own profile" ON profiles;
CREATE POLICY "Users can manage own profile"
  ON profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own tasks" ON tasks;
CREATE POLICY "Users can manage own tasks"
  ON tasks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own check_ins" ON check_ins;
CREATE POLICY "Users can manage own check_ins"
  ON check_ins FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

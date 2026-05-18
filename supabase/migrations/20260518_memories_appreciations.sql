-- Migration: Memories and Appreciations cross-device sync
-- Run in Supabase Dashboard → SQL Editor

-- ── 1. Memories table ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS memories (
  id          text        PRIMARY KEY,
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date        timestamptz NOT NULL,
  role        text        NOT NULL,
  text        text        NOT NULL
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own memories" ON memories;
CREATE POLICY "Users can manage own memories"
  ON memories FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Partners can read memories (shared family view)
DROP POLICY IF EXISTS "Partners can read memories" ON memories;
CREATE POLICY "Partners can read memories"
  ON memories FOR SELECT
  USING (
    auth.uid() = user_id
    OR user_id IN (
      SELECT partner_user_id FROM profiles
      WHERE user_id = auth.uid() AND partner_user_id IS NOT NULL
    )
  );

-- ── 2. Appreciations table ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appreciations (
  id          text        PRIMARY KEY,
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date        timestamptz NOT NULL,
  "from"      text        NOT NULL,
  text        text        NOT NULL
);

ALTER TABLE appreciations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own appreciations" ON appreciations;
CREATE POLICY "Users can manage own appreciations"
  ON appreciations FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Partners can read appreciations they sent/received
DROP POLICY IF EXISTS "Partners can read appreciations" ON appreciations;
CREATE POLICY "Partners can read appreciations"
  ON appreciations FOR SELECT
  USING (
    auth.uid() = user_id
    OR user_id IN (
      SELECT partner_user_id FROM profiles
      WHERE user_id = auth.uid() AND partner_user_id IS NOT NULL
    )
  );

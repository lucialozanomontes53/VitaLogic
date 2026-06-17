CREATE TABLE public.recipes (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                TEXT        NOT NULL,
  cooked_for_id       UUID        REFERENCES public.family_profiles(id) ON DELETE SET NULL,
  cooked_for_name     TEXT        NOT NULL DEFAULT '',
  proteins_g          INTEGER     NOT NULL DEFAULT 0,
  carbs_g             INTEGER     NOT NULL DEFAULT 0,
  vegetables_g        INTEGER     NOT NULL DEFAULT 0,
  cooked_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "recipes_select_own"
  ON public.recipes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "recipes_insert_own"
  ON public.recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "recipes_delete_own"
  ON public.recipes FOR DELETE
  USING (auth.uid() = user_id);

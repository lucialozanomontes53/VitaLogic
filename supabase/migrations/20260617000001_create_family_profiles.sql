CREATE TABLE public.family_profiles (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.family_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "family_profiles_select_own"
  ON public.family_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "family_profiles_insert_own"
  ON public.family_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "family_profiles_delete_own"
  ON public.family_profiles FOR DELETE
  USING (auth.uid() = user_id);

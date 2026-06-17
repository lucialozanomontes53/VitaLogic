CREATE TABLE public.ingredients (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT        NOT NULL,
  category   TEXT        NOT NULL CHECK (category IN ('proteina','carbohidrato','verdura')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ingredients_select_own"
  ON public.ingredients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "ingredients_insert_own"
  ON public.ingredients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ingredients_delete_own"
  ON public.ingredients FOR DELETE
  USING (auth.uid() = user_id);

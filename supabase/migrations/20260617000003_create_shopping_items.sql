CREATE TABLE public.shopping_items (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT        NOT NULL,
  category   TEXT        NOT NULL CHECK (category IN ('proteina','carbohidrato','verdura')),
  checked    BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.shopping_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "shopping_items_select_own"
  ON public.shopping_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "shopping_items_insert_own"
  ON public.shopping_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "shopping_items_update_own"
  ON public.shopping_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "shopping_items_delete_own"
  ON public.shopping_items FOR DELETE
  USING (auth.uid() = user_id);

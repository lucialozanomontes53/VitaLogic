CREATE TABLE public.households (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  created_by  UUID        NOT NULL REFERENCES public.users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER households_set_updated_at
  BEFORE UPDATE ON public.households
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;

-- Policies that reference household_members are added in migration 0003
-- once that table exists.

-- Any authenticated user can create a household
CREATE POLICY "households_insert_authenticated"
  ON public.households FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Only the creator can delete
CREATE POLICY "households_delete_creator"
  ON public.households FOR DELETE
  USING (auth.uid() = created_by);

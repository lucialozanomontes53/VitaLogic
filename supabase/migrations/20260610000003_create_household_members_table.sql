CREATE TYPE public.household_role AS ENUM ('admin', 'member');

CREATE TABLE public.household_members (
  id            UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id  UUID                  NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
  user_id       UUID                  NOT NULL REFERENCES public.users(id)      ON DELETE CASCADE,
  role          public.household_role NOT NULL DEFAULT 'member',
  joined_at     TIMESTAMPTZ           NOT NULL DEFAULT NOW(),
  UNIQUE (household_id, user_id)
);

ALTER TABLE public.household_members ENABLE ROW LEVEL SECURITY;

-- Helper functions using SECURITY DEFINER to avoid infinite recursion in RLS
-- (these bypass RLS themselves, so they are safe to call from policies)

CREATE OR REPLACE FUNCTION public.is_member_of_household(p_household_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.household_members
    WHERE household_id = p_household_id
      AND user_id      = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin_of_household(p_household_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.household_members
    WHERE household_id = p_household_id
      AND user_id      = auth.uid()
      AND role         = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.shares_household_with(p_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.household_members hm1
    JOIN public.household_members hm2 ON hm1.household_id = hm2.household_id
    WHERE hm1.user_id = auth.uid()
      AND hm2.user_id = p_user_id
  );
$$;

-- household_members policies

CREATE POLICY "household_members_select_same_household"
  ON public.household_members FOR SELECT
  USING (public.is_member_of_household(household_id));

-- Trigger (SECURITY DEFINER) inserts the creator as admin on household creation,
-- bypassing RLS. Direct inserts are restricted to admins of the target household.
CREATE POLICY "household_members_insert_admin"
  ON public.household_members FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_of_household(household_id));

CREATE POLICY "household_members_update_admin"
  ON public.household_members FOR UPDATE
  USING (public.is_admin_of_household(household_id))
  WITH CHECK (public.is_admin_of_household(household_id));

-- Admins can remove members; members can leave by removing themselves
CREATE POLICY "household_members_delete"
  ON public.household_members FOR DELETE
  USING (
    auth.uid() = user_id
    OR public.is_admin_of_household(household_id)
  );

-- Trigger: auto-add creator as admin when a household is created
CREATE OR REPLACE FUNCTION public.handle_new_household()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.household_members (household_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'admin');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_household_created
  AFTER INSERT ON public.households
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_household();

-- households policies that depend on household_members (deferred from migration 0002)

CREATE POLICY "households_select_members"
  ON public.households FOR SELECT
  USING (public.is_member_of_household(id));

CREATE POLICY "households_update_admin"
  ON public.households FOR UPDATE
  USING     (public.is_admin_of_household(id))
  WITH CHECK (public.is_admin_of_household(id));

-- Extend users visibility: members of the same household can see each other
CREATE POLICY "users_select_household_members"
  ON public.users FOR SELECT
  USING (public.shares_household_with(id));

-- ============================================================
-- FCB Webapp – Seed File
-- ============================================================
-- This file is NOT idempotent by default.
-- Run it once after the initial migration.
-- ============================================================

-- ------------------------------------------------------------
-- Admin user setup
-- ------------------------------------------------------------
-- STEP 1: Create the user via the Supabase Dashboard or Auth API.
--         (Authentication → Users → Invite / Create user)
--         Note down the UUID that Supabase assigns.
--
-- STEP 2: Replace the placeholder values below and run this
--         script in the Supabase SQL editor.
--
-- Placeholder values:
--   <ADMIN_UUID>  → the UUID of the admin user (from auth.users)
--   <ADMIN_EMAIL> → the email of the admin user
-- ------------------------------------------------------------

-- Promote the user to admin in the profiles table.
-- The on_auth_user_role_change trigger will automatically
-- sync the role into raw_app_meta_data (JWT claim).
update public.profiles
set role = 'admin'
where id = '<ADMIN_UUID>'::uuid;

-- If the trigger has not fired yet (e.g. during local dev),
-- you can manually sync app_metadata with the query below.
-- Uncomment and replace <ADMIN_UUID> before running:
--
-- update auth.users
-- set raw_app_meta_data =
--       coalesce(raw_app_meta_data, '{}'::jsonb)
--       || jsonb_build_object('role', 'admin')
-- where id = '<ADMIN_UUID>'::uuid;

-- ------------------------------------------------------------
-- Optional: sample poll (remove if not needed)
-- ------------------------------------------------------------
-- insert into public.polls (question, ends_at)
-- values ('Ki a legjobb játékos az idei szezonban?', now() + interval '7 days');

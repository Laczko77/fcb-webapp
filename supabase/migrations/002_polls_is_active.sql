-- ============================================================
-- Migration 002: Add is_active column to polls table
-- Required by PollSection dashboard widget
-- ============================================================

alter table public.polls
  add column if not exists is_active boolean not null default false;

-- Index for fast active poll lookups
create index if not exists polls_is_active_idx
  on public.polls (is_active, created_at desc)
  where is_active = true;

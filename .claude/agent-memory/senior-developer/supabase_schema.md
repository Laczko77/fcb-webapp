---
name: Supabase Schema Overview
description: All table names, key columns, FK relationships, RLS patterns, and trigger names established in the initial migration
type: project
---

Migration file: `supabase/migrations/001_initial_schema.sql`

## Tables

| Table | Primary key | Notable columns / constraints |
|---|---|---|
| `profiles` | `id` (FK auth.users) | `role` text check ('user','admin'), default 'user' |
| `news` | uuid | `author_id` FK profiles, `published_at` timestamptz |
| `products` | uuid | `price` numeric(10,2), `stock` int >= 0 |
| `orders` | uuid | `user_id` FK profiles, `status` check ('pending','paid','shipped','cancelled') |
| `order_items` | uuid | `order_id` FK orders, `product_id` FK products |
| `match_tickets` | uuid | `match_id` text (API-Football fixture id), `available_seats` int |
| `purchased_tickets` | uuid | `user_id` FK profiles, `ticket_id` FK match_tickets |
| `polls` | uuid | `created_by` FK profiles, `ends_at` timestamptz nullable |
| `poll_options` | uuid | `poll_id` FK polls, `display_order` int |
| `poll_votes` | uuid | unique constraint (poll_id, user_id) — one vote per user per poll |
| `chat_messages` | uuid | `user_id` FK profiles, `content` text |
| `player_descriptions` | uuid | `player_id` int unique (API-Football id), `generated_at` timestamptz |

## RLS helper

`public.is_admin()` — security definer function that checks `profiles.role = 'admin'` for the current user.

## RLS patterns used

- Public read: `using (true)`
- Own read: `using (auth.uid() = user_id)`
- Authenticated read: `using (auth.role() = 'authenticated')`
- Admin all: `using (public.is_admin())`
- order_items own read: subquery via orders.user_id

## Triggers

- `on_auth_user_created` on `auth.users` AFTER INSERT — calls `handle_new_user()` to auto-insert profile row
- `on_auth_user_role_change` on `public.profiles` AFTER INSERT OR UPDATE OF role — calls `sync_role_to_jwt()` to sync role into `auth.users.raw_app_meta_data`

## Storage buckets (manual setup required)

Create these in Supabase Dashboard — Storage, as Public buckets:
- `avatars`
- `news-images`
- `product-images`

**Why:** Supabase Storage buckets cannot be created via SQL migration; they require manual setup or the Supabase CLI/Management API.
**How to apply:** Always remind the user to create these buckets after running the migration when setting up a new environment.

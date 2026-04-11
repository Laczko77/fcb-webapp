-- ============================================================
-- FCB Webapp – Initial Schema Migration
-- Run this in the Supabase SQL editor (or via supabase db push)
-- ============================================================

-- ------------------------------------------------------------
-- 1. Extensions
-- ------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- 2. Tables
-- (created in FK-dependency order)
-- ------------------------------------------------------------

-- profiles: one row per auth user
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  full_name   text,
  nickname    text,
  avatar_url  text,
  role        text        not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now()
);

-- news
create table if not exists public.news (
  id           uuid        primary key default uuid_generate_v4(),
  title        text        not null,
  content      text        not null,
  image_url    text,
  author_id    uuid        references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at   timestamptz not null default now()
);

-- products (webshop)
create table if not exists public.products (
  id          uuid        primary key default uuid_generate_v4(),
  name        text        not null,
  description text,
  price       numeric(10,2) not null check (price >= 0),
  image_url   text,
  stock       integer     not null default 0 check (stock >= 0),
  created_at  timestamptz not null default now()
);

-- orders
create table if not exists public.orders (
  id          uuid        primary key default uuid_generate_v4(),
  user_id     uuid        not null references public.profiles(id) on delete cascade,
  total_price numeric(10,2) not null check (total_price >= 0),
  status      text        not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  created_at  timestamptz not null default now()
);

-- order_items
create table if not exists public.order_items (
  id          uuid        primary key default uuid_generate_v4(),
  order_id    uuid        not null references public.orders(id) on delete cascade,
  product_id  uuid        not null references public.products(id) on delete restrict,
  quantity    integer     not null check (quantity > 0),
  unit_price  numeric(10,2) not null check (unit_price >= 0)
);

-- match_tickets (seats offered for sale)
create table if not exists public.match_tickets (
  id              uuid        primary key default uuid_generate_v4(),
  match_id        text        not null,           -- API-Football fixture id
  home_team       text        not null,
  away_team       text        not null,
  match_date      timestamptz not null,
  venue           text,
  price           numeric(10,2) not null check (price >= 0),
  available_seats integer     not null default 0 check (available_seats >= 0),
  created_at      timestamptz not null default now()
);

-- purchased_tickets
create table if not exists public.purchased_tickets (
  id           uuid        primary key default uuid_generate_v4(),
  user_id      uuid        not null references public.profiles(id) on delete cascade,
  ticket_id    uuid        not null references public.match_tickets(id) on delete restrict,
  quantity     integer     not null check (quantity > 0),
  total_price  numeric(10,2) not null check (total_price >= 0),
  purchased_at timestamptz not null default now()
);

-- polls
create table if not exists public.polls (
  id          uuid        primary key default uuid_generate_v4(),
  question    text        not null,
  created_by  uuid        references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  ends_at     timestamptz
);

-- poll_options
create table if not exists public.poll_options (
  id            uuid    primary key default uuid_generate_v4(),
  poll_id       uuid    not null references public.polls(id) on delete cascade,
  option_text   text    not null,
  display_order integer not null default 0
);

-- poll_votes  (one vote per user per poll enforced by unique constraint)
create table if not exists public.poll_votes (
  id        uuid        primary key default uuid_generate_v4(),
  poll_id   uuid        not null references public.polls(id) on delete cascade,
  option_id uuid        not null references public.poll_options(id) on delete cascade,
  user_id   uuid        not null references public.profiles(id) on delete cascade,
  voted_at  timestamptz not null default now(),
  constraint poll_votes_one_per_user unique (poll_id, user_id)
);

-- chat_messages
create table if not exists public.chat_messages (
  id         uuid        primary key default uuid_generate_v4(),
  user_id    uuid        not null references public.profiles(id) on delete cascade,
  content    text        not null,
  created_at timestamptz not null default now()
);

-- player_descriptions (AI-generated, keyed by API-Football player id)
create table if not exists public.player_descriptions (
  id           uuid    primary key default uuid_generate_v4(),
  player_id    integer not null unique,          -- API-Football player id
  content      text    not null,
  generated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3. Row Level Security – enable on every table
-- ------------------------------------------------------------
alter table public.profiles           enable row level security;
alter table public.news               enable row level security;
alter table public.products           enable row level security;
alter table public.orders             enable row level security;
alter table public.order_items        enable row level security;
alter table public.match_tickets      enable row level security;
alter table public.purchased_tickets  enable row level security;
alter table public.polls              enable row level security;
alter table public.poll_options       enable row level security;
alter table public.poll_votes         enable row level security;
alter table public.chat_messages      enable row level security;
alter table public.player_descriptions enable row level security;

-- ------------------------------------------------------------
-- 4. Helper: is the current user an admin?
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ------------------------------------------------------------
-- 5. RLS Policies
-- ------------------------------------------------------------

-- ---- profiles ----
create policy "profiles: own read"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles: own update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles: admin all"
  on public.profiles for all
  using (public.is_admin());

-- ---- news ----
create policy "news: public read"
  on public.news for select
  using (true);

create policy "news: admin insert"
  on public.news for insert
  with check (public.is_admin());

create policy "news: admin update"
  on public.news for update
  using (public.is_admin());

create policy "news: admin delete"
  on public.news for delete
  using (public.is_admin());

-- ---- products ----
create policy "products: public read"
  on public.products for select
  using (true);

create policy "products: admin insert"
  on public.products for insert
  with check (public.is_admin());

create policy "products: admin update"
  on public.products for update
  using (public.is_admin());

create policy "products: admin delete"
  on public.products for delete
  using (public.is_admin());

-- ---- orders ----
create policy "orders: own read"
  on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

create policy "orders: own insert"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "orders: admin update"
  on public.orders for update
  using (public.is_admin());

create policy "orders: admin delete"
  on public.orders for delete
  using (public.is_admin());

-- ---- order_items ----
create policy "order_items: own read"
  on public.order_items for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "order_items: own insert"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "order_items: admin update"
  on public.order_items for update
  using (public.is_admin());

create policy "order_items: admin delete"
  on public.order_items for delete
  using (public.is_admin());

-- ---- match_tickets ----
create policy "match_tickets: public read"
  on public.match_tickets for select
  using (true);

create policy "match_tickets: admin insert"
  on public.match_tickets for insert
  with check (public.is_admin());

create policy "match_tickets: admin update"
  on public.match_tickets for update
  using (public.is_admin());

create policy "match_tickets: admin delete"
  on public.match_tickets for delete
  using (public.is_admin());

-- ---- purchased_tickets ----
create policy "purchased_tickets: own read"
  on public.purchased_tickets for select
  using (auth.uid() = user_id or public.is_admin());

create policy "purchased_tickets: own insert"
  on public.purchased_tickets for insert
  with check (auth.uid() = user_id);

create policy "purchased_tickets: admin update"
  on public.purchased_tickets for update
  using (public.is_admin());

create policy "purchased_tickets: admin delete"
  on public.purchased_tickets for delete
  using (public.is_admin());

-- ---- polls ----
create policy "polls: public read"
  on public.polls for select
  using (true);

create policy "polls: admin insert"
  on public.polls for insert
  with check (public.is_admin());

create policy "polls: admin update"
  on public.polls for update
  using (public.is_admin());

create policy "polls: admin delete"
  on public.polls for delete
  using (public.is_admin());

-- ---- poll_options ----
create policy "poll_options: public read"
  on public.poll_options for select
  using (true);

create policy "poll_options: admin insert"
  on public.poll_options for insert
  with check (public.is_admin());

create policy "poll_options: admin update"
  on public.poll_options for update
  using (public.is_admin());

create policy "poll_options: admin delete"
  on public.poll_options for delete
  using (public.is_admin());

-- ---- poll_votes ----
create policy "poll_votes: own read"
  on public.poll_votes for select
  using (auth.uid() = user_id or public.is_admin());

create policy "poll_votes: own insert"
  on public.poll_votes for insert
  with check (auth.uid() = user_id);

create policy "poll_votes: admin update"
  on public.poll_votes for update
  using (public.is_admin());

create policy "poll_votes: admin delete"
  on public.poll_votes for delete
  using (public.is_admin());

-- ---- chat_messages ----
create policy "chat_messages: authenticated read"
  on public.chat_messages for select
  using (auth.role() = 'authenticated');

create policy "chat_messages: authenticated insert own"
  on public.chat_messages for insert
  with check (auth.uid() = user_id and auth.role() = 'authenticated');

create policy "chat_messages: admin delete"
  on public.chat_messages for delete
  using (public.is_admin());

-- ---- player_descriptions ----
create policy "player_descriptions: public read"
  on public.player_descriptions for select
  using (true);

create policy "player_descriptions: admin insert"
  on public.player_descriptions for insert
  with check (public.is_admin());

create policy "player_descriptions: admin update"
  on public.player_descriptions for update
  using (public.is_admin());

create policy "player_descriptions: admin delete"
  on public.player_descriptions for delete
  using (public.is_admin());

-- ------------------------------------------------------------
-- 6. Auto-create profile on signup
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    'user'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- 7. JWT role sync trigger  (task 0.2.3)
-- Syncs profiles.role → auth.users.raw_app_meta_data.role
-- so that the JWT claim 'app_metadata.role' stays current.
-- ------------------------------------------------------------
create or replace function public.sync_role_to_jwt()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update auth.users
  set raw_app_meta_data =
        coalesce(raw_app_meta_data, '{}'::jsonb)
        || jsonb_build_object('role', new.role)
  where id = new.id;
  return new;
end;
$$;

create or replace trigger on_auth_user_role_change
  after insert or update of role
  on public.profiles
  for each row
  execute procedure public.sync_role_to_jwt();

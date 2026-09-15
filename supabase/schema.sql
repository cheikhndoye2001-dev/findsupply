-- FindSupply — schéma initial (MVP)
-- À exécuter dans Supabase : Dashboard > SQL Editor > New query

create extension if not exists "pgcrypto";

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  item_description text not null,
  quantity integer not null default 1,
  size_color_model text,
  budget_amount numeric,
  budget_currency text check (budget_currency in ('EUR', 'FCFA')),
  photo_url text not null,
  client_name text not null,
  client_contact text not null,
  status text not null default 'a_traiter'
    check (status in ('a_traiter', 'recherche_en_cours', 'trouve', 'commande', 'livre')),
  admin_note text
);

alter table public.requests enable row level security;

-- N'importe qui peut créer une demande (formulaire public, pas encore de comptes clients)
create policy "Public peut créer une demande"
  on public.requests for insert
  to anon
  with check (true);

-- Seuls les utilisateurs connectés (l'admin, pour l'instant un seul compte) peuvent lire/modifier
create policy "Utilisateurs connectés peuvent lire les demandes"
  on public.requests for select
  to authenticated
  using (true);

create policy "Utilisateurs connectés peuvent modifier les demandes"
  on public.requests for update
  to authenticated
  using (true);

-- Stockage des photos --------------------------------------------------

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

create policy "Public peut uploader une photo"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'photos');

create policy "Public peut voir les photos"
  on storage.objects for select
  to anon
  using (bucket_id = 'photos');

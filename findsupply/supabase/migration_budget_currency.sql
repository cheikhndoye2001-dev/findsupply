-- Migration : remplace le champ "budget" (texte libre) par un montant +
-- une monnaie (EUR ou FCFA).
--
-- À exécuter UNIQUEMENT si tu as déjà créé la table `requests` avec
-- l'ancien schéma (colonne `budget` en texte). Si tu crées le projet
-- Supabase pour la première fois, ignore ce fichier et utilise
-- directement `schema.sql`.
--
-- Dashboard Supabase > SQL Editor > New query > coller ceci > exécuter.

alter table public.requests
  add column if not exists budget_amount numeric,
  add column if not exists budget_currency text
    check (budget_currency in ('EUR', 'FCFA'));

-- Si tu veux supprimer l'ancienne colonne "budget" (texte libre) une fois
-- vérifié que tout fonctionne bien, décommente la ligne suivante :
-- alter table public.requests drop column if exists budget;

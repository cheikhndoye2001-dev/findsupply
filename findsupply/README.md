# FindSupply — You Find It. We Supply It.

MVP : le client envoie une photo + une description de l'article recherché,
Cheikh reçoit la demande sur son espace admin, cherche l'équivalent auprès de
ses fournisseurs en Chine, met à jour le statut et recontacte le client.

## 1. Créer le projet Supabase

1. Aller sur [supabase.com](https://supabase.com) → New project.
2. Une fois créé, ouvrir **SQL Editor** → New query, coller le contenu de
   `supabase/schema.sql`, et l'exécuter. Ça crée :
   - la table `requests` (les demandes)
   - le bucket de stockage `photos`
   - les règles de sécurité (le public peut créer une demande et uploader une
     photo ; seul un compte connecté — toi — peut lire/modifier les demandes)
3. Aller dans **Authentication → Users → Add user**, et créer ton compte
   admin (email + mot de passe). C'est ce compte qui te servira à te
   connecter sur `/admin`.
4. Aller dans **Project Settings → API** et récupérer :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Configurer le projet en local

```bash
cp .env.local.example .env.local
# puis coller les deux valeurs récupérées à l'étape 1

npm install
npm run dev
```

Le site est sur `http://localhost:3000` (formulaire client) et
`http://localhost:3000/admin` (espace admin, protégé par connexion).

## 3. Déployer sur Vercel

1. Pousser ce projet sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com) → New Project → importer le dépôt.
3. Dans les réglages du projet Vercel → **Environment Variables**, ajouter
   `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Déployer. Le site est en ligne, gratuit pour ce niveau de trafic.

## Structure du projet

```
app/
  page.tsx              → formulaire client (page d'accueil)
  merci/page.tsx         → confirmation après envoi
  admin/
    login/page.tsx       → connexion admin
    page.tsx              → liste des demandes
    RequestCard.tsx        → carte demande + changement de statut
  api/requests/
    route.ts              → POST créer une demande / GET lister (admin)
    [id]/route.ts          → PATCH modifier statut / note
lib/
  supabase/               → clients Supabase (navigateur + serveur)
  types.ts                → statuts et types de données
middleware.ts             → protège /admin, exige une connexion
supabase/schema.sql       → table, bucket photos, règles de sécurité
```

## Statuts d'une demande

`a_traiter` → `recherche_en_cours` → `trouve` → `commande` → `livre`

## Pensé pour évoluer

La table `requests` et la structure du projet sont prêtes à accueillir,
sans tout refaire :
- **Comptes clients** : ajouter une table `clients` liée par `client_id`,
  et un formulaire d'inscription utilisant Supabase Auth (déjà en place
  pour l'admin).
- **Messagerie** : une table `messages` liée à `request_id`.
- **Notifications** : webhook Supabase (sur changement de `status`) vers
  WhatsApp/SMS/email.
- **Paiement** : intégrer Wave, Orange Money ou Stripe sur la page de
  détail d'une demande, une fois le prix connu.

## Prochaines étapes suggérées après le MVP

1. Tester le formulaire et l'espace admin avec de vraies demandes.
2. Ajouter un système de notification simple (WhatsApp/SMS) au client
   quand le statut passe à "Trouvé".
3. Ajouter les comptes clients et le suivi de commande.

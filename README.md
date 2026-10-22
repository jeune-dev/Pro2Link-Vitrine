# Pro2Link Site — site vitrine public

Site public de Pro2Link : présentation de la plateforme, inscription des entreprises et connexion des comptes
entreprise (acheteurs et fournisseurs). Déployable seul.

Le **back-office des administrateurs** est un projet distinct : `pro2link-admin`. Les deux utilisent la même API
Pro2Link (`b2b_back`, préfixe `/api/v1`) sans la modifier.

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : hero avec maquette React/CSS, problèmes, fonctionnalités, parcours, profils, avantages, aperçu web/mobile, FAQ, appel à l’action |
| `/fonctionnalites` | Détail des fonctionnalités, exemples d’utilisation |
| `/comment-ca-marche` | Parcours acheteur et parcours fournisseur, statuts d’une commande |
| `/connexion` | Connexion des comptes entreprise (double authentification si activée, mot de passe provisoire) |
| `/inscription` | Création du compte et de l’entreprise (3 étapes) |
| `/mot-de-passe-oublie` | Réinitialisation par code à 6 chiffres |
| `/espace-entreprise` | Arrivée d’un compte entreprise : redirection vers `VITE_APP_ENTREPRISE_URL` si configurée |
| `/mentions-legales`, `/confidentialite`, `/conditions-utilisation` | Pages légales (structure en place, texte à fournir) |

Un **super administrateur** qui se connecte sur le site est déconnecté aussitôt et invité à ouvrir le back-office
(`VITE_ADMIN_URL`).

## Stack

Vite 8 · React 19 · React Router 7 · Tailwind CSS 4 (branché sur les variables `--pl-*` de la charte) · Axios ·
Lucide React · React Hook Form + Zod · Vitest.

## Installation et lancement local

Prérequis : Node.js 20 ou plus, et le backend `b2b_back` démarré sur `http://localhost:3000`.

```bash
npm install
```

```bash
npm run dev
```

Le site est servi sur http://localhost:5173 (port suivant si occupé). Le **proxy Vite** redirige `/api` et `/health`
vers le backend : le navigateur ne voit qu’une origine, le cookie httpOnly du refresh token circule sans CORS.

```bash
npm run build
```

```bash
npm test
```

## Variables d’environnement

Voir [.env.example](.env.example). Les variables `VITE_*` sont **publiques** (incluses dans le bundle) : aucun secret.

| Variable | Rôle |
|---|---|
| `VITE_API_BASE_URL` | Base de l’API (`/api/v1` derrière le proxy ou le reverse proxy ; sinon URL complète) |
| `VITE_API_PROXY_TARGET` | Développement : backend ciblé par le proxy Vite |
| `VITE_APP_ENTREPRISE_URL` | Application des entreprises (redirection après connexion ou inscription) |
| `VITE_ADMIN_URL` | Back-office `pro2link-admin` (lien proposé à un super admin) |
| `VITE_SITE_URL` | URL publique du site : canoniques, Open Graph, `sitemap.xml` |
| `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE` | Coordonnées du pied de page (masquées si vides) |

## Déploiement

- Servir `dist/` en application monopage (renvoyer `index.html` sur toutes les routes).
- API sur le même domaine (reverse proxy `/api/v1`) ou sur un sous-domaine du **même domaine principal**
  (cookie `SameSite=Strict`) ; dans ce cas, ajouter l’origine du site à `CORS_ORIGIN` du backend.
- `robots.txt` et `sitemap.xml` sont générés au build à partir de `VITE_SITE_URL`.

## Endpoints utilisés

| Écran | Route |
|---|---|
| Session | `POST /auth/connexion`, `POST /auth/mfa`, `POST /auth/refresh`, `POST /auth/deconnexion` |
| Inscription | `POST /auth/inscription` |
| Mot de passe oublié | `POST /auth/mot-de-passe-oublie`, `POST /auth/reinitialiser-mot-de-passe` |
| Mot de passe provisoire | `GET /compte`, `POST /compte/mot-de-passe` |
| Libellés (types, secteurs) | `GET /referentiels` |

## Sécurité

Jeton d’accès en mémoire uniquement, refresh token en cookie httpOnly posé par l’API, un seul rafraîchissement à la
fois, erreurs 5xx sans détail interne, aucune inscription simulée (seule une réponse 201 ouvre la session).

## À fournir par Pro2Link

Logo officiel (identité textuelle provisoire dans `src/components/common/Logo.jsx`), texte des pages légales,
coordonnées de contact, URL de l’application des entreprises, URL publique du site, références clients
(`src/content/site.js` › `REFERENCES`, section masquée tant qu’elle est vide). Les maquettes de la page d’accueil
contiennent des valeurs fictives, signalées comme telles.

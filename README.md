# septicpumpingquote.com

Local septic **quote-request / contractor matching** platform. Not a fake septic company.

Brand promise: *Request quotes from septic service professionals in your area.*

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- Firebase Auth (admin) + Firestore (production data)
- Local JSON store fallback in `/data` when Firebase Admin is not configured
- Google Search Console API (SEO dashboard)
- GA4 / GTM hooks

## Architecture

```
src/
  app/                 # Public pages, admin, API routes
  components/          # Quote funnel, SEO templates, admin UI
  config/              # Site, services, locations
  content/             # SEO page + keyword seed content
  lib/                 # Leads, providers, GSC, attribution, store
docs/                  # SEO, attribution, routing guides
```

Firestore collections (Firestore or local mirror):

`users`, `leads`, `providers`, `providerAssignments`, `seoPages` (content also in repo), `keywords`, `seoMetrics`, `settings`

## Local setup

```bash
cd septicpumpingquote.com
npm install
cp .env.example .env.local
# set ADMIN_DEV_PASSWORD at minimum
npm run dev
```

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin/login  
  Without Firebase, sign in with `ADMIN_DEV_PASSWORD` (default in code path: set explicitly in `.env.local`).

```bash
npm run lint
npm run typecheck
npm run build
```

## Firebase setup

1. Create a Firebase project.
2. Enable Email/Password Auth for admin users.
3. Create a Firestore database.
4. Create a service account; put `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` in `.env.local`.
5. Add web app config to `NEXT_PUBLIC_FIREBASE_*`.
6. Deploy `firestore.rules` (add your admin emails or switch to custom claims).
7. Create an admin user in Firebase Auth.

When Admin SDK credentials are present, leads/providers persist to Firestore. Otherwise they persist to `data/local-db.json`.

## Vercel deployment

1. Import the `septicpumpingquote.com` directory (or repo) into Vercel.
2. Set environment variables from `.env.example`.
3. Attach domain `septicpumpingquote.com`.
4. Deploy. Confirm `/sitemap.xml` and `/robots.txt`.

## GA4 setup

1. Create a GA4 property.
2. Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.
3. Optional: set `NEXT_PUBLIC_GTM_ID` for Tag Manager.
4. Events fire from the quote funnel via `gtag` / `dataLayer`.

## Search Console setup

1. Verify the domain property for `septicpumpingquote.com`.
2. Submit `https://septicpumpingquote.com/sitemap.xml`.
3. Create a GCP service account with Search Console access to the property.
4. Set `GSC_CLIENT_EMAIL`, `GSC_PRIVATE_KEY`, `GSC_PROPERTY`.
5. In Admin → SEO Performance, click **Sync Search Console**.

Without credentials, sync loads sample opportunity rows so the UI is testable.

## Admin overview

Navigation: Overview, Leads, SEO Performance, Pages, Keywords, Locations, Providers, Lead Routing, Analytics, Settings.

### How to add a provider

Admin → Providers → fill company, cities, services, status → Save.

### How to route a lead

Admin → Leads → open lead → Manual lead routing → assign matching provider.  
Or use Admin → Lead Routing for the open-lead queue.

### How to add a city / service / SEO page

See [docs/SEO_STRATEGY.md](docs/SEO_STRATEGY.md).

## Related docs

- [docs/SEO_STRATEGY.md](docs/SEO_STRATEGY.md)
- [docs/LEAD_ATTRIBUTION.md](docs/LEAD_ATTRIBUTION.md)
- [docs/PROVIDER_ROUTING.md](docs/PROVIDER_ROUTING.md)

## Sister sites

This system is designed to be reused for:

- `chimneyserviceguide.com` (guides + quote requests)
- `wellpumprepairquote.com` (same lead-gen model, different taxonomy)

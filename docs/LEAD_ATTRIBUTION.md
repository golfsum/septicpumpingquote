# Lead Attribution

Every quote submission stores SEO + traffic attribution so admin can answer: **which page/query produced this lead?**

## Captured fields

Stored on each lead under `attribution`:

- `landingPage` — first page in the session
- `firstTouchPage` — first page ever for this visitor (localStorage)
- `currentPage` — page where the form was submitted
- `seoPageId` — SEO content slug when known
- `cityPage` / `servicePage`
- `referrer`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `gclid`, `fbclid`
- `sessionId`, `visitorId`
- `deviceType`
- `gaClientId` (from `_ga` cookie when present)

Derived:

- `trafficSource`: `organic` | `paid` | `direct` | `referral` | `campaign`

## Client capture

`src/lib/attribution/client.ts` runs in the quote form on submit. Session landing page is set once per session; first-touch persists across sessions.

## Funnel events (GA4 / dataLayer)

- `quote_form_view`
- `quote_started`
- `quote_step_completed`
- `quote_submitted`
- `lead_created`
- `service_selected`

## Admin views

- **Leads** table: source + landing page columns
- **Lead detail**: full attribution block
- **Pages / SEO**: joins Search Console metrics with leads-by-landing-page
- **Opportunities**: lead CVR by query/page

## Important caveats

- Search Console data is delayed and not a perfect 1:1 with sessions.
- Organic classification from referrer is best-effort (many browsers strip referrers).
- Prefer GSC page clicks + your lead landing pages together, not either alone.

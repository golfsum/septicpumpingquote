# Provider Routing

## Goal

When a homeowner requests a septic quote, find providers who:

1. Offer the requested service
2. Cover the city/ZIP
3. Have capacity / active status

Then deliver the lead (manually at first).

## Provider fields

See `Provider` in `src/lib/types/index.ts`.

Statuses: `prospect` → `contacted` → `trial` → `active` → `paused` / `inactive`.

## Prospecting (compliant)

Admin → Providers supports:

- Manual entry
- Future: CSV import
- Future: compliant enrichment APIs

Do **not** scrape Google in violation of terms.

## Matching logic

`matchProvidersForLead()` matches on:

- City in `serviceAreaCities` or provider city
- ZIP prefix overlap when ZIP lists exist
- Service slug overlap in `servicesOffered`

## Delivery

Current mode: **manual approval**.

From lead detail or Lead Routing:

1. Review lead
2. See matching providers
3. Assign / send
4. System writes `providerAssignments` and updates lead status to `sent_to_provider`

Email/SMS delivery can plug into `assignLeadToProvider` later. Architecture already logs `sentAt`, price, and status.

## Future modes (scaffolded, not enabled)

- Exclusive vs shared leads
- Round robin / weighted
- Highest-paying provider
- Daily/monthly caps (`dailyCap`, `monthlyCap`)

Keep `routingMode: 'manual'` until quality controls are solid.

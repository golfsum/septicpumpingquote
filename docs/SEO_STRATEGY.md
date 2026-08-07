# SEO Strategy — septicpumpingquote.com

## Positioning

Lead-generation / quote-matching platform first. SEO second, but tightly measured against leads.

Do **not** mass-generate thin `service + city` doorway pages. Publish city/service pages only when they have unique local and service-specific content.

## Launch cluster (Tucson)

Priority indexable pages:

1. `/`
2. `/septic-pumping`
3. `/septic-repair`
4. `/emergency-septic-service`
5. `/septic-inspection`
6. `/drain-field-repair`
7. `/septic-tank-pumping-cost`
8. `/signs-septic-tank-is-full`
9. `/az/tucson`
10. `/az/tucson/septic-pumping`
11. `/az/tucson/septic-repair`
12. `/az/tucson/emergency-septic-service`
13. `/az/tucson/septic-inspection`
14. `/az/tucson/drain-field-repair`

Nearby communities (Marana, Oro Valley, Sahuarita, Vail, Catalina) are in the location config for future expansion — not auto-published.

## URL architecture

- Services: `/{service}`
- Guides: `/{guide-slug}`
- City hub: `/{state}/{city}`
- City + service: `/{state}/{city}/{service}`

Avoid `/near-me` spam URLs. Target “near me” intent with strong local pages and natural wording.

## Index policy

Each page has `indexStatus`: `draft` | `noindex` | `indexable`.

Only `indexable` + `published` pages enter the sitemap.

## Opportunity engine

Admin SEO dashboard categorizes queries using Search Console + lead attribution:

- QUICK_WIN
- HIGH_IMPRESSION_LOW_CTR
- RANKING_BUT_NO_LEADS
- LEAD_WINNER
- CONTENT_OPPORTUNITY
- INFORMATIONAL_LOW_VALUE

Expand clusters where leads (not just traffic) justify the work.

## How to add a city

1. Add location in `src/config/locations.ts` with unique `localNotes`.
2. Create city hub + city-service entries in `src/content/seo-pages.ts` with real local content (soil, access, nearby areas, FAQs).
3. Set `indexStatus: 'indexable'` only when content quality is sufficient.
4. Add internal links from related service/guide pages.
5. Deploy and submit/refresh sitemap in Search Console.

## How to add a service

1. Add to `src/config/services.ts` (`SERVICE_OPTIONS` + related slugs).
2. Add service page content in `src/content/seo-pages.ts`.
3. Optionally add city-service variants for proven markets only.
4. Wire nav/footer/internal links.

## How to publish an SEO page

1. Author substantial unique sections + FAQs.
2. Set `published: true`.
3. Set `indexStatus: 'indexable'` when ready for Google.
4. Verify metadata, canonical, breadcrumbs, and quote form presets.
5. Confirm inclusion in `/sitemap.xml`.

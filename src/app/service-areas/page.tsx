import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedLocations } from "@/config/locations";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Septic Service Areas | Local Pumping, Repair & Emergency Quotes",
  description:
    "Browse septic service areas and local pages for septic pumping, repair, emergency service, installation, and tank cleaning.",
  alternates: {
    canonical: `${siteConfig.url}/service-areas`,
  },
};

const localServices = [
  { slug: "septic-pumping", label: "Septic pumping" },
  { slug: "septic-repair", label: "Septic repair" },
  { slug: "emergency-septic-service", label: "Emergency septic" },
  { slug: "septic-installation", label: "Septic installation" },
  { slug: "septic-tank-cleaning", label: "Tank cleaning" },
];

const priorityLocations = [
  "tulsa",
  "tucson",
  "charlotte",
  "tampa",
  "austin",
  "sacramento",
  "nashville",
  "des-moines",
  "fort-worth",
  "albuquerque",
  "spokane",
  "colorado-springs",
];

export default function ServiceAreasPage() {
  const locations = [...getPublishedLocations()].sort((a, b) => {
    const ai = priorityLocations.indexOf(a.slug);
    const bi = priorityLocations.indexOf(b.slug);
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return `${a.state}-${a.name}`.localeCompare(`${b.state}-${b.name}`);
  });

  const featured = locations.filter((loc) => priorityLocations.includes(loc.slug)).slice(0, 8);

  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">
            Local septic service
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900">
            Septic service areas and local quote guides
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Choose your metro area to see local septic pumping, repair, emergency,
            installation, and tank-cleaning guidance. Each location page includes
            area-specific notes about soil, climate, access, and nearby communities.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {featured.map((loc) => (
              <Link key={loc.slug} href={`/${loc.stateSlug}/${loc.slug}`} className="rounded-full border border-teal-200 bg-white px-3 py-1.5 text-sm font-semibold text-teal-900 hover:border-teal-600">
                {loc.name}, {loc.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((loc) => {
            const base = `/${loc.stateSlug}/${loc.slug}`;
            return (
              <article key={`${loc.stateSlug}-${loc.slug}`} className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-slate-900">
                  <Link href={base} className="hover:text-teal-800">{loc.name}, {loc.state}</Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Local septic guidance for {loc.regionLabel}, including nearby areas such as {loc.nearbyNames.slice(0, 3).join(", ")}.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {localServices.map((service) => (
                    <Link key={service.slug} href={`${base}/${service.slug}`} className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800">
                      {service.label}
                    </Link>
                  ))}
                </div>
                <Link href={base} className="mt-5 inline-block text-sm font-semibold text-teal-800 hover:underline">
                  View all {loc.name} septic services →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-900">Browse national service guides and tools</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/septic-pumping" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-teal-600">Septic pumping</Link>
            <Link href="/septic-repair" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-teal-600">Septic repair</Link>
            <Link href="/septic-inspection" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-teal-600">Septic inspection</Link>
            <Link href="/drain-field-repair" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-teal-600">Drain field repair</Link>
            <Link href="/emergency-septic-service" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-teal-600">Emergency septic service</Link>
            <Link href="/tools" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-teal-600">Free septic calculators</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

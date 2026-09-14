import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Septic Tools & Calculators | SepticPumpingQuote",
  description:
    "Use free septic calculators to estimate pumping frequency, approximate tank size needs, and plan septic maintenance before requesting local quotes.",
  alternates: { canonical: `${siteConfig.url}/tools` },
};

const tools = [
  {
    href: "/tools/septic-pumping-frequency-calculator",
    title: "Septic Pumping Frequency Calculator",
    body: "Estimate a practical pumping interval using household size, tank size, garbage-disposal use, and occupancy.",
  },
  {
    href: "/tools/septic-tank-size-calculator",
    title: "Septic Tank Size Calculator",
    body: "Estimate a planning range for residential tank capacity from bedrooms and household size before confirming local code requirements.",
  },
  {
    href: "/tools/septic-maintenance-schedule",
    title: "Septic Maintenance Schedule",
    body: "Build a simple recurring checklist for pumping, inspections, filters, alarms, and water-use checks.",
  },
];

export default function ToolsPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">Free homeowner resources</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Septic tools and calculators</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Use these planning tools to understand maintenance timing and system basics before you compare local septic-service quotes.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-12 md:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.href} className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-900">{tool.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{tool.body}</p>
            <Link href={tool.href} className="mt-5 inline-block font-semibold text-teal-800 hover:underline">
              Open tool →
            </Link>
          </article>
        ))}
      </section>
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-slate-900">Need service now?</h2>
          <p className="mt-2 text-slate-600">Calculators are planning aids. Backups, sewage surfacing, or high-water alarms need professional diagnosis.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/septic-pumping" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium">Septic pumping</Link>
            <Link href="/emergency-septic-service" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium">Emergency septic service</Link>
            <Link href="/service-areas" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium">Find your service area</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

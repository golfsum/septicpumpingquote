import type { Metadata } from "next";
import Link from "next/link";
import { TankSizeCalculator } from "@/components/tools/TankSizeCalculator";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Septic Tank Size Calculator | Residential Planning Estimate",
  description:
    "Estimate a residential septic tank capacity range from bedrooms and household size, then confirm local code requirements with a licensed provider.",
  alternates: { canonical: `${siteConfig.url}/tools/septic-tank-size-calculator` },
};

export default function SepticTankSizeCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">Free planning tool</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Septic tank size calculator</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Get a rough planning range before requesting installation, replacement, or pumping quotes. Local health departments and permitting rules always control final sizing.
      </p>
      <div className="mt-8"><TankSizeCalculator /></div>
      <section className="mt-12 space-y-6 text-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Why bedroom count matters</h2>
          <p className="mt-3 leading-relaxed">Many jurisdictions size residential septic systems from potential occupancy rather than current household size. Bedrooms are commonly used as a proxy for design flow, which is why a lightly occupied four-bedroom home may still need a larger permitted tank than a two-bedroom home.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Before installation or replacement</h2>
          <p className="mt-3 leading-relaxed">Confirm tank volume, soil evaluation, drain-field sizing, setbacks, and permit requirements with the authority having jurisdiction. Existing systems may also have constraints that make a simple tank-size estimate insufficient.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/septic-installation" className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Septic installation guide</Link>
          <Link href="/service-areas" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Local service areas</Link>
        </div>
      </section>
    </main>
  );
}

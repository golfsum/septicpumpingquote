import type { Metadata } from "next";
import Link from "next/link";
import { PumpingFrequencyCalculator } from "@/components/tools/PumpingFrequencyCalculator";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Septic Pumping Frequency Calculator | How Often to Pump",
  description:
    "Estimate how often your septic tank may need pumping based on household size, tank capacity, garbage-disposal use, and occupancy.",
  alternates: { canonical: `${siteConfig.url}/tools/septic-pumping-frequency-calculator` },
};

export default function PumpingFrequencyCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">Free septic calculator</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Septic pumping frequency calculator</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Estimate a practical pumping interval from the factors that most often affect solids buildup. A professional inspection or sludge measurement is more accurate than any calendar estimate.
      </p>
      <div className="mt-8"><PumpingFrequencyCalculator /></div>
      <section className="mt-12 space-y-6 text-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">What changes pumping frequency?</h2>
          <p className="mt-3 leading-relaxed">Tank size, number of occupants, daily water use, garbage-disposal use, and the amount of non-digestible material entering the system all change how fast sludge and scum accumulate. Smaller tanks serving larger households generally need attention sooner than oversized tanks serving one or two people.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Do not wait for a backup</h2>
          <p className="mt-3 leading-relaxed">Slow drains, gurgling fixtures, sewage odors, surfacing wastewater, or unusually wet ground near the drain field are reasons to request service instead of waiting for the estimated interval.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/septic-pumping" className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Get septic pumping guidance</Link>
          <Link href="/septic-tank-pumping-cost" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Pumping cost guide</Link>
          <Link href="/service-areas" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">Local service areas</Link>
        </div>
      </section>
    </main>
  );
}

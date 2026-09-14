import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Septic Maintenance Schedule | Homeowner Checklist",
  description:
    "Use a simple septic maintenance schedule for pumping, inspections, filters, alarms, water use, and drain-field checks.",
  alternates: { canonical: `${siteConfig.url}/tools/septic-maintenance-schedule` },
};

const schedule = [
  ["Monthly", "Notice slow drains, gurgling, odors, alarms, or unusually wet ground near the tank or drain field. Fix leaking toilets and faucets quickly."],
  ["Every 3–6 months", "Check effluent-filter service needs if your system has one. Review alarm-panel status on pump or aerobic systems."],
  ["Yearly", "Walk the tank and drain-field area for erosion, ponding, vehicle damage, root intrusion, or broken lids and risers."],
  ["Every 1–3 years", "Have systems with pumps, floats, controls, or advanced treatment components inspected according to local requirements and manufacturer guidance."],
  ["Roughly every 3–5 years", "Many conventional household tanks need pumping in this range, but actual timing depends on tank size, occupancy, solids accumulation, and use patterns."],
];

export default function SepticMaintenanceSchedulePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">Homeowner checklist</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Septic maintenance schedule</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">A simple recurring checklist can reduce surprise backups and make service history easier to track. Adjust the schedule for your system type and local rules.</p>
      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {schedule.map(([when, task]) => (
          <div key={when} className="grid gap-2 border-b border-slate-200 p-5 last:border-b-0 sm:grid-cols-[160px_1fr]">
            <h2 className="font-bold text-slate-900">{when}</h2>
            <p className="leading-relaxed text-slate-600">{task}</p>
          </div>
        ))}
      </div>
      <section className="mt-10 rounded-xl bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">Keep a service record</h2>
        <p className="mt-3 leading-relaxed text-slate-600">Record pumping dates, tank size, lid location, filter service, alarm repairs, inspection notes, and the provider used. Those details make future quotes and troubleshooting faster.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/tools/septic-pumping-frequency-calculator" className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Estimate pumping frequency</Link>
          <Link href="/septic-inspection" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Inspection guide</Link>
        </div>
      </section>
    </main>
  );
}

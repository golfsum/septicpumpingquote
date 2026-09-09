import type { Metadata } from "next";
import { ProviderInterestForm } from "@/components/providers/ProviderInterestForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "Septic Leads for Contractors | Join Our Provider Network" },
  description:
    "Join the Septic Pumping Quote provider network to receive local septic pumping, repair, inspection, installation and emergency service leads in your coverage area.",
  alternates: { canonical: `${siteConfig.url}/providers` },
  openGraph: {
    title: "Septic Leads for Contractors | Join Our Provider Network",
    description:
      "Apply to receive local homeowner septic service leads in the areas you already serve.",
    url: `${siteConfig.url}/providers`,
    siteName: siteConfig.name,
    type: "website",
  },
};

const benefits = [
  ["Local fit", "We match by city/service area and requested service before a provider is considered for a lead."],
  ["No forced subscription", "Applying does not lock you into a monthly plan. We can start with a trial or pay-per-lead arrangement."],
  ["You control capacity", "Tell us which services and markets you want. Providers can be paused when crews are full."],
  ["Clear lead details", "Requests include service type, city/ZIP, urgency and homeowner contact information when consent is provided."],
];

export default function ProvidersPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">
              For septic contractors
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Get local septic service leads in the areas you already cover
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Septic Pumping Quote connects homeowners requesting pumping, repairs,
              inspections, installations and urgent septic help with independent local providers.
              We are building our provider network market by market as homeowner demand grows.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map(([title, body]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h2 className="font-semibold text-slate-900">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-900">How provider onboarding works</h2>
              <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                <li>1. Submit your company, service area and services.</li>
                <li>2. We verify basic fit and contact you before sending anything.</li>
                <li>3. Start as a trial provider in selected cities/services.</li>
                <li>4. Continue only if lead quality and economics work for both sides.</li>
              </ol>
            </div>
          </div>

          <ProviderInterestForm />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">Current priority markets</h2>
        <p className="mt-3 text-slate-600">
          We are currently prioritizing provider coverage in Tucson, Phoenix,
          Sacramento and Colorado Springs while expanding based on homeowner search demand.
          Providers outside these markets can still apply and will remain in our prospect queue.
        </p>
      </section>
    </>
  );
}

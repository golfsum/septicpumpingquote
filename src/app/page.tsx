import Link from "next/link";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { SERVICE_OPTIONS } from "@/config/services";
import { getPublishedLocations } from "@/config/locations";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

const howItWorks = [
  {
    title: "Tell us what you need",
    body: "Share your ZIP, the septic service you need, and how soon you need help.",
  },
  {
    title: "We match local providers",
    body: "Your request can be shared with independent septic professionals serving your area.",
  },
  {
    title: "Compare your options",
    body: "Providers may contact you with availability and pricing so you can choose what fits.",
  },
];

const problems = [
  "Sewage backing up into drains",
  "Alarm sounding on the control panel",
  "Standing water near the drain field",
  "Strong odors around the tank or yard",
  "Overdue pumping or unknown tank history",
  "Home sale inspection requirements",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <section className="relative overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 10% 0%, #ccfbf1 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 90% 10%, #dbeafe 0%, transparent 50%), linear-gradient(180deg, #f8fafc 0%, #ffffff 70%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-800">
              {siteConfig.name}
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Get septic service quotes from local professionals
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              Tell us what your septic system needs and request quotes from
              septic service providers serving your area.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="rounded-md bg-white/80 px-3 py-1.5 ring-1 ring-slate-200">
                No-obligation request
              </span>
              <span className="rounded-md bg-white/80 px-3 py-1.5 ring-1 ring-slate-200">
                Local matching
              </span>
              <span className="rounded-md bg-white/80 px-3 py-1.5 ring-1 ring-slate-200">
                Privacy-conscious
              </span>
            </div>
          </div>
          <QuoteForm seoPageId="home" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Common services</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Start with the job you need. Each page explains what to expect and
          includes a quote request form.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_OPTIONS.slice(0, 6).map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-teal-600"
            >
              <h3 className="font-semibold text-slate-900">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {howItWorks.map((item, i) => (
              <div key={item.title}>
                <p className="text-sm font-bold text-teal-700">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Why compare quotes
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Septic work varies by tank access, soil conditions, urgency, and
              system type. Comparing local professionals helps you understand
              availability and pricing before you commit.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li>• Clear request process with no fake ratings or counts</li>
              <li>• Independent providers, not our employees</li>
              <li>• Useful for routine pumping and urgent backups</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Common septic problems
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {problems.map((p) => (
                <li
                  key={p}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-teal-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold">Popular service areas</h2>
          <p className="mt-2 max-w-2xl text-teal-100">
            Tucson is the deepest local cluster. We also publish major-metro hubs
            where septic is common outside city sewer lines.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {getPublishedLocations().map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.stateSlug}/${loc.slug}`}
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
              >
                {loc.name}, {loc.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">
          Cost & maintenance resources
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/septic-tank-pumping-cost"
            className="rounded-xl border border-slate-200 p-5 hover:border-teal-600"
          >
            <h3 className="font-semibold">Septic tank pumping cost</h3>
            <p className="mt-2 text-sm text-slate-600">
              What drives pricing and how to budget for routine service.
            </p>
          </Link>
          <Link
            href="/signs-septic-tank-is-full"
            className="rounded-xl border border-slate-200 p-5 hover:border-teal-600"
          >
            <h3 className="font-semibold">Signs your septic tank is full</h3>
            <p className="mt-2 text-sm text-slate-600">
              Warning signs homeowners should not ignore.
            </p>
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Request your septic quotes
          </h2>
          <p className="mt-2 text-slate-600">
            Start with your ZIP code. It takes about a minute.
          </p>
          <a
            href="#quote"
            className="mt-6 inline-flex rounded-md bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            {siteConfig.primaryCta}
          </a>
        </div>
      </section>
    </>
  );
}

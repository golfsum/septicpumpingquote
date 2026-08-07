import Link from "next/link";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import type { SeoPageContent } from "@/content/seo-pages";
import {
  breadcrumbSchema,
  faqSchema,
  servicePageSchema,
} from "@/lib/seo/schema";

function paragraphs(body: string) {
  return body.split(/\n\n+/).map((p, i) => (
    <p key={i} className="mt-3 text-[15px] leading-relaxed text-slate-700">
      {p}
    </p>
  ));
}

export function SeoPageView({ page }: { page: SeoPageContent }) {
  const crumbs = buildCrumbs(page);
  const schemas = [
    breadcrumbSchema(
      crumbs.map((c) => ({
        name: c.label,
        url: `${siteConfig.url}${c.href === "/" ? "" : c.href}`,
      })),
    ),
    servicePageSchema(page),
    faqSchema(page.faqs),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as object[]} />
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
          <div>
            <nav className="mb-4 flex flex-wrap gap-1 text-xs text-slate-500">
              {crumbs.map((c, i) => (
                <span key={c.href} className="inline-flex items-center gap-1">
                  {i > 0 && <span>/</span>}
                  <Link href={c.href} className="hover:text-teal-800">
                    {c.label}
                  </Link>
                </span>
              ))}
            </nav>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              {page.intro}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>✓ No-obligation quote request</li>
              <li>✓ Compare local septic professionals</li>
              <li>✓ Privacy-conscious handling of your contact details</li>
            </ul>
          </div>
          <QuoteForm
            presetService={page.service}
            presetCity={page.city}
            presetState={page.state || "AZ"}
            seoPageId={page.slug}
            compact
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article>
            {page.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900">
                  {section.heading}
                </h2>
                {paragraphs(section.body)}
              </section>
            ))}

            {page.faqs.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900">
                  Frequently asked questions
                </h2>
                <div className="mt-4 space-y-4">
                  {page.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <summary className="cursor-pointer font-semibold text-slate-900">
                        {faq.question}
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-xl bg-teal-850 bg-slate-900 px-6 py-8 text-white">
              <h2 className="text-2xl font-bold">Ready to request quotes?</h2>
              <p className="mt-2 max-w-xl text-sm text-slate-200">
                Tell us what your septic system needs and request quotes from
                providers serving your area.
              </p>
              <a
                href="#quote"
                className="mt-5 inline-flex rounded-md bg-teal-500 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-400"
              >
                {siteConfig.primaryCta}
              </a>
            </section>
          </article>

          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Related pages
              </p>
              <ul className="mt-3 space-y-2 text-sm text-teal-800">
                {page.internalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function buildCrumbs(page: SeoPageContent) {
  const crumbs = [{ href: "/", label: "Home" }];
  const parts = page.slug.split("/");
  if (parts[0] === "az" && parts[1]) {
    crumbs.push({ href: `/az/${parts[1]}`, label: page.city || parts[1] });
    if (parts[2]) {
      crumbs.push({
        href: `/${page.slug}`,
        label: page.service?.replace(/-/g, " ") || parts[2],
      });
    }
  } else {
    crumbs.push({ href: `/${page.slug}`, label: page.h1 });
  }
  return crumbs;
}

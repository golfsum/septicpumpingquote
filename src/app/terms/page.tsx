import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
      <p className="mt-4 text-slate-700 leading-relaxed">
        {siteConfig.domain} provides an online platform for homeowners to request
        septic service quotes and for us to help match those requests with
        independent service providers. We are not a septic contractor and do not
        perform pumping, repair, inspection, or installation work ourselves.
      </p>
      <p className="mt-4 text-slate-700 leading-relaxed">
        Providers you may hear from are independent businesses. We do not
        guarantee pricing, availability, licensing status, or workmanship. You
        are responsible for verifying credentials and agreeing to any contract
        directly with a provider.
      </p>
      <p className="mt-4 text-slate-700 leading-relaxed">
        Businesses that apply to join the provider network are submitting their
        information for review only. An application does not guarantee approval,
        lead volume, exclusivity, pricing, or any minimum amount of business. We
        may verify submitted business information before activating lead routing,
        and either party may stop a trial or provider relationship at any time
        unless a separate written agreement says otherwise.
      </p>
      <p className="mt-4 text-slate-700 leading-relaxed">
        Site content is for general information and is not professional
        engineering, legal, or safety advice. In emergencies involving sewage
        backups or health hazards, contact local emergency services or a
        qualified professional immediately.
      </p>
      <p className="mt-4 text-slate-700">
        Contact:{" "}
        <a className="text-teal-800" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
      </p>
    </div>
  );
}

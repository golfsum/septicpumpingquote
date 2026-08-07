import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-slate">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-4 text-slate-700 leading-relaxed">
        {siteConfig.name} ({siteConfig.domain}) operates a quote-request and
        contractor matching service. When you submit a quote request, we collect
        the information you provide (such as name, phone, email, location, and
        service details) so we can respond and, where appropriate, share your
        request with independent septic service providers who may contact you.
      </p>
      <h2 className="mt-8 text-xl font-semibold">What we collect</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        <li>Contact and location details you submit in forms</li>
        <li>Service preferences, urgency, and optional problem details</li>
        <li>
          Attribution data such as landing page, referrer, and UTM parameters
        </li>
        <li>Basic device/browser analytics when configured (e.g. GA4)</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold">How we use information</h2>
      <p className="mt-3 text-slate-700 leading-relaxed">
        We use your information to process quote requests, improve the site,
        measure marketing performance, prevent spam/fraud, and communicate about
        your request. We do not sell personal information as a consumer data
        broker product beyond connecting you with service providers you asked to
        hear from regarding septic services.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Contact</h2>
      <p className="mt-3 text-slate-700">
        Questions:{" "}
        <a className="text-teal-800" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
      </p>
    </div>
  );
}

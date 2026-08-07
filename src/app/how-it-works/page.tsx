import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">How it works</h1>
          <ol className="mt-6 space-y-5">
            <li>
              <h2 className="font-semibold">1. Submit a short request</h2>
              <p className="mt-1 text-slate-600">
                Share your ZIP, the septic service you need, timing, and a way
                to reach you.
              </p>
            </li>
            <li>
              <h2 className="font-semibold">2. We review and match</h2>
              <p className="mt-1 text-slate-600">
                Your request can be routed to independent providers who cover
                your area and offer that service.
              </p>
            </li>
            <li>
              <h2 className="font-semibold">3. Providers may contact you</h2>
              <p className="mt-1 text-slate-600">
                Compare availability and pricing directly with the professionals
                who reach out. There is no obligation to hire.
              </p>
            </li>
          </ol>
          <p className="mt-6 text-sm text-slate-500">
            Providers are not our employees. Always verify licenses and insurance
            for your local requirements.
          </p>
        </div>
        <QuoteForm seoPageId="how-it-works" />
      </div>
    </div>
  );
}

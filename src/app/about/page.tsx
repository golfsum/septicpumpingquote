import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">About {siteConfig.name}</h1>
      <p className="mt-4 text-lg text-slate-700 leading-relaxed">
        {siteConfig.tagline}
      </p>
      <p className="mt-4 text-slate-700 leading-relaxed">
        Homeowners searching for septic pumping, repair, inspection, or
        emergency help often land on thin directory pages or contractor sites
        that are hard to compare. We built this platform to make the request
        process simple and transparent: tell us what you need, and we can
        connect you with independent septic professionals serving your area.
      </p>
      <p className="mt-4 text-slate-700 leading-relaxed">
        We are starting with a focused Tucson, Arizona service cluster and
        expanding based on real search demand and lead quality, not mass-produced
        city pages.
      </p>
    </div>
  );
}

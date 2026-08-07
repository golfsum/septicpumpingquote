"use client";

import { siteConfig } from "@/config/site";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-lg md:hidden">
      <a
        href="#quote"
        className="flex w-full items-center justify-center rounded-md bg-teal-700 px-4 py-3 text-sm font-semibold text-white"
      >
        Get a Septic Quote
      </a>
      <p className="mt-1 text-center text-[11px] text-slate-500">
        {siteConfig.secondaryCta}
      </p>
    </div>
  );
}

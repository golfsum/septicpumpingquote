import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="mt-4 text-slate-700 leading-relaxed">
        For homeowner quote requests, use the{" "}
        <Link href="/#quote" className="text-teal-800 underline">
          Get Septic Quotes
        </Link>{" "}
        form on any service page.
      </p>
      <p className="mt-4 text-slate-700">
        General inquiries and provider partnership:{" "}
        <a className="text-teal-800" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
      </p>
    </div>
  );
}

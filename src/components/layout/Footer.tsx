import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-bold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            {siteConfig.tagline} We connect homeowners with independent septic
            service providers. Providers are not our employees.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Services</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/septic-pumping">Septic pumping</Link>
            </li>
            <li>
              <Link href="/septic-repair">Septic repair</Link>
            </li>
            <li>
              <Link href="/emergency-septic-service">Emergency service</Link>
            </li>
            <li>
              <Link href="/drain-field-repair">Drain field repair</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/how-it-works">How it works</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.domain}. Quote request platform.
      </div>
    </footer>
  );
}

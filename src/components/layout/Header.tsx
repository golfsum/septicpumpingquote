import Link from "next/link";
import { siteConfig } from "@/config/site";

const nav = [
  { href: "/septic-pumping", label: "Pumping" },
  { href: "/septic-repair", label: "Repair" },
  { href: "/emergency-septic-service", label: "Emergency" },
  { href: "/septic-inspection", label: "Inspection" },
  { href: "/az/tucson", label: "Tucson" },
  { href: "/how-it-works", label: "How it works" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="min-w-0">
          <span className="block text-lg font-bold tracking-tight text-slate-900">
            {siteConfig.name}
          </span>
          <span className="hidden text-xs text-slate-500 sm:block">
            Local septic quote matching
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-teal-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#quote"
          className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          {siteConfig.primaryCta}
        </Link>
      </div>
    </header>
  );
}

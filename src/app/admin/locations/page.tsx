import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { LOCATION_OPTIONS } from "@/config/locations";
import { getPublishedSeoPages } from "@/content/seo-pages";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export default async function AdminLocationsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const pages = getPublishedSeoPages();

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Locations</h1>
      <p className="text-sm text-slate-600">
        Tucson-area launch cluster. Do not mass-publish thin city pages.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {LOCATION_OPTIONS.map((loc) => {
          const cityPages = pages.filter(
            (p) => p.city?.toLowerCase() === loc.name.toLowerCase(),
          );
          return (
            <div
              key={loc.slug}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {loc.name}, {loc.state}
                  </h2>
                  <p className="text-xs text-slate-500">
                    ZIPs: {loc.zipExamples.join(", ")}
                  </p>
                </div>
                <Link
                  href={`/az/${loc.slug}`}
                  className="text-sm text-teal-800 hover:underline"
                >
                  Hub
                </Link>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {loc.localNotes}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase text-slate-500">
                Published pages: {cityPages.length}
              </p>
              <ul className="mt-1 space-y-1 text-sm text-teal-800">
                {cityPages.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}`}>/{p.slug}</Link>
                  </li>
                ))}
                {!cityPages.length && (
                  <li className="text-slate-500">
                    No city pages yet — add only with unique content.
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}

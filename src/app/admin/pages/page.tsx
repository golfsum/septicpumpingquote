import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { leadsByLandingPage } from "@/lib/analytics/overview";
import { getPublishedSeoPages } from "@/content/seo-pages";
import { getStoredSeoMetrics } from "@/lib/gsc/client";
import { listLeads } from "@/lib/leads/service";

export default async function AdminPagesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const pages = getPublishedSeoPages();
  const metrics = await getStoredSeoMetrics();
  const leads = await listLeads();
  const leadMap = leadsByLandingPage(leads);

  const metricByPath = new Map<
    string,
    { clicks: number; impressions: number; ctr: number; position: number; n: number }
  >();
  for (const m of metrics) {
    const path = m.page.replace(/^https?:\/\/[^/]+/, "") || "/";
    const cur = metricByPath.get(path) || {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
      n: 0,
    };
    cur.clicks += m.clicks;
    cur.impressions += m.impressions;
    cur.ctr += m.ctr;
    cur.position += m.position;
    cur.n += 1;
    metricByPath.set(path, cur);
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
      <p className="text-sm text-slate-600">
        SEO page inventory with Search Console + lead attribution.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {[
                "URL",
                "Type",
                "Keyword",
                "Index",
                "Clicks",
                "Impr",
                "CTR",
                "Pos",
                "Leads",
                "CVR",
              ].map((h) => (
                <th key={h} className="px-3 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => {
              const path = `/${p.slug}`;
              const m = metricByPath.get(path);
              const leadCount = leadMap[path] || leadMap[p.slug] || 0;
              const clicks = m?.clicks || 0;
              const cvr = clicks ? leadCount / clicks : 0;
              return (
                <tr key={p.slug} className="border-t border-slate-100">
                  <td className="px-3 py-2">
                    <Link
                      href={path}
                      className="text-teal-800 hover:underline"
                      target="_blank"
                    >
                      {path}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{p.pageType}</td>
                  <td className="px-3 py-2">{p.primaryKeyword}</td>
                  <td className="px-3 py-2">{p.indexStatus}</td>
                  <td className="px-3 py-2">{clicks}</td>
                  <td className="px-3 py-2">{m?.impressions || 0}</td>
                  <td className="px-3 py-2">
                    {m?.n
                      ? `${(((m.ctr / m.n) <= 1 ? (m.ctr / m.n) * 100 : m.ctr / m.n)).toFixed(1)}%`
                      : "—"}
                  </td>
                  <td className="px-3 py-2">
                    {m?.n ? (m.position / m.n).toFixed(1) : "—"}
                  </td>
                  <td className="px-3 py-2">{leadCount}</td>
                  <td className="px-3 py-2">{(cvr * 100).toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

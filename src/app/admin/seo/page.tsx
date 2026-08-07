import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { GscSyncButton } from "@/components/admin/GscSyncButton";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { leadsByLandingPage } from "@/lib/analytics/overview";
import { getStoredSeoMetrics } from "@/lib/gsc/client";
import { listLeads } from "@/lib/leads/service";
import { buildOpportunityRows } from "@/lib/seo/opportunities";
import { localGetSettings } from "@/lib/store/local-db";

export default async function AdminSeoPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const metrics = await getStoredSeoMetrics();
  const leads = await listLeads();
  const settings = await localGetSettings();
  const opportunities = buildOpportunityRows(
    metrics.map((m) => ({
      query: m.query,
      page: m.page,
      clicks: m.clicks,
      impressions: m.impressions,
      ctr: m.ctr,
      position: m.position,
    })),
    leadsByLandingPage(leads),
  );

  const byPage = new Map<
    string,
    { clicks: number; impressions: number; pos: number; n: number }
  >();
  for (const m of metrics) {
    const path = m.page.replace(/^https?:\/\/[^/]+/, "") || "/";
    const cur = byPage.get(path) || {
      clicks: 0,
      impressions: 0,
      pos: 0,
      n: 0,
    };
    cur.clicks += m.clicks;
    cur.impressions += m.impressions;
    cur.pos += m.position;
    cur.n += 1;
    byPage.set(path, cur);
  }

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SEO Performance</h1>
          <p className="text-sm text-slate-600">
            Last sync: {settings.gscLastSync || "never"} · Property:{" "}
            {settings.gscProperty || process.env.GSC_PROPERTY || "not set"}
          </p>
        </div>
        <GscSyncButton />
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Without GSC credentials, sync loads sample Tucson opportunity data so
        you can validate the dashboard. Connect Search Console for live metrics.
      </p>

      <h2 className="mt-8 text-lg font-semibold">SEO opportunities</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {[
                "Query",
                "Pos",
                "Impr",
                "Clicks",
                "CTR",
                "Leads",
                "CVR",
                "Status",
                "Action",
              ].map((h) => (
                <th key={h} className="px-3 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {opportunities.map((o) => (
              <tr key={o.query} className="border-t border-slate-100">
                <td className="px-3 py-2 font-medium">{o.query}</td>
                <td className="px-3 py-2">{o.position.toFixed(1)}</td>
                <td className="px-3 py-2">{o.impressions}</td>
                <td className="px-3 py-2">{o.clicks}</td>
                <td className="px-3 py-2">
                  {((o.ctr <= 1 ? o.ctr * 100 : o.ctr)).toFixed(1)}%
                </td>
                <td className="px-3 py-2">{o.leads}</td>
                <td className="px-3 py-2">
                  {(o.pageConversionRate * 100).toFixed(1)}%
                </td>
                <td className="px-3 py-2">
                  <span className="rounded bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800">
                    {o.category}
                  </span>
                </td>
                <td className="px-3 py-2 max-w-xs text-xs text-slate-600">
                  {o.action}
                </td>
              </tr>
            ))}
            {!opportunities.length && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-slate-500">
                  Sync Search Console to populate opportunities.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Page performance</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {["Page", "Clicks", "Impressions", "Avg position", "Leads"].map(
                (h) => (
                  <th key={h} className="px-3 py-2">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {[...byPage.entries()].map(([page, row]) => {
              const leadMap = leadsByLandingPage(leads);
              return (
                <tr key={page} className="border-t border-slate-100">
                  <td className="px-3 py-2">{page}</td>
                  <td className="px-3 py-2">{row.clicks}</td>
                  <td className="px-3 py-2">{row.impressions}</td>
                  <td className="px-3 py-2">
                    {row.n ? (row.pos / row.n).toFixed(1) : "—"}
                  </td>
                  <td className="px-3 py-2">{leadMap[page] || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

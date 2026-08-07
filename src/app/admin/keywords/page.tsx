import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SEED_KEYWORDS } from "@/content/keywords";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getStoredSeoMetrics } from "@/lib/gsc/client";

export default async function AdminKeywordsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const metrics = await getStoredSeoMetrics();

  const rows = SEED_KEYWORDS.map((kw) => {
    const matches = metrics.filter(
      (m) => m.query.toLowerCase() === kw.keyword.toLowerCase(),
    );
    const impressions = matches.reduce((s, m) => s + m.impressions, 0);
    const clicks = matches.reduce((s, m) => s + m.clicks, 0);
    const position = matches.length
      ? matches.reduce((s, m) => s + m.position, 0) / matches.length
      : 0;
    const ctr = impressions ? clicks / impressions : 0;
    return { ...kw, impressions, clicks, ctr, position };
  });

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Keywords</h1>
      <p className="text-sm text-slate-600">
        Manual keyword map enriched with Search Console when available. Search
        volume estimates are not invented.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {[
                "Keyword",
                "Intent",
                "Priority",
                "Landing",
                "Impr",
                "Clicks",
                "CTR",
                "Pos",
                "Notes",
              ].map((h) => (
                <th key={h} className="px-3 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.keyword} className="border-t border-slate-100">
                <td className="px-3 py-2 font-medium">{r.keyword}</td>
                <td className="px-3 py-2">{r.intent}</td>
                <td className="px-3 py-2">{r.priority}</td>
                <td className="px-3 py-2">{r.landingPage}</td>
                <td className="px-3 py-2">{r.impressions}</td>
                <td className="px-3 py-2">{r.clicks}</td>
                <td className="px-3 py-2">{(r.ctr * 100).toFixed(1)}%</td>
                <td className="px-3 py-2">
                  {r.position ? r.position.toFixed(1) : "—"}
                </td>
                <td className="px-3 py-2 text-xs text-slate-600">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

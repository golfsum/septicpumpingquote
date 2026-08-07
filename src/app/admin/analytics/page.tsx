import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { listLeads } from "@/lib/leads/service";
import { localGetFunnelEvents } from "@/lib/store/local-db";

export default async function AdminAnalyticsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [leads, events] = await Promise.all([
    listLeads(),
    localGetFunnelEvents(),
  ]);

  const steps = [
    "quote_form_view",
    "quote_started",
    "quote_step_completed",
    "quote_submitted",
    "lead_created",
  ] as const;

  const counts = Object.fromEntries(
    steps.map((s) => [s, events.filter((e) => e.event === s).length]),
  ) as Record<(typeof steps)[number], number>;

  // Approximate abandonment from client events when present; otherwise lead count.
  const started = counts.quote_started || leads.length;
  const submitted = counts.quote_submitted || leads.length;

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
      <p className="text-sm text-slate-600">
        Funnel events via GA4/GTM on the client. Local event log is optional
        storage for admin views.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Leads stored</p>
          <p className="mt-2 text-2xl font-bold">{leads.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Form views (logged)</p>
          <p className="mt-2 text-2xl font-bold">{counts.quote_form_view}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Submit rate (approx)</p>
          <p className="mt-2 text-2xl font-bold">
            {started ? `${((submitted / started) * 100).toFixed(1)}%` : "—"}
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Funnel steps</h2>
      <ul className="mt-3 space-y-2">
        {steps.map((step) => (
          <li
            key={step}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
          >
            <span>{step}</span>
            <strong>{counts[step]}</strong>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-semibold">Traffic source mix</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {Object.entries(
          leads.reduce<Record<string, number>>((acc, l) => {
            acc[l.trafficSource] = (acc[l.trafficSource] || 0) + 1;
            return acc;
          }, {}),
        ).map(([source, count]) => (
          <li
            key={source}
            className="flex justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <span>{source}</span>
            <strong>{count}</strong>
          </li>
        ))}
        {!leads.length && (
          <li className="text-slate-500">No leads yet for source breakdown.</li>
        )}
      </ul>
    </AdminShell>
  );
}

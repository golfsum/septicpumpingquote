import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { computeOverview } from "@/lib/analytics/overview";
import { probeFirestore } from "@/lib/firebase/admin";
import { listLeads } from "@/lib/leads/service";
import { localGetSettings } from "@/lib/store/local-db";
import type { Lead } from "@/lib/types";
import { redirect } from "next/navigation";
import { OverviewCharts } from "@/components/admin/OverviewCharts";

export default async function AdminOverviewPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  let firestoreWarning: string | null = null;
  let leads: Lead[] = [];
  try {
    leads = await listLeads();
  } catch (error) {
    console.error("Admin overview leads failed", error);
    leads = [];
  }

  const probe = await probeFirestore();
  if (!probe.ok) {
    firestoreWarning = `Firestore is not reachable (database "${probe.databaseId}"): ${probe.error}. Create a Firestore DB in Firebase Console, or set FIRESTORE_DATABASE_ID to your DB id (use default or (default)).`;
  }

  const settings = await localGetSettings();
  const overview = computeOverview(leads, settings.estimatedLeadValue);

  const cards = [
    { label: "Leads today", value: overview.leadsToday },
    { label: "Last 7 days", value: overview.leads7 },
    { label: "Last 30 days", value: overview.leads30 },
    { label: "Qualified", value: overview.qualified },
    {
      label: "Conversion rate",
      value: `${(overview.conversionRate * 100).toFixed(1)}%`,
    },
    { label: "Organic (30d)", value: overview.organic },
    { label: "Paid (30d)", value: overview.paid },
    { label: "Direct (30d)", value: overview.direct },
    {
      label: "Est. lead value (30d)",
      value: `$${overview.estimatedValue.toLocaleString()}`,
    },
  ];

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
      <p className="mt-1 text-sm text-slate-600">
        Lead and SEO performance snapshot for septicpumpingquote.com
      </p>
      {firestoreWarning && (
        <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {firestoreWarning}
        </div>
      )}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {c.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold">Top converting signals</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Top service: {overview.topService}</li>
            <li>Top city: {overview.topCity}</li>
            <li>Top landing page: {overview.topLanding}</li>
            <li>Top SEO page: {overview.topSeoPage}</li>
          </ul>
        </div>
        <OverviewCharts trend={overview.trend} />
      </div>
    </AdminShell>
  );
}

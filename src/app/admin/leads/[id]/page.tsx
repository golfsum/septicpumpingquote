import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { LeadDetailActions } from "@/components/admin/LeadDetailActions";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getLead } from "@/lib/leads/service";
import { listProviders, matchProvidersForLead } from "@/lib/providers/service";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();
  const providers = await listProviders();
  const matches = matchProvidersForLead(lead, providers);

  return (
    <AdminShell>
      <Link href="/admin/leads" className="text-sm text-teal-800 hover:underline">
        ← Back to leads
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">
        {lead.firstName} {lead.lastName}
      </h1>
      <p className="text-sm text-slate-600">
        {lead.service} · {lead.urgency} · {lead.status}
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold">Contact</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>
              Phone:{" "}
              {lead.phone ? (
                <a className="text-teal-800" href={`tel:${lead.phone}`}>
                  {lead.phone}
                </a>
              ) : (
                "—"
              )}
            </li>
            <li>Email: {lead.email || "—"}</li>
            <li>
              Location: {lead.city}, {lead.state} {lead.zip}
            </li>
          </ul>
          <h2 className="mt-5 font-semibold">Request</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>Service: {lead.service}</li>
            <li>Urgency: {lead.urgency}</li>
            <li>Notes: {lead.freeformNotes || "—"}</li>
            <li>
              Details:{" "}
              <pre className="mt-1 overflow-auto rounded bg-slate-50 p-2 text-xs">
                {JSON.stringify(lead.problemDetails, null, 2)}
              </pre>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-semibold">Attribution</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>Landing: {lead.attribution.landingPage}</li>
            <li>First touch: {lead.attribution.firstTouchPage}</li>
            <li>Current: {lead.attribution.currentPage}</li>
            <li>SEO page: {lead.attribution.seoPageId}</li>
            <li>Referrer: {lead.attribution.referrer || "—"}</li>
            <li>
              UTM: {lead.attribution.utm_source || "—"} /{" "}
              {lead.attribution.utm_medium || "—"} /{" "}
              {lead.attribution.utm_campaign || "—"}
            </li>
            <li>gclid: {lead.attribution.gclid || "—"}</li>
            <li>Source: {lead.trafficSource}</li>
            <li>Device: {lead.attribution.deviceType}</li>
          </ul>
          <h2 className="mt-5 font-semibold">Status history</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {lead.statusHistory.map((s, i) => (
              <li key={i} className="rounded bg-slate-50 px-2 py-1">
                {s.at}: <strong>{s.status}</strong> {s.note || ""}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <LeadDetailActions lead={lead} matches={matches} />
    </AdminShell>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { listLeads } from "@/lib/leads/service";
import {
  listAssignments,
  listProviders,
  matchProvidersForLead,
} from "@/lib/providers/service";

export default async function AdminRoutingPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [leads, providers, assignments] = await Promise.all([
    listLeads(),
    listProviders(),
    listAssignments(),
  ]);
  const openLeads = leads.filter((l) =>
    ["new", "reviewed", "qualified", "contacted"].includes(l.status),
  );

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Lead routing</h1>
      <p className="text-sm text-slate-600">
        Manual approval preferred. Matching uses service + city/ZIP coverage.
      </p>

      <h2 className="mt-6 text-lg font-semibold">Open leads needing routing</h2>
      <div className="mt-3 space-y-3">
        {openLeads.map((lead) => {
          const matches = matchProvidersForLead(lead, providers);
          return (
            <div
              key={lead.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {lead.firstName} {lead.lastName} · {lead.service}
                  </p>
                  <p className="text-sm text-slate-600">
                    {lead.city}, {lead.state} {lead.zip} · {lead.urgency}
                  </p>
                </div>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="text-sm font-medium text-teal-800 hover:underline"
                >
                  Open & assign
                </Link>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                Matching providers: {matches.length}
                {matches.length
                  ? ` (${matches.map((m) => m.companyName).join(", ")})`
                  : " — add active providers covering this area"}
              </p>
            </div>
          );
        })}
        {!openLeads.length && (
          <p className="text-sm text-slate-500">No open leads to route.</p>
        )}
      </div>

      <h2 className="mt-8 text-lg font-semibold">Assignment log</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {["Sent", "Lead", "Provider", "Price", "Status"].map((h) => (
                <th key={h} className="px-3 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{a.sentAt}</td>
                <td className="px-3 py-2">
                  <Link
                    href={`/admin/leads/${a.leadId}`}
                    className="text-teal-800 hover:underline"
                  >
                    {a.leadId.slice(0, 8)}
                  </Link>
                </td>
                <td className="px-3 py-2">{a.providerName}</td>
                <td className="px-3 py-2">
                  {a.price != null ? `$${a.price}` : "—"}
                </td>
                <td className="px-3 py-2">{a.status}</td>
              </tr>
            ))}
            {!assignments.length && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-slate-500">
                  No assignments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

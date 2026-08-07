import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { listLeads } from "@/lib/leads/service";
import { format } from "date-fns";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const params = await searchParams;
  let leads = await listLeads();

  if (params.status) leads = leads.filter((l) => l.status === params.status);
  if (params.service)
    leads = leads.filter((l) => l.service === params.service);
  if (params.city)
    leads = leads.filter(
      (l) => l.city.toLowerCase() === params.city!.toLowerCase(),
    );
  if (params.source)
    leads = leads.filter((l) => l.trafficSource === params.source);

  return (
    <AdminShell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-600">{leads.length} matching leads</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- API CSV download */}
        <a
          href="/api/admin/leads?format=csv"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Export CSV
        </a>
      </div>

      <form className="mt-4 grid gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-5">
        <input
          name="city"
          placeholder="City"
          defaultValue={params.city || ""}
          className="rounded-md border border-slate-300 px-2 py-2 text-sm"
        />
        <input
          name="service"
          placeholder="Service slug"
          defaultValue={params.service || ""}
          className="rounded-md border border-slate-300 px-2 py-2 text-sm"
        />
        <select
          name="status"
          defaultValue={params.status || ""}
          className="rounded-md border border-slate-300 px-2 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {[
            "new",
            "reviewed",
            "qualified",
            "contacted",
            "sent_to_provider",
            "accepted",
            "sold",
            "invalid",
            "duplicate",
            "closed",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          name="source"
          defaultValue={params.source || ""}
          className="rounded-md border border-slate-300 px-2 py-2 text-sm"
        >
          <option value="">All sources</option>
          {["organic", "paid", "direct", "referral", "campaign"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white"
        >
          Filter
        </button>
      </form>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {[
                "Date",
                "Name",
                "Phone",
                "Email",
                "City",
                "Service",
                "Urgency",
                "Source",
                "Landing",
                "Status",
                "Provider",
              ].map((h) => (
                <th key={h} className="px-3 py-2 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2 whitespace-nowrap">
                  <Link
                    href={`/admin/leads/${l.id}`}
                    className="font-medium text-teal-800 hover:underline"
                  >
                    {format(new Date(l.createdAt), "MMM d, yyyy HH:mm")}
                  </Link>
                </td>
                <td className="px-3 py-2">
                  {l.firstName} {l.lastName}
                </td>
                <td className="px-3 py-2">
                  {l.phone ? (
                    <a href={`tel:${l.phone}`} className="text-teal-800">
                      {l.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2">{l.email || "—"}</td>
                <td className="px-3 py-2">
                  {l.city}, {l.state} {l.zip}
                </td>
                <td className="px-3 py-2">{l.service}</td>
                <td className="px-3 py-2">{l.urgency}</td>
                <td className="px-3 py-2">{l.trafficSource}</td>
                <td className="px-3 py-2 max-w-[160px] truncate">
                  {l.attribution.landingPage}
                </td>
                <td className="px-3 py-2">{l.status}</td>
                <td className="px-3 py-2">
                  {l.assignedProviderName || "—"}
                </td>
              </tr>
            ))}
            {!leads.length && (
              <tr>
                <td colSpan={11} className="px-3 py-8 text-center text-slate-500">
                  No leads yet. Submit a quote on the public site to test.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

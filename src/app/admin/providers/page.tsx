import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProviderManager } from "@/components/admin/ProviderManager";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { listProviders } from "@/lib/providers/service";

export default async function AdminProvidersPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const providers = await listProviders();

  const byStatus = providers.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Providers</h1>
      <p className="text-sm text-slate-600">
        Contractor directory + prospecting. No scraping — manual/CSV/API later.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {Object.entries(byStatus).map(([status, count]) => (
          <span
            key={status}
            className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200"
          >
            {status}: {count}
          </span>
        ))}
        {!providers.length && (
          <span className="text-slate-500">No providers yet</span>
        )}
      </div>
      <ProviderManager initialProviders={providers} />
    </AdminShell>
  );
}

import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { isGscConfigured } from "@/lib/gsc/client";
import { localGetSettings } from "@/lib/store/local-db";

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const settings = await localGetSettings();

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <StatusCard
          label="Firebase Admin"
          ok={isFirebaseAdminConfigured()}
          detail={
            isFirebaseAdminConfigured()
              ? "Using Firestore"
              : "Using local data/ store"
          }
        />
        <StatusCard
          label="Search Console API"
          ok={isGscConfigured()}
          detail={
            isGscConfigured() ? "Credentials present" : "Demo sync available"
          }
        />
        <StatusCard
          label="GA4"
          ok={Boolean(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID)}
          detail={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "Not set"}
        />
      </div>
      <SettingsForm initial={settings} />
    </AdminShell>
  );
}

function StatusCard({
  label,
  ok,
  detail,
}: {
  label: string;
  ok: boolean;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs uppercase text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-900">
        {ok ? "Connected" : "Not configured"}
      </p>
      <p className="mt-1 text-xs text-slate-600">{detail}</p>
    </div>
  );
}

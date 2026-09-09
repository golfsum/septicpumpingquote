"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Provider, ProviderStatus } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { PROVIDER_PROSPECTS, type ProviderProspect } from "@/content/provider-prospects";

const STATUSES: ProviderStatus[] = [
  "prospect",
  "contacted",
  "trial",
  "active",
  "paused",
  "inactive",
];

export function ProviderManager({
  initialProviders,
}: {
  initialProviders: Provider[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState("");
  const [market, setMarket] = useState("Tucson, AZ");
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    website: "",
    city: "Tucson",
    state: "AZ",
    zip: "",
    servicesOffered: "septic-pumping,septic-repair",
    serviceAreaCities: "Tucson,Marana,Sahuarita,Vail,Catalina,Oro Valley",
    notes: "",
    status: "prospect",
  });

  const existingKeys = useMemo(
    () =>
      new Set(
        initialProviders.map(
          (p) => `${p.companyName.toLowerCase()}|${p.city.toLowerCase()}`,
        ),
      ),
    [initialProviders],
  );

  const markets = useMemo(
    () =>
      Array.from(
        new Set(PROVIDER_PROSPECTS.map((p) => `${p.city}, ${p.state}`)),
      ),
    [],
  );

  const marketProspects = PROVIDER_PROSPECTS.filter(
    (p) => `${p.city}, ${p.state}` === market,
  );

  async function createProvider(e: React.FormEvent) {
    e.preventDefault();
    setSaving("manual");
    await fetch("/api/admin/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        servicesOffered: form.servicesOffered
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        serviceAreaCities: form.serviceAreaCities
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        active: form.status === "active" || form.status === "trial",
      }),
    });
    setSaving("");
    router.refresh();
  }

  async function addProspect(prospect: ProviderProspect) {
    const key = `${prospect.companyName.toLowerCase()}|${prospect.city.toLowerCase()}`;
    if (existingKeys.has(key)) return;
    setSaving(key);
    const response = await fetch("/api/admin/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: prospect.companyName,
        phone: prospect.phone,
        email: prospect.email || "",
        website: prospect.website || "",
        city: prospect.city,
        state: prospect.state,
        zip: prospect.zip || "",
        servicesOffered: prospect.servicesOffered,
        serviceAreaCities: prospect.serviceAreaCities,
        emergencyService: Boolean(prospect.emergencyService),
        notes: `${prospect.notes || ""} Source: ${prospect.sourceLabel} - ${prospect.sourceUrl}`,
        status: "prospect",
        active: false,
        preferredContactMethod: prospect.email ? "either" : "phone",
        contactStatus: "new",
      }),
    });
    setSaving("");
    if (response.ok) router.refresh();
  }

  async function addAllVisibleProspects() {
    setSaving("bulk");
    for (const prospect of marketProspects) {
      const key = `${prospect.companyName.toLowerCase()}|${prospect.city.toLowerCase()}`;
      if (existingKeys.has(key)) continue;
      await fetch("/api/admin/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: prospect.companyName,
          phone: prospect.phone,
          email: prospect.email || "",
          website: prospect.website || "",
          city: prospect.city,
          state: prospect.state,
          zip: prospect.zip || "",
          servicesOffered: prospect.servicesOffered,
          serviceAreaCities: prospect.serviceAreaCities,
          emergencyService: Boolean(prospect.emergencyService),
          notes: `${prospect.notes || ""} Source: ${prospect.sourceLabel} - ${prospect.sourceUrl}`,
          status: "prospect",
          active: false,
          preferredContactMethod: prospect.email ? "either" : "phone",
          contactStatus: "new",
        }),
      });
    }
    setSaving("");
    router.refresh();
  }

  async function updateStatus(provider: Provider, status: ProviderStatus) {
    setSaving(provider.id);
    await fetch("/api/admin/providers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: provider.id,
        patch: {
          status,
          active: status === "active" || status === "trial",
          contactStatus:
            status === "contacted" && provider.contactStatus === "new"
              ? "contacted"
              : provider.contactStatus,
        },
      }),
    });
    setSaving("");
    router.refresh();
  }

  return (
    <div className="mt-6 space-y-6">
      <section className="rounded-xl border border-teal-200 bg-teal-50 p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">Starter provider prospects</h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              Pre-researched prospects for markets already receiving Search Console impressions.
              Add them as prospects, verify fit/contact details, then move them through contacted,
              trial and active. Prospects never receive leads until you mark them trial or active.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-sm">
              Market
              <select
                className="mt-1 block rounded-md border border-slate-300 bg-white px-2 py-1.5"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
              >
                {markets.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <Button
              type="button"
              onClick={addAllVisibleProspects}
              disabled={saving === "bulk"}
            >
              {saving === "bulk" ? "Adding…" : "Add all in market"}
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {marketProspects.map((p) => {
            const key = `${p.companyName.toLowerCase()}|${p.city.toLowerCase()}`;
            const added = existingKeys.has(key);
            return (
              <div key={key} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{p.companyName}</p>
                    <p className="text-xs text-slate-500">{p.city}, {p.state}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600">
                    {p.sourceLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-700">{p.phone}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.notes}</p>
                <div className="mt-3 flex gap-2">
                  <Button
                    type="button"
                    onClick={() => addProspect(p)}
                    disabled={added || saving === key}
                  >
                    {added ? "Added" : saving === key ? "Adding…" : "Add prospect"}
                  </Button>
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Verify source
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <form
          onSubmit={createProvider}
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
        >
          <h2 className="font-semibold">Add provider / prospect</h2>
          {(
            [
              ["companyName", "Company"],
              ["contactName", "Contact"],
              ["phone", "Phone"],
              ["email", "Email"],
              ["website", "Website"],
              ["city", "City"],
              ["state", "State"],
              ["zip", "ZIP"],
              ["servicesOffered", "Services (comma)"],
              ["serviceAreaCities", "Cities (comma)"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm">
              {label}
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5"
                value={form[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                required={key === "companyName"}
              />
            </label>
          ))}
          <label className="block text-sm">
            Status
            <select
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Notes
            <textarea
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </label>
          <Button type="submit" className="w-full" disabled={saving === "manual"}>
            {saving === "manual" ? "Saving…" : "Save provider"}
          </Button>
        </form>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {["Business", "City", "Phone", "Website", "Services", "Status", "Notes"].map((h) => (
                  <th key={h} className="px-3 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {initialProviders.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 align-top">
                  <td className="px-3 py-2 font-medium">{p.companyName}</td>
                  <td className="px-3 py-2">{p.city}, {p.state}</td>
                  <td className="px-3 py-2">
                    {p.phone ? <a href={`tel:${p.phone}`} className="text-teal-800">{p.phone}</a> : "—"}
                  </td>
                  <td className="px-3 py-2 max-w-[140px] truncate">
                    {p.website ? (
                      <a href={p.website} target="_blank" rel="noreferrer" className="text-teal-800 hover:underline">
                        {p.website}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-3 py-2 text-xs">{p.servicesOffered.join(", ")}</td>
                  <td className="px-3 py-2">
                    <select
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs"
                      value={p.status}
                      disabled={saving === p.id}
                      onChange={(e) => updateStatus(p, e.target.value as ProviderStatus)}
                    >
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    {(p.status === "active" || p.status === "trial") && (
                      <div className="mt-1 text-[11px] font-medium text-emerald-700">Eligible for routing</div>
                    )}
                  </td>
                  <td className="max-w-[260px] px-3 py-2 text-xs text-slate-600">{p.notes}</td>
                </tr>
              ))}
              {!initialProviders.length && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-slate-500">
                    Use the starter prospects above to build the first routing pool.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Provider } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function ProviderManager({
  initialProviders,
}: {
  initialProviders: Provider[];
}) {
  const router = useRouter();
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

  async function createProvider(e: React.FormEvent) {
    e.preventDefault();
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
    router.refresh();
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
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
            {[
              "prospect",
              "contacted",
              "trial",
              "active",
              "paused",
              "inactive",
            ].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
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
        <Button type="submit" className="w-full">
          Save provider
        </Button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {[
                "Business",
                "City",
                "Phone",
                "Website",
                "Services",
                "Status",
                "Notes",
              ].map((h) => (
                <th key={h} className="px-3 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {initialProviders.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-medium">{p.companyName}</td>
                <td className="px-3 py-2">
                  {p.city}, {p.state}
                </td>
                <td className="px-3 py-2">
                  {p.phone ? (
                    <a href={`tel:${p.phone}`} className="text-teal-800">
                      {p.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2 max-w-[140px] truncate">
                  {p.website || "—"}
                </td>
                <td className="px-3 py-2 text-xs">
                  {p.servicesOffered.join(", ")}
                </td>
                <td className="px-3 py-2">{p.status}</td>
                <td className="px-3 py-2 text-xs text-slate-600">{p.notes}</td>
              </tr>
            ))}
            {!initialProviders.length && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-slate-500">
                  Add Tucson septic companies as prospects to build routing.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

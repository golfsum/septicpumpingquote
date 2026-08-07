"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState(initial);
  const [msg, setMsg] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMsg(res.ok ? "Settings saved" : "Save failed");
  }

  return (
    <form
      onSubmit={save}
      className="mt-6 max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-4"
    >
      <label className="block text-sm">
        Consent language
        <textarea
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          rows={4}
          value={form.consentLanguage}
          onChange={(e) =>
            setForm((f) => ({ ...f, consentLanguage: e.target.value }))
          }
        />
      </label>
      <label className="block text-sm">
        Estimated lead value ($)
        <input
          type="number"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          value={form.estimatedLeadValue}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              estimatedLeadValue: Number(e.target.value),
            }))
          }
        />
      </label>
      <label className="block text-sm">
        GSC property
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          value={form.gscProperty}
          onChange={(e) =>
            setForm((f) => ({ ...f, gscProperty: e.target.value }))
          }
        />
      </label>
      <Button type="submit">Save settings</Button>
      {msg && <p className="text-sm text-teal-800">{msg}</p>}
    </form>
  );
}

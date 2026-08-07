"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Lead, LeadStatus, Provider } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const STATUSES: LeadStatus[] = [
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
];

export function LeadDetailActions({
  lead,
  matches,
}: {
  lead: Lead;
  matches: Provider[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.adminNotes || "");
  const [providerId, setProviderId] = useState(matches[0]?.id || "");
  const [msg, setMsg] = useState("");

  async function saveStatus() {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: lead.id, status, note: "Status updated" }),
    });
    setMsg("Status updated");
    router.refresh();
  }

  async function saveNotes() {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: lead.id, patch: { adminNotes: notes } }),
    });
    setMsg("Notes saved");
    router.refresh();
  }

  async function assign() {
    if (!providerId) return;
    await fetch("/api/admin/routing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: lead.id, providerId }),
    });
    setMsg("Lead assigned to provider");
    router.refresh();
  }

  return (
    <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="font-semibold">Admin actions</h2>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="text-sm">
          Status
          <select
            className="mt-1 block rounded-md border border-slate-300 px-2 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <Button type="button" onClick={saveStatus}>
          Update status
        </Button>
      </div>
      <label className="mt-4 block text-sm">
        Admin notes
        <textarea
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <Button type="button" variant="secondary" className="mt-2" onClick={saveNotes}>
        Save notes
      </Button>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <h3 className="font-semibold">Manual lead routing</h3>
        <p className="mt-1 text-sm text-slate-600">
          Matching providers for this lead: {matches.length}
        </p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <select
            className="rounded-md border border-slate-300 px-2 py-2 text-sm"
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
          >
            <option value="">Select provider</option>
            {matches.map((p) => (
              <option key={p.id} value={p.id}>
                {p.companyName} ({p.city})
              </option>
            ))}
          </select>
          <Button type="button" onClick={assign} disabled={!providerId}>
            Assign / send
          </Button>
        </div>
      </div>
      {msg && <p className="mt-3 text-sm text-teal-800">{msg}</p>}
    </section>
  );
}

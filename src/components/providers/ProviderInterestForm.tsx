"use client";

import { useState } from "react";

const SERVICES = [
  ["septic-pumping", "Septic pumping"],
  ["septic-repair", "Septic repair"],
  ["septic-inspection", "Septic inspections"],
  ["septic-installation", "Septic installation"],
  ["emergency-septic-service", "Emergency septic service"],
] as const;

export function ProviderInterestForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const servicesOffered = SERVICES.filter(([slug]) => form.get(slug)).map(([slug]) => slug);
    const payload = {
      companyName: form.get("companyName"),
      contactName: form.get("contactName"),
      phone: form.get("phone"),
      email: form.get("email"),
      companyWebsite: form.get("companyWebsite"),
      city: form.get("city"),
      state: form.get("state"),
      zip: form.get("zip"),
      serviceAreaCities: form.get("serviceAreaCities"),
      servicesOffered,
      emergencyService: Boolean(form.get("emergencyService")),
      notes: form.get("notes"),
      websiteField: form.get("websiteField"),
    };

    const response = await fetch("/api/provider-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatus("error");
      setMessage(data.error || "Could not submit your application. Please try again.");
      return;
    }

    setStatus("success");
    setMessage("Thanks. Your company is in our provider review queue. We will contact you before any leads are sent.");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">Join the provider network</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Tell us where you work and what services you handle. Applying does not obligate you to buy leads, and we will contact you before activating your account.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          ["companyName", "Company name", true],
          ["contactName", "Contact name", false],
          ["phone", "Phone", true],
          ["email", "Email", false],
          ["companyWebsite", "Website", false],
          ["city", "Primary city", true],
          ["state", "State", true],
          ["zip", "ZIP", false],
        ].map(([name, label, required]) => (
          <label key={String(name)} className="text-sm text-slate-700">
            {label}
            <input
              name={String(name)}
              required={Boolean(required)}
              maxLength={name === "state" ? 2 : undefined}
              className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600"
            />
          </label>
        ))}
      </div>

      <label className="mt-4 block text-sm text-slate-700">
        Other cities you serve
        <input
          name="serviceAreaCities"
          placeholder="Example: Tucson, Marana, Vail, Sahuarita"
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600"
        />
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-slate-900">Services offered</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {SERVICES.map(([slug, label]) => (
            <label key={slug} className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name={slug} className="h-4 w-4" />
              {label}
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="emergencyService" className="h-4 w-4" />
            24/7 or emergency availability
          </label>
        </div>
      </fieldset>

      <label className="mt-5 block text-sm text-slate-700">
        Anything we should know?
        <textarea
          name="notes"
          rows={4}
          placeholder="Licensing, coverage radius, specialties, preferred lead types, etc."
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600"
        />
      </label>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="websiteField" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {status === "saving" ? "Submitting…" : "Apply to receive local leads"}
      </button>

      {message && (
        <p className={`mt-3 text-sm ${status === "error" ? "text-red-700" : "text-emerald-700"}`}>
          {message}
        </p>
      )}
    </form>
  );
}

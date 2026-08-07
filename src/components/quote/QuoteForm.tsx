"use client";

import { useEffect, useMemo, useState } from "react";
import { SERVICE_OPTIONS, URGENCY_OPTIONS } from "@/config/services";
import { captureAttribution, trackClientEvent } from "@/lib/attribution/client";
import { Button } from "@/components/ui/Button";

type Props = {
  presetService?: string;
  presetCity?: string;
  presetState?: string;
  seoPageId?: string;
  compact?: boolean;
  consentLanguage?: string;
};

const DEFAULT_CONSENT =
  "I agree to be contacted by phone, text, or email regarding my septic service quote request. Message and data rates may apply. Consent is not a condition of purchase.";

const REPAIR_SIGNS = [
  "Sewage backup",
  "Slow drains",
  "Bad smell",
  "Standing water",
  "Alarm sounding",
  "Pump issue",
  "Unknown issue",
];

export function QuoteForm({
  presetService = "",
  presetCity = "",
  presetState = "AZ",
  seoPageId = "",
  compact = false,
  consentLanguage = DEFAULT_CONSENT,
}: Props) {
  const [step, setStep] = useState(1);
  const [zip, setZip] = useState("");
  const [service, setService] = useState(presetService);
  const [urgency, setUrgency] = useState("");
  const [problemDetails, setProblemDetails] = useState<Record<string, string>>({});
  const [selectedSigns, setSelectedSigns] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(presetCity);
  const [state, setState] = useState(presetState);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [leadId, setLeadId] = useState("");

  useEffect(() => {
    trackClientEvent("quote_form_view", { page: seoPageId || "home" });
  }, [seoPageId]);

  const totalSteps = 5;
  const isPumping = service.includes("pumping") || service.includes("cleaning");
  const isRepair = service.includes("repair") || service.includes("emergency");

  const progress = useMemo(
    () => Math.round((step / totalSteps) * 100),
    [step],
  );

  function nextFromZip() {
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
      setError("Enter a valid 5-digit ZIP code.");
      return;
    }
    setError("");
    trackClientEvent("quote_started", { step: "zip" });
    trackClientEvent("quote_step_completed", { step: "zip" });
    if (presetService) {
      setService(presetService);
      setStep(3);
    } else {
      setStep(2);
    }
  }

  function toggleSign(sign: string) {
    setSelectedSigns((prev) =>
      prev.includes(sign) ? prev.filter((s) => s !== sign) : [...prev, sign],
    );
  }

  async function submit() {
    setError("");
    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }
    if (!city.trim() || !state.trim()) {
      setError("City and state are required.");
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim() || phoneDigits.length < 10) {
      setError("Phone number is required.");
      return;
    }
    if (!consent) {
      setError("Please confirm consent to be contacted.");
      return;
    }

    setSubmitting(true);
    try {
      const attribution = captureAttribution(seoPageId);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          city: city.trim(),
          state: state.trim(),
          zip: zip.trim(),
          service,
          urgency,
          problemDetails: {
            ...problemDetails,
            signs: selectedSigns,
          },
          freeformNotes: notes.trim(),
          consentContact: true,
          honeypot,
          attribution,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not submit your request.");
        setSubmitting(false);
        return;
      }
      trackClientEvent("quote_submitted", { leadId: data.id });
      trackClientEvent("lead_created", { leadId: data.id });
      setLeadId(data.id);
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        id="quote"
        className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-slate-800"
      >
        <h3 className="text-xl font-bold text-teal-900">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Thanks{firstName ? `, ${firstName}` : ""}. We received your septic
          quote request{leadId ? ` (${leadId.slice(0, 8)})` : ""}. A matching
          provider in your area may contact you using the details you provided.
        </p>
      </div>
    );
  }

  return (
    <div
      id="quote"
      className={`rounded-xl border border-slate-200 bg-white shadow-sm ${compact ? "p-4" : "p-5 sm:p-6"}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Free quote request
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Get septic quotes
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            No obligation. Local professionals serving your area.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Step {step}/{totalSteps}
        </span>
      </div>

      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-teal-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* honeypot */}
      <label className="absolute -left-[9999px] opacity-0" aria-hidden>
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </label>

      {step === 1 && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-800">ZIP code</span>
            <input
              inputMode="numeric"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="e.g. 85701"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-3 text-base outline-none ring-teal-600 focus:ring-2"
            />
          </label>
          <Button type="button" className="w-full" onClick={nextFromZip}>
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-800">
            What service do you need?
          </p>
          <div className="grid max-h-72 gap-2 overflow-y-auto sm:grid-cols-2">
            {SERVICE_OPTIONS.map((opt) => (
              <button
                key={opt.slug}
                type="button"
                onClick={() => {
                  setService(opt.slug);
                  trackClientEvent("service_selected", { service: opt.slug });
                  trackClientEvent("quote_step_completed", { step: "service" });
                  setStep(3);
                }}
                className="rounded-md border border-slate-200 px-3 py-3 text-left text-sm hover:border-teal-600 hover:bg-teal-50"
              >
                <span className="font-semibold text-slate-900">
                  {opt.quoteFormLabel}
                </span>
              </button>
            ))}
          </div>
          <Button type="button" variant="ghost" onClick={() => setStep(1)}>
            Back
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-800">How soon?</p>
          <div className="space-y-2">
            {URGENCY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setUrgency(opt.value);
                  trackClientEvent("quote_step_completed", { step: "urgency" });
                  setStep(4);
                }}
                className="flex w-full rounded-md border border-slate-200 px-3 py-3 text-left text-sm font-medium hover:border-teal-600 hover:bg-teal-50"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep(presetService ? 1 : 2)}
          >
            Back
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-800">
            Optional details (helps providers quote accurately)
          </p>
          {isPumping && (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                Approx. last pumping
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={problemDetails.lastPumping || ""}
                  onChange={(e) =>
                    setProblemDetails((p) => ({
                      ...p,
                      lastPumping: e.target.value,
                    }))
                  }
                  placeholder="e.g. 3 years ago / unknown"
                />
              </label>
              <label className="block text-sm">
                Estimated tank size
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={problemDetails.tankSize || ""}
                  onChange={(e) =>
                    setProblemDetails((p) => ({
                      ...p,
                      tankSize: e.target.value,
                    }))
                  }
                  placeholder="e.g. 1000 gal / unknown"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                Lid / access known?
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={problemDetails.access || ""}
                  onChange={(e) =>
                    setProblemDetails((p) => ({
                      ...p,
                      access: e.target.value,
                    }))
                  }
                  placeholder="Yes / no / not sure"
                />
              </label>
            </div>
          )}
          {isRepair && (
            <div className="flex flex-wrap gap-2">
              {REPAIR_SIGNS.map((sign) => (
                <button
                  key={sign}
                  type="button"
                  onClick={() => toggleSign(sign)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                    selectedSigns.includes(sign)
                      ? "border-teal-700 bg-teal-700 text-white"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {sign}
                </button>
              ))}
            </div>
          )}
          <label className="block text-sm">
            Anything else?
            <textarea
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the issue (optional)"
            />
          </label>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={() => setStep(3)}>
              Back
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={() => {
                trackClientEvent("quote_step_completed", { step: "details" });
                setStep(5);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              First name *
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              Last name
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              Phone *
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </label>
            <label className="block text-sm">
              Email (optional)
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputMode="email"
                autoComplete="email"
              />
            </label>
            <label className="block text-sm">
              City *
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              State *
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
          </div>
          <p className="text-xs text-slate-500">
            ZIP: {zip}
            {service ? ` · Service: ${service}` : ""}
            {urgency ? ` · Urgency: ${urgency}` : ""}
          </p>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>{consentLanguage}</span>
          </label>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={() => setStep(4)}>
              Back
            </Button>
            <Button
              type="button"
              className="flex-1"
              disabled={submitting}
              onClick={submit}
            >
              {submitting ? "Submitting…" : "Get My Quotes"}
            </Button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

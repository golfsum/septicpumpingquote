import { NextResponse } from "next/server";
import { createProvider, listProviders } from "@/lib/providers/service";

function clean(value: unknown, max = 200) {
  return String(value || "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (clean(body.websiteField)) {
    return NextResponse.json({ ok: true });
  }

  const companyName = clean(body.companyName, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160).toLowerCase();
  const city = clean(body.city, 80);
  const state = clean(body.state, 2).toUpperCase();

  if (!companyName || !phone || !city || !state) {
    return NextResponse.json(
      { error: "Company, phone, city and state are required." },
      { status: 400 },
    );
  }

  const current = await listProviders();
  const duplicate = current.find(
    (p) =>
      p.companyName.toLowerCase() === companyName.toLowerCase() &&
      (p.phone.replace(/\D/g, "") === phone.replace(/\D/g, "") ||
        (email && p.email.toLowerCase() === email)),
  );

  if (duplicate) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const servicesOffered = Array.isArray(body.servicesOffered)
    ? body.servicesOffered.map((s: unknown) => clean(s, 80)).filter(Boolean)
    : [];
  const serviceAreaCities = clean(body.serviceAreaCities, 500)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 30);

  await createProvider({
    companyName,
    contactName: clean(body.contactName, 120),
    phone,
    email,
    website: clean(body.companyWebsite, 250),
    street: "",
    city,
    state,
    zip: clean(body.zip, 10),
    serviceAreaCities: serviceAreaCities.length ? serviceAreaCities : [city],
    serviceAreaZips: [],
    servicesOffered,
    emergencyService: Boolean(body.emergencyService),
    notes: `Inbound provider application. ${clean(body.notes, 1000)}`.trim(),
    active: false,
    status: "prospect",
    leadPrice: null,
    monthlyCap: null,
    dailyCap: null,
    preferredContactMethod: email ? "either" : "phone",
    contactStatus: "inbound_application",
  });

  return NextResponse.json({ ok: true });
}

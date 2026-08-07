import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import {
  createProvider,
  listProviders,
  updateProvider,
} from "@/lib/providers/service";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const providers = await listProviders();
  return NextResponse.json({ providers });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.companyName) {
    return NextResponse.json({ error: "companyName required" }, { status: 400 });
  }
  const provider = await createProvider({
    companyName: body.companyName,
    contactName: body.contactName || "",
    phone: body.phone || "",
    email: body.email || "",
    website: body.website || "",
    street: body.street || "",
    city: body.city || "",
    state: body.state || "AZ",
    zip: body.zip || "",
    serviceAreaCities: body.serviceAreaCities || [],
    serviceAreaZips: body.serviceAreaZips || [],
    servicesOffered: body.servicesOffered || [],
    emergencyService: Boolean(body.emergencyService),
    notes: body.notes || "",
    active: body.active ?? false,
    status: body.status || "prospect",
    leadPrice: body.leadPrice ?? null,
    monthlyCap: body.monthlyCap ?? null,
    dailyCap: body.dailyCap ?? null,
    preferredContactMethod: body.preferredContactMethod || "email",
    contactStatus: body.contactStatus || "new",
  });
  return NextResponse.json({ provider });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const provider = await updateProvider(body.id, body.patch || {});
  return NextResponse.json({ provider });
}

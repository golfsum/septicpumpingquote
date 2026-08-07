import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { getLead, updateLead } from "@/lib/leads/service";
import {
  assignLeadToProvider,
  listAssignments,
  listProviders,
  matchProvidersForLead,
} from "@/lib/providers/service";

export async function GET(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get("leadId");
  const providers = await listProviders();
  const assignments = await listAssignments();

  if (leadId) {
    const lead = await getLead(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({
      lead,
      matches: matchProvidersForLead(lead, providers),
      assignments: assignments.filter((a) => a.leadId === leadId),
    });
  }

  return NextResponse.json({ providers, assignments });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const lead = await getLead(body.leadId);
  const providers = await listProviders();
  const provider = providers.find((p) => p.id === body.providerId);
  if (!lead || !provider) {
    return NextResponse.json(
      { error: "Lead or provider not found" },
      { status: 404 },
    );
  }
  const assignment = await assignLeadToProvider({
    lead,
    provider,
    price: body.price,
    notes: body.notes,
  });
  await updateLead(lead.id, {
    assignedProviderId: provider.id,
    assignedProviderName: provider.companyName,
    status: "sent_to_provider",
    statusHistory: [
      ...lead.statusHistory,
      {
        status: "sent_to_provider",
        at: new Date().toISOString(),
        note: `Assigned to ${provider.companyName}`,
      },
    ],
  });
  return NextResponse.json({ assignment });
}

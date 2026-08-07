import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { leadsToCsv, listLeads, updateLead, updateLeadStatus } from "@/lib/leads/service";
import type { LeadStatus } from "@/lib/types";

export async function GET(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const leads = await listLeads();

  if (searchParams.get("format") === "csv") {
    return new NextResponse(leadsToCsv(leads), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="leads.csv"',
      },
    });
  }

  return NextResponse.json({ leads });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  if (body.status) {
    const lead = await updateLeadStatus(
      body.id,
      body.status as LeadStatus,
      body.note,
    );
    return NextResponse.json({ lead });
  }
  const lead = await updateLead(body.id, body.patch || {});
  return NextResponse.json({ lead });
}

import { NextResponse } from "next/server";
import {
  checkLeadRateLimit,
  createLead,
} from "@/lib/leads/service";
import { leadCreateSchema } from "@/lib/leads/validation";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const allowed = await checkLeadRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = leadCreateSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message || "Invalid lead submission";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    if (parsed.data.honeypot) {
      return NextResponse.json({ id: "ok" });
    }

    const lead = await createLead({
      ...parsed.data,
      email: parsed.data.email || "",
      consentContact: true,
    });

    return NextResponse.json({ id: lead.id, ok: true });
  } catch (error) {
    console.error("Lead create failed", error);
    return NextResponse.json(
      { error: "Unable to save lead right now." },
      { status: 500 },
    );
  }
}

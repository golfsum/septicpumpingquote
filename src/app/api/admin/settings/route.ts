import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { localGetSettings, localUpdateSettings } from "@/lib/store/local-db";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ settings: await localGetSettings() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const settings = await localUpdateSettings(body);
  return NextResponse.json({ settings });
}

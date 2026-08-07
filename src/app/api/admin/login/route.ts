import { NextResponse } from "next/server";
import {
  DEV_COOKIE,
  DEV_SESSION_VALUE,
  getDevAdminPassword,
} from "@/lib/admin/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  const body = await request.json();

  if (isFirebaseAdminConfigured() && body.idToken) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("spq_admin_token", body.idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  }

  if (!isFirebaseAdminConfigured() && body.password === getDevAdminPassword()) {
    const res = NextResponse.json({ ok: true, mode: "dev" });
    res.cookies.set(DEV_COOKIE, DEV_SESSION_VALUE, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("spq_admin_token", "", { path: "/", maxAge: 0 });
  res.cookies.set(DEV_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

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
    try {
      const { verifyFirebaseIdToken } = await import(
        "@/lib/firebase/verify-id-token"
      );
      const decoded = await verifyFirebaseIdToken(body.idToken);

      const res = NextResponse.json({
        ok: true,
        email: decoded.email || null,
      });
      res.cookies.set("spq_admin_token", body.idToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 12,
      });
      return res;
    } catch (error) {
      console.error("Admin login verify failed", error);

      let tokenAud: string | null = null;
      try {
        const payload = JSON.parse(
          Buffer.from(
            String(body.idToken).split(".")[1] || "",
            "base64url",
          ).toString("utf8"),
        );
        tokenAud = payload.aud || null;
      } catch {
        /* ignore */
      }

      const message =
        error instanceof Error
          ? error.message
          : "Could not verify Firebase login token";

      return NextResponse.json(
        {
          error: message,
          tokenProject: tokenAud,
          adminProject: process.env.FIREBASE_PROJECT_ID || null,
          hint:
            tokenAud &&
            process.env.FIREBASE_PROJECT_ID &&
            tokenAud !== process.env.FIREBASE_PROJECT_ID
              ? "NEXT_PUBLIC_FIREBASE_PROJECT_ID and FIREBASE_PROJECT_ID do not match."
              : "Confirm Email/Password auth is enabled and this user exists in the same Firebase project.",
        },
        { status: 401 },
      );
    }
  }

  if (!isFirebaseAdminConfigured() && body.password === getDevAdminPassword()) {
    const res = NextResponse.json({ ok: true, mode: "dev" });
    res.cookies.set(DEV_COOKIE, DEV_SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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

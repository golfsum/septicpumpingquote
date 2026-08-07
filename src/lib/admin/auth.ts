import { cookies } from "next/headers";
import { getAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

const DEV_COOKIE = "spq_admin_session";
const DEV_SESSION_VALUE = "authenticated";

export function getDevAdminPassword(): string {
  return process.env.ADMIN_DEV_PASSWORD || "admin-dev";
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();

  if (isFirebaseAdminConfigured()) {
    const token = jar.get("spq_admin_token")?.value;
    if (!token) return false;
    try {
      const auth = getAdminAuth();
      if (!auth) return false;
      await auth.verifyIdToken(token);
      return true;
    } catch {
      return false;
    }
  }

  // Local/dev fallback when Firebase Admin is not configured.
  const session = jar.get(DEV_COOKIE)?.value;
  return session === DEV_SESSION_VALUE || session === getDevAdminPassword();
}

export async function requireAdmin(): Promise<boolean> {
  return isAdminAuthenticated();
}

export { DEV_COOKIE, DEV_SESSION_VALUE };

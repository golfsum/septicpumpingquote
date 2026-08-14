import { cookies } from "next/headers";

const DEV_COOKIE = "spq_admin_session";
const DEV_SESSION_VALUE = "authenticated";

function hasFirebaseAdminEnv(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      (process.env.FIREBASE_PRIVATE_KEY ||
        process.env.FIREBASE_PRIVATE_KEY_BASE64),
  );
}

export function getDevAdminPassword(): string {
  return process.env.ADMIN_DEV_PASSWORD || "admin-dev";
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();

  if (hasFirebaseAdminEnv()) {
    const token = jar.get("spq_admin_token")?.value;
    if (!token) return false;
    try {
      const { verifyFirebaseIdToken } = await import(
        "@/lib/firebase/verify-id-token"
      );
      await verifyFirebaseIdToken(token);
      return true;
    } catch (error) {
      console.error("Admin token verification failed", error);
      return false;
    }
  }

  const session = jar.get(DEV_COOKIE)?.value;
  return session === DEV_SESSION_VALUE || session === getDevAdminPassword();
}

export async function requireAdmin(): Promise<boolean> {
  return isAdminAuthenticated();
}

export { DEV_COOKIE, DEV_SESSION_VALUE };

import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

export type VerifiedFirebaseToken = {
  uid: string;
  email?: string;
  payload: JWTPayload;
};

const JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  ),
);

/**
 * Verify a Firebase Auth ID token without firebase-admin/auth
 * (avoids jose ESM crash on Next.js/Turbopack/Vercel).
 */
export async function verifyFirebaseIdToken(
  idToken: string,
): Promise<VerifiedFirebaseToken> {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) {
    throw new Error("FIREBASE_PROJECT_ID is not set");
  }

  const { payload } = await jwtVerify(idToken, JWKS, {
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });

  const uid = typeof payload.sub === "string" ? payload.sub : "";
  if (!uid) {
    throw new Error("Firebase token missing subject (uid)");
  }

  return {
    uid,
    email: typeof payload.email === "string" ? payload.email : undefined,
    payload,
  };
}

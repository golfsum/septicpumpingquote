import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

function hasAdminCredentials(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      (process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY_BASE64),
  );
}

export function isFirebaseAdminConfigured(): boolean {
  return hasAdminCredentials();
}

/** Normalize private keys pasted into Vercel / .env (quotes, escaped newlines, base64). */
export function normalizePrivateKey(raw: string): string {
  let key = raw.trim();

  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }

  if (!key.includes("BEGIN PRIVATE KEY") && process.env.FIREBASE_PRIVATE_KEY_BASE64) {
    key = Buffer.from(
      process.env.FIREBASE_PRIVATE_KEY_BASE64.trim(),
      "base64",
    ).toString("utf8");
  }

  if (!key.includes("BEGIN PRIVATE KEY") && /^[A-Za-z0-9+/=\s]+$/.test(key)) {
    try {
      const decoded = Buffer.from(key.replace(/\s+/g, ""), "base64").toString(
        "utf8",
      );
      if (decoded.includes("BEGIN PRIVATE KEY")) key = decoded;
    } catch {
      /* keep original */
    }
  }

  key = key.replace(/\\"/g, '"');
  key = key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (key.includes("\\n")) key = key.replace(/\\n/g, "\n");
  key = key.trim();

  if (!key.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY is invalid. Use FIREBASE_PRIVATE_KEY_BASE64 (recommended) or a one-line PEM with \\n escapes.",
    );
  }

  return key;
}

function resolvePrivateKey(): string {
  if (process.env.FIREBASE_PRIVATE_KEY_BASE64?.trim()) {
    const decoded = Buffer.from(
      process.env.FIREBASE_PRIVATE_KEY_BASE64.trim(),
      "base64",
    ).toString("utf8");
    return normalizePrivateKey(decoded);
  }
  return normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY || "");
}

let adminApp: App | null = null;
let initError: string | null = null;

export function getFirebaseAdminInitError(): string | null {
  return initError;
}

async function getAdminApp(): Promise<App | null> {
  if (!hasAdminCredentials()) return null;
  if (adminApp) return adminApp;
  if (initError) return null;

  try {
    const { cert, getApps, initializeApp } = await import("firebase-admin/app");
    if (getApps().length) {
      adminApp = getApps()[0]!;
      return adminApp;
    }
    const privateKey = resolvePrivateKey();
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    return adminApp;
  } catch (error) {
    initError =
      error instanceof Error ? error.message : "Firebase Admin init failed";
    console.error("Firebase Admin init failed", error);
    return null;
  }
}

export async function getAdminDb(): Promise<Firestore | null> {
  const app = await getAdminApp();
  if (!app) return null;
  const { getFirestore } = await import("firebase-admin/firestore");
  // Newer Firebase consoles sometimes create DB id "default" instead of "(default)".
  const raw = (process.env.FIRESTORE_DATABASE_ID || "(default)").trim();
  const databaseId = raw.replace(/^["']|["']$/g, "") || "(default)";
  return getFirestore(app, databaseId);
}

/** Live check used by admin UI — only warn when Firestore is actually unreachable. */
export async function probeFirestore(): Promise<{
  ok: boolean;
  databaseId: string;
  error?: string;
}> {
  const raw = (process.env.FIRESTORE_DATABASE_ID || "(default)").trim();
  const databaseId = raw.replace(/^["']|["']$/g, "") || "(default)";
  if (!hasAdminCredentials()) {
    return { ok: false, databaseId, error: "Firebase Admin env vars are not set" };
  }
  try {
    const db = await getAdminDb();
    if (!db) {
      return {
        ok: false,
        databaseId,
        error: getFirebaseAdminInitError() || "Firebase Admin failed to initialize",
      };
    }
    await db.collection("leads").limit(1).get();
    return { ok: true, databaseId };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Firestore request failed";
    return { ok: false, databaseId, error: message };
  }
}

export async function getAdminAuth(): Promise<Auth | null> {
  const app = await getAdminApp();
  if (!app) return null;
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(app);
}

export function isFirestoreNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? (error as { code?: unknown }).code : null;
  return code === 5 || code === "5" || code === "NOT_FOUND";
}

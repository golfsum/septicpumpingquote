"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { isFirebaseClientConfigured, getClientAuth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firebaseReady = isFirebaseClientConfigured();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (firebaseReady) {
        const auth = getClientAuth();
        if (!auth) throw new Error("Auth not configured");
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await cred.user.getIdToken();
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const parts = [
            data.error || "Login failed on server.",
            data.code ? `Code: ${data.code}` : "",
            data.hint || "",
            data.tokenProject || data.adminProject
              ? `Token project: ${data.tokenProject || "?"} | Admin project: ${data.adminProject || "?"}`
              : "",
          ].filter(Boolean);
          throw new Error(parts.join("\n"));
        }
      } else {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Invalid password");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-slate-900">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          {firebaseReady
            ? "Sign in with your Firebase Authentication user (email/password)."
            : "Firebase is not configured. Use the local admin password from ADMIN_DEV_PASSWORD."}
        </p>
        {firebaseReady && (
          <label className="mt-4 block text-sm">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>
        )}
        <label className="mt-4 block text-sm">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        {error && (
          <p className="mt-3 whitespace-pre-wrap text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-5 w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

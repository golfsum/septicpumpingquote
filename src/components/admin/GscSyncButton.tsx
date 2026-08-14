"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function GscSyncButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sync() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/gsc", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(
          [data.error, data.hint, data.serviceAccount ? `SA: ${data.serviceAccount}` : ""]
            .filter(Boolean)
            .join("\n"),
        );
      } else {
        setMessage(
          data.mode === "demo"
            ? "Loaded demo SEO metrics (GSC not fully configured)."
            : `Synced ${data.rows?.length ?? 0} rows.`,
        );
        router.refresh();
      }
    } catch {
      setMessage("Network error syncing Search Console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl text-right">
      <Button type="button" onClick={sync} disabled={loading}>
        {loading ? "Syncing…" : "Sync Search Console"}
      </Button>
      {message && (
        <p className="mt-2 whitespace-pre-wrap text-left text-xs text-slate-700">
          {message}
        </p>
      )}
    </div>
  );
}

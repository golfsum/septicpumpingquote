"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function GscSyncButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function sync() {
    setLoading(true);
    await fetch("/api/admin/gsc", { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <Button type="button" onClick={sync} disabled={loading}>
      {loading ? "Syncing…" : "Sync Search Console"}
    </Button>
  );
}

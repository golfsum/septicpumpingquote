"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { adminNav } from "@/config/site";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl gap-0 md:gap-6">
        <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:block">
          <div className="sticky top-0 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Admin
            </p>
            <nav className="mt-4 space-y-1">
              {adminNav.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "block rounded-md px-3 py-2 text-sm font-medium",
                      active
                        ? "bg-teal-700 text-white"
                        : "text-slate-700 hover:bg-slate-100",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={logout}
              className="mt-6 text-sm text-slate-500 hover:text-slate-800"
            >
              Sign out
            </button>
          </div>
        </aside>
        <div className="min-w-0 flex-1 px-4 py-6 md:pr-6">
          <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-slate-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

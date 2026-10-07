"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "../lib/auth";
import { useState } from "react";
import { BrandMark, Icons } from "./ui";

type SidebarProps = {
  isSupport?: boolean;
};

export default function Sidebar({ isSupport = false }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return "";
      return JSON.parse(stored).full_name || "Usuario";
    } catch {
      return "Usuario";
    }
  });

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const profilePath = isSupport
    ? "/dashboard/support/profile"
    : "/dashboard/profile";
  const ticketsPath = isSupport
    ? "/dashboard/support/tickets"
    : "/dashboard/tickets";
  const homePath = isSupport ? "/dashboard/support" : "/dashboard";

  const isActive = (path: string) => pathname === path;

  const linkCls = (active: boolean) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
      active
        ? "bg-[#05AD98] text-white font-semibold shadow-sm"
        : "text-[#bbbfbf] hover:bg-[#283836] hover:text-white font-medium"
    }`;

  const initial = userName.charAt(0).toUpperCase() || "U";

  return (
    <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col bg-[#1e2928] text-white">
      {/* Marca */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="text-[15px] font-semibold leading-tight">Fixi</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#bbbfbf]">
              Sistema de tickets
            </p>
          </div>
        </div>
      </div>

      {/* Usuario */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f7f4] text-[15px] font-bold text-[#03695e]">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{userName}</p>
            <span
              className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                isSupport
                  ? "bg-[#05AD98]/15 text-[#7fe3d3] border border-[#05AD98]/30"
                  : "bg-white/10 text-[#e2e6e6] border border-white/15"
              }`}
            >
              {isSupport ? (
                <Icons.wrench className="h-3 w-3" />
              ) : (
                <Icons.user className="h-3 w-3" />
              )}
              {isSupport ? "Soporte" : "Usuario"}
            </span>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3.5 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#878787]">
          Principal
        </p>
        <Link href={homePath} className={linkCls(isActive(homePath))}>
          <Icons.chart className="h-[18px] w-[18px]" />
          Panel general
        </Link>
        <Link href={ticketsPath} className={linkCls(isActive(ticketsPath))}>
          <Icons.ticket className="h-[18px] w-[18px]" />
          Tickets
        </Link>
        <Link href={profilePath} className={linkCls(isActive(profilePath))}>
          <Icons.user className="h-[18px] w-[18px]" />
          Perfil
        </Link>
      </nav>

      {/* Cierre - siempre visible al pie del sidebar fijo */}
      <div className="mt-auto p-3 border-t border-white/10 bg-[#1e2928]">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#e2e6e6] transition-colors hover:bg-white/10 hover:text-white"
        >
          <Icons.logout className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

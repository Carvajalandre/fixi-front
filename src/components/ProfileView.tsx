"use client";

import { useState } from "react";
import { Icons, LoadingState } from "./ui";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function ProfileView({
  title = "Mi perfil",
  description = "Información de tu cuenta en Fixi",
}: {
  title?: string;
  description?: string;
}) {
  const [user] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    try {
      const rawUser = JSON.parse(stored);
      return {
        id: rawUser.id,
        name: rawUser.full_name || "—",
        email: rawUser.email || "—",
        role: rawUser.role === "support" ? "Soporte" : "Usuario",
      };
    } catch {
      return null;
    }
  });

  if (!user)
    return (
      <div className="bg-white rounded-xl border border-[#e2e6e6]">
        <LoadingState label="Cargando perfil…" />
      </div>
    );

  const rows = [
    { label: "ID de usuario", value: `#${user.id}`, mono: true },
    { label: "Nombre completo", value: user.name, mono: false },
    { label: "Correo electrónico", value: user.email, mono: false },
    { label: "Rol en el sistema", value: user.role, mono: false },
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#048a7a] mb-1">
          Fixi · Cuenta
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#1f2a29]">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[#5b6665]">{description}</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e6e6] shadow-[0_1px_2px_rgba(31,42,41,0.06)] overflow-hidden">
        <div className="h-24 bg-[#1e2928] relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,#05AD98,transparent_55%)]" />
        </div>
        <div className="px-6 md:px-8 pb-7">
          <div className="-mt-10 mb-4 flex items-end justify-between">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#e6f7f4] text-[#03695e] shadow-sm">
              <Icons.user className="h-8 w-8" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfe9e2] bg-[#e6f7f4] px-3 py-1 text-xs font-semibold text-[#03695e]">
              {user.role === "Soporte" ? (
                <Icons.wrench className="h-3.5 w-3.5" />
              ) : (
                <Icons.user className="h-3.5 w-3.5" />
              )}
              {user.role}
            </span>
          </div>

          <h2 className="text-lg font-semibold text-[#1f2a29]">{user.name}</h2>
          <p className="text-sm text-[#878787]">{user.email}</p>

          <dl className="mt-6 divide-y divide-[#eef1f1] rounded-lg border border-[#e2e6e6]">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-4 bg-white px-4 py-3.5"
              >
                <dt className="text-[13px] font-medium text-[#878787]">
                  {r.label}
                </dt>
                <dd
                  className={`text-sm font-semibold text-[#1f2a29] text-right ${
                    r.mono ? "font-mono" : ""
                  }`}
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-lg border border-[#e2e6e6] bg-[#f4f5f5] px-4 py-3.5">
            <p className="text-[13px] font-semibold text-[#3a4746]">
              Información de solo lectura
            </p>
            <p className="mt-0.5 text-[13px] text-[#5b6665]">
              Para actualizar tus datos, contacta al administrador del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

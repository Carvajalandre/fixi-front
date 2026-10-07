"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Card,
  Icons,
  PageHeader,
  primaryButton,
} from "../../src/components/ui";

export default function DashboardPage() {
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

  const firstName = userName ? userName.split(" ")[0] : "";

  return (
    <div>
      <PageHeader
        title={firstName ? `Hola, ${firstName}` : "Panel general"}
        description="Gestiona tus solicitudes de soporte y consulta su avance."
        actions={
          <Link href="/dashboard/tickets" className={primaryButton}>
            <Icons.plus className="h-4 w-4" />
            Nuevo ticket
          </Link>
        }
      />

      {/* Accesos directos */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Link href="/dashboard/tickets">
          <Card className="p-6 transition-shadow hover:shadow-md group">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e6f7f4] text-[#03695e]">
                <Icons.plus className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-[#1f2a29] group-hover:text-[#03695e]">
                  Crear un ticket
                </h3>
                <p className="mt-1 text-sm text-[#5b6665]">
                  Describe el problema con detalle para acelerar la resolución.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#03695e]">
                  Ir al formulario
                  <Icons.arrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/tickets">
          <Card className="p-6 transition-shadow hover:shadow-md group">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eef1f1] text-[#3a4746]">
                <Icons.ticket className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-[#1f2a29] group-hover:text-[#03695e]">
                  Consultar mis tickets
                </h3>
                <p className="mt-1 text-sm text-[#5b6665]">
                  Revisa estados, responsables y el historial de cada solicitud.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#03695e]">
                  Ver listado
                  <Icons.arrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Proceso */}
      <Card className="p-6 md:p-7 mb-4">
        <h3 className="text-[15px] font-semibold text-[#1f2a29]">
          Cómo funciona el proceso
        </h3>
        <p className="mt-1 text-sm text-[#5b6665]">
          Tres etapas simples para mantener trazabilidad.
        </p>
        <div className="mt-5 grid md:grid-cols-3 gap-4">
          {[
            {
              n: "01",
              t: "Registro",
              d: "Crea el ticket con título y descripción claros.",
            },
            {
              n: "02",
              t: "Asignación",
              d: "Soporte toma el caso y lo marca en progreso.",
            },
            {
              n: "03",
              t: "Resolución",
              d: "Recibes la solución y el caso se finaliza.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-lg border border-[#e2e6e6] bg-[#f4f5f5] p-4"
            >
              <p className="text-xs font-bold tracking-widest text-[#05AD98]">
                {s.n}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1f2a29]">{s.t}</p>
              <p className="mt-1 text-[13px] text-[#5b6665]">{s.d}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recomendaciones */}
      <Card className="p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1e2928] text-white">
            <Icons.shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-[#1f2a29]">
              Recomendaciones para un caso efectivo
            </h3>
            <ul className="mt-3 grid md:grid-cols-2 gap-2 text-[13px] text-[#3a4746]">
              {[
                "Usa un título específico y descriptivo",
                "Detalla pasos para reproducir el problema",
                "Indica impacto y urgencia del caso",
                "Mantén la comunicación en el mismo ticket",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-[#05AD98]" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

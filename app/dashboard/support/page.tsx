"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTickets } from "../../../src/lib/tickets";
import {
  Card,
  Icons,
  LoadingState,
  PageHeader,
} from "../../../src/components/ui";

type TicketStatus = {
  id: number;
  status_name: string;
};

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  requester: { full_name: string };
  assigned_support: { full_name: string } | null;
};

export default function SupportDashboardPage() {
  const [userName] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return "";
      return JSON.parse(stored).full_name || "Soporte";
    } catch {
      return "Soporte";
    }
  });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error("Error al cargar tickets", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status?.status_name === "open").length,
    inProgress: tickets.filter((t) => t.status?.status_name === "in_progress")
      .length,
    finished: tickets.filter((t) => t.status?.status_name === "finish").length,
    unassigned: tickets.filter((t) => !t.assigned_support).length,
  };

  const cards = [
    {
      label: "Total",
      value: stats.total,
      icon: <Icons.chart className="h-5 w-5" />,
      box: "bg-[#eef1f1] text-[#3a4746]",
    },
    {
      label: "Abiertos",
      value: stats.open,
      icon: <Icons.inbox className="h-5 w-5" />,
      box: "bg-[#fef6e7] text-[#92580a]",
    },
    {
      label: "En progreso",
      value: stats.inProgress,
      icon: <Icons.clock className="h-5 w-5" />,
      box: "bg-[#e6f7f4] text-[#03695e]",
    },
    {
      label: "Finalizados",
      value: stats.finished,
      icon: <Icons.check className="h-5 w-5" />,
      box: "bg-[#eef1f1] text-[#3a4746]",
    },
    {
      label: "Sin asignar",
      value: stats.unassigned,
      icon: <Icons.alert className="h-5 w-5" />,
      box: "bg-white text-[#92580a] border border-[#f0dcb4]",
    },
  ];

  return (
    <div>
      <PageHeader
        title={`Panel de soporte${userName ? ` — ${userName.split(" ")[0]}` : ""}`}
        description="Supervisa la carga de trabajo, prioriza casos y da seguimiento."
        actions={
          <Link
            href="/dashboard/support/tickets"
            className="inline-flex items-center gap-2 rounded-lg bg-[#05AD98] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#048a7a]"
          >
            <Icons.ticket className="h-4 w-4" />
            Gestionar tickets
          </Link>
        }
      />

      {loading ? (
        <Card>
          <LoadingState label="Cargando indicadores…" />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {cards.map((c) => (
              <Card key={c.label} className="p-4">
                <div
                  className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${c.box}`}
                >
                  {c.icon}
                </div>
                <div className="text-2xl font-semibold tracking-tight text-[#1f2a29]">
                  {c.value}
                </div>
                <div className="text-[13px] font-medium text-[#5b6665]">
                  {c.label}
                </div>
              </Card>
            ))}
          </div>

          {stats.unassigned > 0 && (
            <Card className="mb-4 border-[#f0dcb4] bg-[#fef6e7] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#92580a] border border-[#f0dcb4]">
                    <Icons.alert className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#5f3d08]">
                      {stats.unassigned} caso
                      {stats.unassigned !== 1 ? "s" : ""} pendiente
                      {stats.unassigned !== 1 ? "s" : ""} de asignación
                    </p>
                    <p className="text-[13px] text-[#92580a]">
                      Asigna responsables para mantener el flujo operativo.
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard/support/tickets"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1e2928] px-4 py-2 text-sm font-semibold text-white hover:bg-[#283836]"
                >
                  Revisar ahora
                  <Icons.arrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          )}

          <Card className="p-6 md:p-7">
            <h3 className="text-[15px] font-semibold text-[#1f2a29]">
              Flujo operativo recomendado
            </h3>
            <div className="mt-5 grid md:grid-cols-4 gap-4">
              {[
                { n: "01", t: "Revisar", d: "Identifica casos nuevos y sin asignar." },
                { n: "02", t: "Asignar", d: "Toma el caso y márcalo en progreso." },
                { n: "03", t: "Resolver", d: "Aplica la solución documentada." },
                { n: "04", t: "Finalizar", d: "Cierra solo cuando esté verificado." },
              ].map((s) => (
                <div key={s.n} className="border-l-2 border-[#05AD98]/40 pl-4">
                  <p className="text-xs font-bold tracking-widest text-[#05AD98]">
                    {s.n}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#1f2a29]">
                    {s.t}
                  </p>
                  <p className="mt-1 text-[13px] text-[#5b6665]">{s.d}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

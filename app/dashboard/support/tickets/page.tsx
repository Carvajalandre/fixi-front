"use client";

import { useEffect, useState } from "react";
import {
  getTickets,
  assignTicket,
  deleteTicket,
  updateTicketStatus,
} from "../../../../src/lib/tickets";
import { getRole } from "../../../../src/lib/auth";
import {
  Card,
  EmptyState,
  Icons,
  LoadingState,
  PageHeader,
  StatusBadge,
  primaryButton,
  secondaryButton,
  inputClasses,
  labelClasses,
} from "../../../../src/components/ui";

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

export default function SupportTicketsPage() {
  const role = getRole();
  const isSupport = role === "support";

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assignedFilter, setAssignedFilter] = useState<
    "all" | "assigned" | "unassigned"
  >("all");

  useEffect(() => {
    if (isSupport) {
      loadTickets();
    } else {
      setLoading(false);
    }
  }, [isSupport]);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error("No se pudieron cargar los tickets", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (ticketId: number) => {
    try {
      await assignTicket(ticketId);
      await loadTickets();
    } catch {
      alert("No se pudo asignar el ticket");
    }
  };

  const handleChangeStatus = async (ticketId: number, statusId: number) => {
    try {
      await updateTicketStatus(ticketId, statusId);
      await loadTickets();
    } catch {
      alert("No se pudo cambiar el estado");
    }
  };

  const handleDelete = async (ticketId: number) => {
    if (!confirm("¿Eliminar este ticket? Esta acción no se puede deshacer."))
      return;
    try {
      await deleteTicket(ticketId);
      await loadTickets();
    } catch {
      alert("No se pudo eliminar el ticket");
    }
  };

  if (!isSupport) {
    return (
      <Card className="p-10 text-center border-[#f0dcb4] bg-[#fef6e7]">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#92580a] border border-[#f0dcb4]">
          <Icons.alert className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold text-[#5f3d08]">
          Acceso restringido
        </h2>
        <p className="mt-1 text-sm text-[#92580a]">
          Esta sección es exclusiva del equipo de soporte.
        </p>
      </Card>
    );
  }

  if (loading)
    return (
      <Card>
        <LoadingState label="Cargando tickets…" />
      </Card>
    );

  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch =
      statusFilter === "all" || ticket.status?.status_name === statusFilter;
    const assignedMatch =
      assignedFilter === "all" ||
      (assignedFilter === "assigned" && ticket.assigned_support) ||
      (assignedFilter === "unassigned" && !ticket.assigned_support);
    return statusMatch && assignedMatch;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status?.status_name === "open").length,
    inProgress: tickets.filter((t) => t.status?.status_name === "in_progress")
      .length,
    finished: tickets.filter((t) => t.status?.status_name === "finish").length,
    unassigned: tickets.filter((t) => !t.assigned_support).length,
  };

  return (
    <div>
      <PageHeader
        title="Gestión de tickets"
        description="Filtra, asigna responsables y actualiza el estado de cada caso."
      />

      {/* Métricas compactas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {[
          { l: "Total", v: stats.total },
          { l: "Abiertos", v: stats.open },
          { l: "En progreso", v: stats.inProgress },
          { l: "Finalizados", v: stats.finished },
          { l: "Sin asignar", v: stats.unassigned },
        ].map((s) => (
          <Card key={s.l} className="px-4 py-3.5">
            <div className="text-xl font-semibold text-[#1f2a29]">{s.v}</div>
            <div className="text-xs font-medium text-[#878787]">{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <Card className="p-5 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={inputClasses}
            >
              <option value="all">Todos los estados</option>
              <option value="open">Abiertos</option>
              <option value="in_progress">En progreso</option>
              <option value="finish">Finalizados</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Asignación</label>
            <select
              value={assignedFilter}
              onChange={(e) =>
                setAssignedFilter(
                  e.target.value as "all" | "assigned" | "unassigned"
                )
              }
              className={inputClasses}
            >
              <option value="all">Todos</option>
              <option value="assigned">Asignados</option>
              <option value="unassigned">Sin asignar</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Lista */}
      {filteredTickets.length === 0 ? (
        <EmptyState
          title="Sin coincidencias"
          description="Ajusta los filtros para ver otros casos."
        />
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[15px] font-semibold text-[#1f2a29]">
                      {ticket.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#878787] bg-[#f4f5f5] border border-[#e2e6e6] px-1.5 py-0.5 rounded">
                      #{ticket.id}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <StatusBadge status={ticket.status?.status_name ?? ""} />
                    {ticket.assigned_support ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#03695e] bg-[#e6f7f4] border border-[#bfe9e2] px-2.5 py-1 rounded-full">
                        <Icons.user className="h-3.5 w-3.5" />
                        {ticket.assigned_support.full_name}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#92580a] bg-[#fef6e7] border border-[#f0dcb4] px-2.5 py-1 rounded-full">
                        <Icons.alert className="h-3.5 w-3.5" />
                        Sin asignar
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#3a4746] mb-3">
                {ticket.description}
              </p>

              <div className="mb-4 rounded-lg bg-[#f4f5f5] border border-[#e2e6e6] px-3.5 py-2.5 text-[13px] text-[#5b6665]">
                <span className="font-semibold text-[#3a4746]">
                  Solicitante:{" "}
                </span>
                {ticket.requester.full_name}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-[#eef1f1] pt-4">
                <div className="flex items-center gap-2">
                  <label className="text-[13px] font-semibold text-[#3a4746]">
                    Estado:
                  </label>
                  <select
                    value={ticket.status?.id ?? 1}
                    onChange={(e) =>
                      handleChangeStatus(ticket.id, Number(e.target.value))
                    }
                    className="rounded-lg border border-[#d4d9d9] bg-white px-3 py-1.5 text-[13px] font-medium text-[#1f2a29] focus:border-[#05AD98] focus:outline-none"
                  >
                    <option value={1}>Abierto</option>
                    <option value={2}>En progreso</option>
                    <option value={3}>Finalizado</option>
                  </select>
                </div>

                <div className="flex-1" />

                <div className="flex gap-2">
                  {!ticket.assigned_support && (
                    <button
                      onClick={() => handleAssign(ticket.id)}
                      className={primaryButton}
                    >
                      <Icons.check className="h-4 w-4" />
                      Asignarme
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className={`${secondaryButton} !text-[#9c2a2a] !border-[#e6c9c9] hover:!bg-[#fdf0f0]`}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

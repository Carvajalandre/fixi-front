"use client";

import { getRole } from "../../../src/lib/auth";
import { useEffect, useState } from "react";
import { getTickets, createTicket, updateTicket } from "../../../src/lib/tickets";
import {
  Card,
  EmptyState,
  Icons,
  LoadingState,
  PageHeader,
  StatusBadge,
  inputClasses,
  labelClasses,
  primaryButton,
  secondaryButton,
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
  assigned_support: { full_name: string } | null;
};

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "open", label: "Abiertos" },
  { id: "in_progress", label: "En progreso" },
  { id: "finish", label: "Finalizados" },
];

export default function TicketsPage() {
  const role = getRole();
  const isSupport = role === "support";

  useEffect(() => {
    if (isSupport) {
      window.location.href = "/dashboard/support/tickets";
    }
  }, [isSupport]);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTicketId, setEditingTicketId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
      setAllTickets(data);
    } catch (error) {
      console.error("No se pudieron cargar los tickets", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;
    setCreating(true);
    try {
      await createTicket(title, description);
      await loadTickets();
      setTitle("");
      setDescription("");
      setActiveFilter("all");
    } catch {
      alert("No se pudo crear el ticket");
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicketId(ticket.id);
    setEditDescription(ticket.description);
  };

  const handleSaveEdit = async (ticketId: number) => {
    try {
      await updateTicket(ticketId, editDescription);
      await loadTickets();
      setEditingTicketId(null);
      setEditDescription("");
    } catch {
      alert("No se pudo actualizar el ticket");
    }
  };

  const filterByStatus = (statusName: string) => {
    setActiveFilter(statusName);
    if (statusName === "all") {
      setTickets(allTickets);
    } else {
      setTickets(allTickets.filter((t) => t.status?.status_name === statusName));
    }
  };

  if (loading)
    return (
      <Card>
        <LoadingState label="Cargando tickets…" />
      </Card>
    );

  return (
    <div>
      <PageHeader
        title="Mis tickets"
        description="Crea solicitudes y consulta el estado de cada caso."
      />

      {/* Filtros */}
      <Card className="p-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-semibold text-[#3a4746] mr-1">
            Estado:
          </span>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => filterByStatus(f.id)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors border ${
                activeFilter === f.id
                  ? "bg-[#1e2928] text-white border-[#1e2928]"
                  : "bg-white text-[#3a4746] border-[#e2e6e6] hover:bg-[#f4f5f5]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#878787]">
            {tickets.length} resultado{tickets.length !== 1 ? "s" : ""}
          </span>
        </div>
      </Card>

      {/* Crear */}
      {!isSupport && (
        <Card className="p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f7f4] text-[#03695e]">
              <Icons.plus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-[#1f2a29]">
                Nuevo ticket
              </h2>
              <p className="text-[13px] text-[#878787]">
                Describe el problema con el mayor detalle posible.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr] gap-4">
            <div>
              <label className={labelClasses}>Título</label>
              <input
                className={inputClasses}
                placeholder="Ej.: Error al iniciar sesión en el portal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClasses}>Descripción</label>
              <textarea
                className={`${inputClasses} resize-none`}
                placeholder="Contexto, pasos para reproducir, impacto…"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={handleCreate}
                disabled={creating || !title.trim()}
                className={`${primaryButton} w-full md:w-auto md:min-w-44`}
              >
                {creating ? "Creando…" : "Crear ticket"}
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Lista */}
      {tickets.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          description="Ajusta los filtros o crea tu primer ticket para comenzar."
        />
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1f2a29]">
                    {ticket.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#878787] font-mono">
                    Caso #{ticket.id}
                  </p>
                </div>
                <StatusBadge status={ticket.status?.status_name ?? ""} />
              </div>

              {editingTicketId === ticket.id ? (
                <div className="mb-3 rounded-lg border border-[#e2e6e6] bg-[#f4f5f5] p-4">
                  <label className={labelClasses}>Descripción</label>
                  <textarea
                    className={`${inputClasses} mb-3 resize-none`}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(ticket.id)}
                      className={primaryButton}
                    >
                      <Icons.check className="h-4 w-4" />
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setEditingTicketId(null);
                        setEditDescription("");
                      }}
                      className={secondaryButton}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <p className="text-sm leading-relaxed text-[#3a4746]">
                    {ticket.description}
                  </p>
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="mt-2 text-[13px] font-semibold text-[#03695e] hover:underline"
                  >
                    Editar descripción
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 border-t border-[#eef1f1] pt-3 text-[13px] text-[#5b6665]">
                <Icons.user className="h-4 w-4 text-[#878787]" />
                <span className="font-medium">Responsable:</span>
                <span className="text-[#1f2a29] font-semibold">
                  {ticket.assigned_support?.full_name ?? "Sin asignar"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

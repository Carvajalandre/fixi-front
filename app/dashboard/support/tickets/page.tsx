"use client"

import { useEffect, useState } from "react"
import {
  getTickets,
  assignTicket,
  deleteTicket,
} from "../../../../src/lib/tickets"
import { getRole } from "../../../../src/lib/auth"

type TicketStatus = {
  id: number
  status_name: string
}

type Ticket = {
  id: number
  title: string
  description: string
  status: TicketStatus
  requester: { full_name: string }
  assigned_support: { full_name: string } | null
}

export default function SupportTicketsPage() {
  const role = getRole()
  const isSupport = role === "support"

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [assignedFilter, setAssignedFilter] = useState<"all" | "assigned" | "unassigned">("all")

  useEffect(() => {
    if (isSupport) {
      loadTickets()
    }
  }, [isSupport])

  const loadTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data)
    } catch (error) {
      console.error("No se pudieron cargar los tickets", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAssign = async (ticketId: number) => {
    try {
      await assignTicket(ticketId)
      await loadTickets()
    } catch (error) {
      alert("No se pudo asignar el ticket")
    }
  }


  if (!isSupport) {
    return <p className="text-black">Acceso no autorizado</p>
  }

  if (loading) return <p className="text-black">Cargando tickets...</p>

const filteredTickets = tickets.filter((ticket) => {
  const statusMatch =
    statusFilter === "all" ||
    ticket.status?.status_name === statusFilter

  const assignedMatch =
    assignedFilter === "all" ||
    (assignedFilter === "assigned" && ticket.assigned_support) ||
    (assignedFilter === "unassigned" && !ticket.assigned_support)

  return statusMatch && assignedMatch
})



  return (
  <div className="max-w-3xl text-black">
    <h1 className="text-2xl font-bold mb-6">Tickets de soporte</h1>

    {/* FILTROS */}
    <div className="mb-6 flex items-center gap-4">
      {/* Filtro por estado */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Estado:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="all">Todos</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="finish">Finish</option>
        </select>
      </div>

      {/* Filtro por asignación */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Asignación:</label>
        <select
          value={assignedFilter}
          onChange={(e) =>
            setAssignedFilter(
              e.target.value as "all" | "assigned" | "unassigned"
            )
          }
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="all">Todos</option>
          <option value="assigned">Asignados</option>
          <option value="unassigned">No asignados</option>
        </select>
      </div>
    </div>

    {/* LISTA */}
    {filteredTickets.length === 0 ? (
      <p>No hay tickets disponibles.</p>
    ) : (
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="border rounded p-4 bg-white">
            <h3 className="font-semibold">{ticket.title}</h3>
            <p className="text-sm text-gray-700">{ticket.description}</p>

            <span className="text-xs text-blue-600">
              Estado: {ticket.status?.status_name ?? "Sin estado"}
            </span>

            <div className="mt-2 text-xs text-gray-500">
              Solicitante: {ticket.requester.full_name}
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Asignado a: {ticket.assigned_support?.full_name ?? "No asignado"}
            </div>

            {!ticket.assigned_support && (
              <button
                onClick={() => handleAssign(ticket.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Asignar este ticket
              </button>
            )}
            <button
  onClick={async () => {
    if (!confirm("¿Eliminar este ticket?")) return

    try {
      await deleteTicket(ticket.id)
      await loadTickets()
    } catch {
      alert("No se pudo eliminar el ticket")
    }
  }}
  className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
>
  Eliminar
</button>

          </div>
        ))}
      </div>
    )}
  </div>
)

}

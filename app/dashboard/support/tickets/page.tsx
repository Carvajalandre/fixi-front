"use client"

import { useEffect, useState } from "react"
import {
  getTickets,
  assignTicket,
  deleteTicket,
  updateTicketStatus,
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

  const handleChangeStatus = async (ticketId: number, statusId: number) => {
    try {
      await updateTicketStatus(ticketId, statusId)
      await loadTickets()
    } catch (error) {
      alert("No se pudo cambiar el estado")
    }
  }

  const handleDelete = async (ticketId: number) => {
    if (!confirm("¿Estás seguro de eliminar este ticket? Esta acción no se puede deshacer.")) return

    try {
      await deleteTicket(ticketId)
      await loadTickets()
    } catch {
      alert("No se pudo eliminar el ticket")
    }
  }

  if (!isSupport) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Acceso no autorizado</h2>
          <p className="text-red-600">No tienes permisos para acceder a esta sección</p>
        </div>
      </div>
    )
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tickets...</p>
        </div>
      </div>
    )

  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch = statusFilter === "all" || ticket.status?.status_name === statusFilter
    const assignedMatch =
      assignedFilter === "all" ||
      (assignedFilter === "assigned" && ticket.assigned_support) ||
      (assignedFilter === "unassigned" && !ticket.assigned_support)

    return statusMatch && assignedMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "finish":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Abierto"
      case "in_progress":
        return "En progreso"
      case "finish":
        return "Finalizado"
      default:
        return status
    }
  }

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status?.status_name === "open").length,
    inProgress: tickets.filter((t) => t.status?.status_name === "in_progress").length,
    finished: tickets.filter((t) => t.status?.status_name === "finish").length,
    unassigned: tickets.filter((t) => !t.assigned_support).length,
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel de Soporte</h1>
        <p className="text-gray-600">Gestiona y resuelve tickets de soporte</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 p-4">
          <div className="text-2xl font-bold text-yellow-800">{stats.open}</div>
          <div className="text-sm text-yellow-700">Abiertos</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-4">
          <div className="text-2xl font-bold text-blue-800">{stats.inProgress}</div>
          <div className="text-sm text-blue-700">En progreso</div>
        </div>
        <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-4">
          <div className="text-2xl font-bold text-green-800">{stats.finished}</div>
          <div className="text-sm text-green-700">Finalizados</div>
        </div>
        <div className="bg-orange-50 rounded-lg shadow-sm border border-orange-200 p-4">
          <div className="text-2xl font-bold text-orange-800">{stats.unassigned}</div>
          <div className="text-sm text-orange-700">Sin asignar</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Filtro por estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado del ticket
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="open">Abiertos</option>
              <option value="in_progress">En progreso</option>
              <option value="finish">Finalizados</option>
            </select>
          </div>

          {/* Filtro por asignación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asignación
            </label>
            <select
              value={assignedFilter}
              onChange={(e) =>
                setAssignedFilter(e.target.value as "all" | "assigned" | "unassigned")
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="assigned">Asignados</option>
              <option value="unassigned">Sin asignar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de tickets */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay tickets que coincidan
          </h3>
          <p className="text-gray-500">Intenta ajustar los filtros</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 
                hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {ticket.title}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      ID: #{ticket.id}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        ticket.status?.status_name ?? ""
                      )}`}
                    >
                      {getStatusLabel(ticket.status?.status_name ?? "Sin estado")}
                    </span>
                    
                    {ticket.assigned_support ? (
                      <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                        👤 {ticket.assigned_support.full_name}
                      </span>
                    ) : (
                      <span className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-200">
                        ⚠️ Sin asignar
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
              </div>

              {/* Info del solicitante */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Solicitante:</span>
                  <span className="text-gray-800">{ticket.requester.full_name}</span>
                </div>
              </div>

              {/* Controles */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                {/* Cambiar estado */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Estado:</label>
                  <select
                    value={ticket.status?.id ?? 1}
                    onChange={(e) => handleChangeStatus(ticket.id, Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>Abierto</option>
                    <option value={2}>En progreso</option>
                    <option value={3}>Finalizado</option>
                  </select>
                </div>

                <div className="flex-1"></div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  {!ticket.assigned_support && (
                    <button
                      onClick={() => handleAssign(ticket.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                        rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                    >
                      ✓ Asignarme
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                      rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
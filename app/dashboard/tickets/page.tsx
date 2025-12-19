"use client"

import { getRole } from "../../../src/lib/auth"
import { useEffect, useState } from "react"
import { getTickets, createTicket, updateTicket } from "../../../src/lib/tickets"

type TicketStatus = {
  id: number
  status_name: string
}

type Ticket = {
  id: number
  title: string
  description: string
  status: TicketStatus
  assigned_support: { full_name: string } | null
}

export default function TicketsPage() {
  const role = getRole()
  const isSupport = role === "support"

  useEffect(() => {
    if (isSupport) {
      window.location.href = "/dashboard/support/tickets"
    }
  }, [isSupport])

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [allTickets, setAllTickets] = useState<Ticket[]>([])
  const [editingTicketId, setEditingTicketId] = useState<number | null>(null)
  const [editDescription, setEditDescription] = useState("")

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data)
      setAllTickets(data)
    } catch (error) {
      console.error("No se pudieron cargar los tickets", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!title.trim()) return alert("Título obligatorio")

    try {
      await createTicket(title, description)
      await loadTickets()
      setTitle("")
      setDescription("")
    } catch {
      alert("Error al crear ticket")
    }
  }

  const handleEdit = (ticket: Ticket) => {
    setEditingTicketId(ticket.id)
    setEditDescription(ticket.description)
  }

  const handleSaveEdit = async (ticketId: number) => {
    try {
      await updateTicket(ticketId, editDescription)
      await loadTickets()
      setEditingTicketId(null)
      setEditDescription("")
    } catch {
      alert("Error al actualizar ticket")
    }
  }

  const handleCancelEdit = () => {
    setEditingTicketId(null)
    setEditDescription("")
  }

  const filterByStatus = (statusName: string) => {
    if (statusName === "all") {
      setTickets(allTickets)
    } else {
      setTickets(allTickets.filter((t) => t.status?.status_name === statusName))
    }
  }

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tickets...</p>
        </div>
      </div>
    )

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Tickets</h1>
        <p className="text-gray-600">
          Gestiona y da seguimiento a tus solicitudes de soporte
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Filtrar por estado:</span>
          <button
            onClick={() => filterByStatus("all")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all
              bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Todos
          </button>
          <button
            onClick={() => filterByStatus("open")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all
              bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200"
          >
            Abiertos
          </button>
          <button
            onClick={() => filterByStatus("in_progress")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all
              bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
          >
            En progreso
          </button>
          <button
            onClick={() => filterByStatus("finish")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all
              bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
          >
            Finalizados
          </button>
        </div>
      </div>

      {/* Formulario de creación */}
      {!isSupport && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">➕</span>
            Crear nuevo ticket
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe brevemente tu problema..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Proporciona más detalles sobre tu solicitud..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              onClick={handleCreate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Crear ticket
            </button>
          </div>
        </div>
      )}

      {/* Lista de tickets */}
      {tickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No tienes tickets
          </h3>
          <p className="text-gray-500">
            Crea tu primer ticket para comenzar
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 
                hover:shadow-lg transition-all"
            >
              {/* Header del ticket */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {ticket.title}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        ticket.status?.status_name ?? ""
                      )}`}
                    >
                      {getStatusLabel(ticket.status?.status_name ?? "Sin estado")}
                    </span>
                    <span className="text-xs text-gray-500">
                      ID: #{ticket.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Descripción o editor */}
              {editingTicketId === ticket.id ? (
                <div className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Editando descripción
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 mb-3 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(ticket.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 
                        rounded-lg text-sm font-medium transition-all"
                    >
                      ✓ Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 
                        rounded-lg text-sm font-medium transition-all"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {ticket.description}
                  </p>
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium 
                      hover:underline flex items-center gap-1"
                  >
                    ✏️ Editar descripción
                  </button>
                </div>
              )}

              {/* Footer - Info adicional */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">👤 Asignado a:</span>
                    <span className="text-gray-800">
                      {ticket.assigned_support?.full_name ?? "Sin asignar"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
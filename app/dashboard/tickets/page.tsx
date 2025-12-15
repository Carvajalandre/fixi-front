"use client"

import { useEffect, useState } from "react"
import { getTickets, createTicket } from "../../../src/lib/tickets"

type TicketStatus = {
  id: number
  status_name: string
}

type Ticket = {
  id: number
  title: string
  description: string
  status: TicketStatus
}



export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data)
    } catch {
      alert("No se pudieron cargar los tickets")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!title.trim()) return alert("Título obligatorio")

    try {
      const newTicket = await createTicket(title, description)
      setTickets([newTicket, ...tickets])
      setTitle("")
      setDescription("")
    } catch {
      alert("Error al crear ticket")
    }
  }

  if (loading) return <p className="text-black">Cargando tickets...</p>

  return (
    <div className="max-w-3xl text-black">
      <h1 className="text-2xl font-bold mb-6">Mis tickets</h1>

      {/* Crear */}
      <div className="border rounded p-4 mb-6 bg-white">
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear ticket
        </button>
      </div>

      {/* Lista */}
      {tickets.length === 0 ? (
        <p>No tienes tickets.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded p-4 bg-white"
            >
              <h3 className="font-semibold">{ticket.title}</h3>
              <p className="text-sm text-gray-700">
                {ticket.description}
              </p>
              <span className="text-xs text-blue-600">
                  Estado: {ticket.status?.status_name ?? "Sin estado"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

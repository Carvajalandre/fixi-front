"use client"

import { getRole } from "../../../src/lib/auth"
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
  const role = getRole()
  const isSupport = role === "support"

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [allTickets, setAllTickets] = useState<Ticket[]>([])


  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data)
      setAllTickets(data)
    } catch (error){
      console.error("No se pudieron cargar los tickets", error)
    } finally {
      setLoading(false)
    }
  }


  const handleCreate = async () => {
    if (!title.trim()) return alert("Título obligatorio")

    try {
      await createTicket(title, description)

      // 🔁 volver a cargar tickets desde backend
      await loadTickets()

      setTitle("")
      setDescription("")
    } catch {
      alert("Error al crear ticket")
    }
  }


  if (loading) return <p className="text-black">Cargando tickets...</p>
  const filterByStatus = (statusName: string) => {
    if (statusName === "all") {
      setTickets(allTickets)
    } else {
      setTickets(
        allTickets.filter(
          (t) => t.status?.status_name === statusName
        )
      )
    }
  }


  return (
    <div className="max-w-3xl text-black">
      <h1 className="text-2xl font-bold mb-6">Mis tickets</h1>
        <div className="flex gap-2 mb-4">
          <button
            className="border px-3 py-1 rounded"
            onClick={() => filterByStatus("all")}
          >
            Todos
          </button>

          <button
            className="border px-3 py-1 rounded"
            onClick={() => filterByStatus("open")}
          >
            Abiertos
          </button>

          <button
            className="border px-3 py-1 rounded"
            onClick={() => filterByStatus("in_progress")}
          >
            En progreso
          </button>

          <button
            className="border px-3 py-1 rounded"
            onClick={() => filterByStatus("finish")}
          >
            Finalizados
          </button>
        </div>


      {/* Crear */}
      {!isSupport && (
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
      )}
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
              {isSupport && (
                <div className="mt-3 flex gap-2">
                  <button
                    className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    Tomar ticket
                  </button>

                  <button
                    className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    Finalizar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

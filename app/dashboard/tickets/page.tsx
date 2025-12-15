"use client"

import { useState } from "react"

type Ticket = {
  id: number
  title: string
  description: string
  status: "Abierto"
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleCreate = () => {
    if (!title.trim()) return alert("El título es obligatorio")

    const newTicket: Ticket = {
      id: Date.now(),
      title,
      description,
      status: "Abierto",
    }

    setTickets([...tickets, newTicket])
    setTitle("")
    setDescription("")
  }

  const handleDelete = (id: number) => {
    setTickets(tickets.filter((t) => t.id !== id))
  }

  return (
    <div className="max-w-3xl text-black">
      <h1 className="text-2xl font-bold mb-6">Mis tickets</h1>

      {/* Crear ticket */}
      <div className="border rounded p-4 mb-6 bg-white">
        <h2 className="font-semibold mb-2">Crear nuevo ticket</h2>

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
        <p>No tienes tickets aún.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded p-4 bg-white flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{ticket.title}</h3>
                <p className="text-sm text-gray-700">
                  {ticket.description || "Sin descripción"}
                </p>
                <span className="text-xs text-blue-600">
                  Estado: {ticket.status}
                </span>
              </div>

              <button
                onClick={() => handleDelete(ticket.id)}
                className="text-red-600 hover:underline text-sm"
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

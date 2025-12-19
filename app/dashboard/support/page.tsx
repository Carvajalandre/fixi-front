"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getTickets } from "../../../src/lib/tickets"

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

export default function SupportDashboardPage() {
  const [userName, setUserName] = useState("")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      const user = JSON.parse(stored)
      setUserName(user.full_name || "Soporte")
    }

    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data)
    } catch (error) {
      console.error("Error al cargar tickets", error)
    } finally {
      setLoading(false)
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
      {/* Header de bienvenida */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Panel de Soporte 🛠️
        </h1>
        <p className="text-gray-600 text-lg">
          Bienvenido{userName ? `, ${userName.split(" ")[0]}` : ""} - Gestiona y resuelve tickets
        </p>
      </div>

      {/* Estadísticas principales */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-600 font-medium">Total Tickets</div>
            </div>

            <div className="bg-yellow-50 rounded-lg shadow-lg border border-yellow-200 p-6 hover:shadow-xl transition-all">
              <div className="text-4xl mb-2">🔓</div>
              <div className="text-3xl font-bold text-yellow-800">{stats.open}</div>
              <div className="text-sm text-yellow-700 font-medium">Abiertos</div>
            </div>

            <div className="bg-blue-50 rounded-lg shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all">
              <div className="text-4xl mb-2">⚙️</div>
              <div className="text-3xl font-bold text-blue-800">{stats.inProgress}</div>
              <div className="text-sm text-blue-700 font-medium">En Progreso</div>
            </div>

            <div className="bg-green-50 rounded-lg shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-3xl font-bold text-green-800">{stats.finished}</div>
              <div className="text-sm text-green-700 font-medium">Finalizados</div>
            </div>

            <div className="bg-orange-50 rounded-lg shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all">
              <div className="text-4xl mb-2">⚠️</div>
              <div className="text-3xl font-bold text-orange-800">{stats.unassigned}</div>
              <div className="text-sm text-orange-700 font-medium">Sin Asignar</div>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link href="/dashboard/support/tickets">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🎫
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      Ver Todos los Tickets
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Gestiona, filtra y actualiza el estado de tickets
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {stats.unassigned > 0 && (
              <Link href="/dashboard/support/tickets">
                <div className="bg-orange-50 rounded-lg shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      ⚠️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-orange-800 mb-2 group-hover:text-orange-600 transition-colors">
                        Tickets Sin Asignar
                      </h3>
                      <p className="text-orange-700 text-sm">
                        Hay {stats.unassigned} ticket{stats.unassigned !== 1 ? "s" : ""} esperando asignación
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </>
      )}

      {/* Guía de trabajo */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>📋</span>
          Flujo de Trabajo
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              1️⃣
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Revisar</h4>
            <p className="text-sm text-gray-600">
              Identifica tickets nuevos y sin asignar
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              2️⃣
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Asignar</h4>
            <p className="text-sm text-gray-600">
              Toma el ticket y cambia estado a "En progreso"
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              3️⃣
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Resolver</h4>
            <p className="text-sm text-gray-600">
              Trabaja en la solución del problema
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              4️⃣
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Finalizar</h4>
            <p className="text-sm text-gray-600">
              Marca como "Finalizado" cuando esté resuelto
            </p>
          </div>
        </div>
      </div>

      {/* Consejos */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-blue-900 mb-3">
              Buenas Prácticas
            </h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Prioriza tickets sin asignar y abiertos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mantén actualizado el estado del ticket</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Comunica claramente con el solicitante</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Solo marca como finalizado cuando esté completamente resuelto</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
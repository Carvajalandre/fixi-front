"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      const user = JSON.parse(stored)
      setUserName(user.full_name || "Usuario")
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header de bienvenida */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          ¡Bienvenido{userName ? `, ${userName.split(" ")[0]}` : ""}! 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Tu centro de gestión de tickets de soporte
        </p>
      </div>

      {/* Cards de acciones rápidas */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Crear ticket */}
        <Link href="/dashboard/tickets">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                ➕
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  Crear Nuevo Ticket
                </h3>
                <p className="text-gray-600 text-sm">
                  Reporta un problema o solicita ayuda técnica
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Ver tickets */}
        <Link href="/dashboard/tickets">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🎫
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  Mis Tickets
                </h3>
                <p className="text-gray-600 text-sm">
                  Revisa el estado de tus solicitudes activas
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Información y guía */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Cómo funciona */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            Crea un Ticket
          </h3>
          <p className="text-blue-700 text-sm">
            Describe tu problema o solicitud con el mayor detalle posible
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
          <div className="text-4xl mb-4">⏳</div>
          <h3 className="text-lg font-bold text-yellow-900 mb-2">
            Seguimiento
          </h3>
          <p className="text-yellow-700 text-sm">
            Nuestro equipo revisará y te asignará un especialista
          </p>
        </div>

        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-lg font-bold text-green-900 mb-2">
            Resolución
          </h3>
          <p className="text-green-700 text-sm">
            Recibirás actualizaciones hasta resolver tu solicitud
          </p>
        </div>
      </div>

      {/* Banner informativo */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="flex items-start gap-6">
          <div className="text-6xl">💡</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Consejos para un mejor soporte
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Proporciona un título claro y descriptivo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Incluye capturas de pantalla si es posible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Describe los pasos para reproducir el problema</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mantén la comunicación activa en tu ticket</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
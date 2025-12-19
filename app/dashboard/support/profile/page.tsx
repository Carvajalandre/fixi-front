"use client"
import { useEffect, useState } from "react"

type User = {
  id: number
  name: string
  email: string
  role: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (!stored) return

    const rawUser = JSON.parse(stored)

    const normalizedUser: User = {
      id: rawUser.id,
      name: rawUser.full_name || "—",
      email: rawUser.email || "—",
      role: rawUser.role === "support" ? "Soporte" : "Usuario",
    }

    setUser(normalizedUser)
  }, [])

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Información de tu cuenta</p>
      </div>

      {/* Tarjeta de perfil */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Banner superior */}
        <div className="bg-blue-600 h-32"></div>

        {/* Contenido */}
        <div className="px-8 pb-8">
          {/* Avatar */}
          <div className="flex justify-center -mt-16 mb-6">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-5xl">👤</span>
            </div>
          </div>

          {/* Nombre y rol */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                user.role === "Soporte"
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}
            >
              {user.role === "Soporte" ? "🛠️ Soporte" : "👤 Usuario"}
            </span>
          </div>

          {/* Información */}
          <div className="space-y-6">
            {/* ID */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                ID de Usuario
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🆔</span>
                <input
                  value={`#${user.id}`}
                  readOnly
                  className="flex-1 bg-transparent text-gray-800 font-mono font-semibold text-lg 
                    outline-none cursor-default"
                />
              </div>
            </div>

            {/* Nombre completo */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Nombre Completo
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl">👨‍💼</span>
                <input
                  value={user.name}
                  readOnly
                  className="flex-1 bg-transparent text-gray-800 font-semibold text-lg 
                    outline-none cursor-default"
                />
              </div>
            </div>

            {/* Correo electrónico */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Correo Electrónico
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <input
                  value={user.email}
                  readOnly
                  className="flex-1 bg-transparent text-gray-800 font-semibold text-lg 
                    outline-none cursor-default"
                />
              </div>
            </div>

            {/* Rol */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Rol en el Sistema
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {user.role === "Soporte" ? "🛠️" : "👤"}
                </span>
                <input
                  value={user.role}
                  readOnly
                  className="flex-1 bg-transparent text-gray-800 font-semibold text-lg 
                    outline-none cursor-default"
                />
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-blue-600 text-xl">ℹ️</span>
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">
                  Información de solo lectura
                </p>
                <p className="text-sm text-blue-700">
                  Si necesitas actualizar tu información de perfil, contacta al administrador del sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { logout } from "../lib/auth"
import { useEffect, useState } from "react"

type SidebarProps = {
  isSupport?: boolean
}

export default function Sidebar({ isSupport = false }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      const user = JSON.parse(stored)
      setUserName(user.full_name || "Usuario")
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const profilePath = isSupport ? "/dashboard/support/profile" : "/dashboard/profile"
  const ticketsPath = isSupport ? "/dashboard/support/tickets" : "/dashboard/tickets"

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-72 bg-gray-900 text-white min-h-screen flex flex-col shadow-2xl">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Fixi</h1>
            <p className="text-xs text-gray-400">Sistema de Tickets</p>
          </div>
        </div>
      </div>

      {/* Perfil de usuario */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{userName}</p>
            <span
              className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                isSupport
                  ? "bg-blue-900 text-blue-300"
                  : "bg-green-900 text-green-300"
              }`}
            >
              {isSupport ? "🛠️ Soporte" : "👤 Usuario"}
            </span>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href={profilePath}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive(profilePath)
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <span className="text-xl">👤</span>
          <span className="font-medium">Perfil</span>
        </Link>

        <Link
          href={ticketsPath}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isActive(ticketsPath)
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <span className="text-xl">🎫</span>
          <span className="font-medium">Tickets</span>
        </Link>
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 
            text-white py-3 px-4 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl"
        >
          <span className="text-lg">🚪</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
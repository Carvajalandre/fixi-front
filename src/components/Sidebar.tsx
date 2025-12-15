"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "../lib/auth"

type SidebarProps = {
  isSupport?: boolean
}

export default function Sidebar({ isSupport = false }: SidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <aside className="w-64 bg-blue-600 text-white min-h-screen flex flex-col p-6">
      {/* Logo / Perfil */}
      <div className="mb-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-2">
          👤
        </div>
        <span className="text-sm">
          {isSupport ? "Soporte" : "Usuario"}
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-4 w-full">
        <Link
          href={isSupport ? "/dashboard/support/profile" : "/dashboard/profile"}
          className="block text-center py-2 rounded text-black hover:bg-green-400"
        >
          Perfil
        </Link>

        <Link
          href={isSupport ? "/dashboard/support/tickets" : "/dashboard/tickets"}
          className="block text-center py-2 rounded text-black hover:bg-green-400"
        >
          Tickets
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </aside>
  )
}

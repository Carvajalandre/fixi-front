"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout, getRole } from "../lib/auth"

export default function Sidebar() {
  const router = useRouter()
  const role = getRole()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6 text-blue-700">
        Fixi
      </h2>

      <nav className="space-y-4 text-black">
        <Link href="/dashboard" className="block hover:text-blue-600">
          Dashboard
        </Link>

        {role === "support" && (
          <Link
            href="/dashboard/support"
            className="block hover:text-blue-600"
          >
            Soporte
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 text-red-600 hover:underline"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
}

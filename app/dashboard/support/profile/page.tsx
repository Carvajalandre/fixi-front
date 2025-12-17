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
      role: rawUser.role === "support" ? "Soporte" : "Usuario"
    }

    setUser(normalizedUser)
  }, [])

  if (!user) return <p>Cargando perfil...</p>

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold mb-4">Mi perfil</h1>

      <label className="block text-sm mb-1">Nombre</label>
      <input
        value={user.name}
        readOnly
        className="w-full border p-2 rounded mb-4 bg-gray-100 cursor-not-allowed"
      />

      <label className="block text-sm mb-1">Correo</label>
      <input
        value={user.email}
        readOnly
        className="w-full border p-2 rounded mb-4 bg-gray-100 cursor-not-allowed"
      />

      <label className="block text-sm mb-1">Rol</label>
      <input
        value={user.role}
        readOnly
        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
      />
    </div>
  )
}

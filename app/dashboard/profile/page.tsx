"use client"
import { useState } from "react"

export default function ProfilePage() {
  const [name, setName] = useState("")

  const handleSave = () => {
    alert("Luego lo conectamos al backend 😄")
  }

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold mb-4">Mi perfil</h1>

      <label className="block mb-2">Nombre</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </div>
  )
}

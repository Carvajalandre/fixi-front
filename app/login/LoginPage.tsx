"use client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Error al iniciar sesión")
        return
      }

      const token = data.token
      const role = data.role.toLowerCase()

      localStorage.setItem("token", token)
      localStorage.setItem("role", role)

      if (role === "support") {
        window.location.href = "/dashboard/support"
      } else {
        window.location.href = "/dashboard"
      }

    } catch (error) {
      console.error(error)
      alert("No se pudo conectar con el servidor")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg border-2 border-blue-200 shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Iniciar Sesión
        </h2>

        <label className="block mb-2 text-black">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg text-black"
          required
        />

        <label className="block mb-2 text-black">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg text-black"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}

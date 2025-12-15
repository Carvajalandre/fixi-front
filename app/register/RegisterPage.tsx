"use client"
import { useState } from "react"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [areaId, setAreaId] = useState("1")
  const [supportCode, setSupportCode] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const endpoint = role === "user" ? "/register-user" : "/register-support"
      const payload = {
        full_name: fullName,
        email,
        password,
        area_id: areaId,
        ...(role === "support" && { support_code: supportCode }),
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return alert(data.error || "Error al registrarse")
      alert("Usuario registrado correctamente")
    } catch (err) {
      console.error(err)
      alert("Error al registrar usuario")
    }
  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border-2 border-blue-200 shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Registro</h2>

        <label className="block mb-2 text-black">Nombre completo</label>
        <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Nombre Completo"
        className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg placeholder-gray-400 text-black focus:outline-none focus:border-green-400 focus:shadow-md"
        required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg placeholder-gray-400 text-black focus:outline-none focus:border-green-400 focus:shadow-md"
          required
        />


        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg placeholder-gray-400 text-black focus:outline-none focus:border-green-400 focus:shadow-md"
          required
        />


        <label className="block mb-2 text-black">Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg placeholder-gray-400 text-black focus:outline-none focus:border-green-400 focus:shadow-md"
        >
          <option value="user">Usuario</option>
          <option value="support">Soporte</option>
        </select>
        {role === "support" && (
        <div className="mb-4">
          <label className="block mb-2 text-black">Código de soporte</label>
          <input
            type="text"
            value={supportCode}
            onChange={(e) => setSupportCode(e.target.value)}
            placeholder="Ingrese el código"
            className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg placeholder-gray-400 text-black focus:outline-none focus:border-green-400 focus:shadow-md"
            required
          />
        </div>
      )}

        <button
          type="submit"
          className="w-full py-2 bg-green-400 text-white font-semibold rounded hover:bg-green-500 transition"
        >
          Registrarse
        </button>
        
      </form>
    </main>
  )
}

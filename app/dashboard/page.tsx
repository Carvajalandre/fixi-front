"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "../../src/lib/api"

export default function DashboardPage() {
  const [message, setMessage] = useState("")

  useEffect(() => {
  const loadData = async () => {
    try {
      const res = await apiFetch("/me")
      if (!res.ok) return
      const data = await res.json()
      setMessage(`Bienvenido ${data.name}`)
    } catch {
      setMessage("Bienvenido")
    }
  }

    loadData()
    }, [])


  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>{message}</p>
    </div>
  )
}

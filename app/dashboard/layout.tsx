"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken, getRole } from "../../src/lib/auth"
import Sidebar from "../../src/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isSupport, setIsSupport] = useState(false)

  useEffect(() => {
    const token = getToken()
    const role = getRole()

    if (!token) {
      router.replace("/login")
      return
    }

    setIsSupport(role === "support")
    setMounted(true)
  }, [router])

  // ⛔ Evita renderizar hasta que el cliente esté listo
  if (!mounted) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar isSupport={isSupport} />
      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  )
}

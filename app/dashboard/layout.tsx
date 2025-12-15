"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "../../src/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace("/login")
    }
  }, [router])

  return (
    <section className="min-h-screen bg-gray-100">
      {children}
    </section>
  )
}

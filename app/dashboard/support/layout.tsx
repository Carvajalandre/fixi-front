"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken, getRole } from "../../../src/lib/auth"
import Sidebar from "../../../src/components/Sidebar"

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    const role = getRole()

    if (!token || role !== "support") {
      router.replace("/login")
    }
  }, [router])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}

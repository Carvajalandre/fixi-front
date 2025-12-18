import { getToken } from "./auth"

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  )

  return response
}
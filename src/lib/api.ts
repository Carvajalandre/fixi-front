import { getToken } from "./auth"

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = getToken()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...options.headers,
      },
    }
  )

if (res.status === 401 && endpoint !== "/me") {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  window.location.href = "/login"
  throw new Error("No autorizado")
}


  return res
}

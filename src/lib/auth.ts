export function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function getRole() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("role")
}

export async function getMe() {
  const token = getToken()
  if (!token) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json", // 🔴 CLAVE
    },
  })

  if (!res.ok) return null
  return res.json()
}


export function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
}

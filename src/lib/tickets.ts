const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getTickets() {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/tickets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Error al cargar tickets")
  return res.json()
}


export async function createTicket(title: string, description: string) {
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("user_id")

  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      requester_id: Number(userId),
      status_id: 1,
    }),
  })

  if (!res.ok) throw new Error("Error al crear ticket")
  return res.json()
}

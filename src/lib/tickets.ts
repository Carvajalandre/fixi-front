import { apiFetch } from "./api"

export async function getTickets() {
  const res = await apiFetch("/tickets")

  if (!res.ok) {
    throw new Error("Error al cargar tickets")
  }

  return res.json()
}

export async function createTicket(title: string, description: string) {
  const userId = localStorage.getItem("user_id")

  const res = await apiFetch("/tickets", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      requester_id: Number(userId),
      status_id: 1,
    }),
  })

  if (!res.ok) {
    throw new Error("Error al crear ticket")
  }

  return res.json()
}

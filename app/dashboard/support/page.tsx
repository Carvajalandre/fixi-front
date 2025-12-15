export default function SupportDashboard() {
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Panel de Soporte</h1>

      <p className="mb-6">
        Bienvenido al panel de soporte. Aquí podrás gestionar incidencias,
        clientes y solicitudes.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>📩 Tickets de soporte</li>
        <li>👥 Clientes asignados</li>
        <li>⚙️ Configuración</li>
      </ul>
    </div>
  )
}

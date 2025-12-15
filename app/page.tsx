export default function HomePage() {
  return (
    <main className="min-h-screen p-8 bg-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6 text-blue-700 text-center">
        Bienvenido a Fixi
      </h1>
      <p className="text-gray-700 text-lg text-center max-w-xl">
        Somos la plataforma ideal para el envío y gestión de tickets de soporte.
        Gestiona tus solicitudes de manera sencilla y eficiente.
      </p>

      <div className="mt-10 flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-green-400 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition"
        >
          Registrarse
        </a>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl">
      <div className="p-6 bg-celeste-light rounded-lg border-2 border-blue-200 shadow-lg">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Usuarios</h3>
        <p className="text-gray-700">Solicita tickets y realiza seguimiento de tus solicitudes.</p>
      </div>
      <div className="p-6 bg-celeste-light rounded-lg border-2 border-blue-200 shadow-lg">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Soporte</h3>
        <p className="text-gray-700">Administra tickets, actualiza estados y ayuda a los usuarios.</p>
      </div>
      <div className="p-6 bg-celeste-light rounded-lg border-2 border-blue-200 shadow-lg">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Seguridad</h3>
        <p className="text-gray-700">Control de roles y acceso seguro a la plataforma.</p>
      </div>
    </div>
    </main>
  )
}

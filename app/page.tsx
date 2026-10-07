import Link from "next/link";
import { BrandMark, Icons } from "../src/components/ui";

const features = [
  {
    icon: <Icons.ticket className="h-5 w-5" />,
    title: "Gestión de usuarios",
    description:
      "Crea tickets, adjunta contexto y haz seguimiento del avance en un solo lugar.",
  },
  {
    icon: <Icons.wrench className="h-5 w-5" />,
    title: "Operación de soporte",
    description:
      "Asigna responsables, actualiza estados y prioriza por criticidad.",
  },
  {
    icon: <Icons.shield className="h-5 w-5" />,
    title: "Acceso por roles",
    description:
      "Separación clara entre usuarios y equipo de soporte, con sesiones protegidas.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f5f5]">
      {/* Barra superior */}
      <header className="border-b border-[#e2e6e6] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="text-[15px] font-semibold leading-tight text-[#1f2a29]">
                Fixi
              </p>
              <p className="text-xs text-[#878787]">Sistema de tickets</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-[#3a4746] hover:bg-[#f4f5f5]"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-[#05AD98] px-4 py-2 text-sm font-semibold text-white hover:bg-[#048a7a]"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#bfe9e2] bg-[#e6f7f4] px-3 py-1 text-xs font-semibold text-[#03695e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#05AD98]" />
          Plataforma de soporte técnico
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl text-4xl md:text-5xl font-semibold tracking-tight text-[#1f2a29]">
          Gestión de tickets clara, ordenada y trazable
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#5b6665]">
          Centraliza solicitudes, asigna responsables y mide el avance de cada
          caso con estados bien definidos.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-[#05AD98] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#048a7a]"
          >
            Iniciar sesión
            <Icons.arrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-[#d4d9d9] bg-white px-5 py-2.5 text-sm font-semibold text-[#3a4746] hover:bg-[#eef1f1]"
          >
            Registrarse
          </Link>
        </div>

        {/* Indicadores sobrios */}
        <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-6 text-xs text-[#878787]">
          <span className="inline-flex items-center gap-1.5">
            <Icons.check className="h-4 w-4 text-[#05AD98]" /> Estados trazables
          </span>
          <span className="h-4 w-px bg-[#e2e6e6]" />
          <span className="inline-flex items-center gap-1.5">
            <Icons.check className="h-4 w-4 text-[#05AD98]" /> Roles separados
          </span>
          <span className="h-4 w-px bg-[#e2e6e6]" />
          <span className="inline-flex items-center gap-1.5">
            <Icons.check className="h-4 w-4 text-[#05AD98]" /> Seguimiento continuo
          </span>
        </div>
      </section>

      {/* Características */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[#e2e6e6] bg-white p-6 text-left shadow-[0_1px_2px_rgba(31,42,41,0.06)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f7f4] text-[#03695e]">
                {f.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-[#1f2a29]">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5b6665]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[#878787]">
          Fixi · Paleta corporativa: #BBBFBF · #878787 · #05AD98 · #FFFFFF
        </p>
      </section>
    </main>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { BrandMark, inputClasses, labelClasses } from "../../src/components/ui";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [areaId, setAreaId] = useState("1");
  const [supportCode, setSupportCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const endpoint = role === "user" ? "/register-user" : "/register-support";
      const payload = {
        full_name: fullName,
        email,
        password,
        area_id: areaId,
        ...(role === "support" && { support_code: supportCode }),
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo completar el registro.");
        return;
      }
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError("Error al registrar el usuario. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f5f5] px-4 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl border border-[#e2e6e6] shadow-[0_8px_30px_rgba(31,42,41,0.08)]"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <BrandMark size="lg" />
            <h2 className="mt-4 text-[22px] font-semibold tracking-tight text-[#1f2a29]">
              Crear cuenta
            </h2>
            <p className="mt-1 text-sm text-[#878787]">
              Únete a Fixi para gestionar tus solicitudes
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-[#f0dcb4] bg-[#fef6e7] px-3.5 py-2.5 text-[13px] font-medium text-[#92580a]"
            >
              {error}
            </div>
          )}

          <label htmlFor="fullName" className={labelClasses}>
            Nombre completo
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nombre y apellido"
            className={`${inputClasses} mb-4`}
            required
            autoComplete="name"
          />

          <label htmlFor="email" className={labelClasses}>
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@empresa.com"
            className={`${inputClasses} mb-4`}
            required
            autoComplete="email"
          />

          <label htmlFor="password" className={labelClasses}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className={`${inputClasses} mb-4`}
            required
            autoComplete="new-password"
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="role" className={labelClasses}>
                Rol
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={inputClasses}
              >
                <option value="user">Usuario</option>
                <option value="support">Soporte</option>
              </select>
            </div>
            <div>
              <label htmlFor="area" className={labelClasses}>
                Área
              </label>
              <select
                id="area"
                value={areaId}
                onChange={(e) => setAreaId(e.target.value)}
                className={inputClasses}
              >
                <option value="1">General</option>
                <option value="2">Técnica</option>
                <option value="3">Administración</option>
              </select>
            </div>
          </div>

          {role === "support" && (
            <div className="mb-4 rounded-lg border border-[#bfe9e2] bg-[#e6f7f4] p-3.5">
              <label htmlFor="supportCode" className={labelClasses}>
                Código de soporte
              </label>
              <input
                id="supportCode"
                type="text"
                value={supportCode}
                onChange={(e) => setSupportCode(e.target.value)}
                placeholder="Código autorizado"
                className={inputClasses}
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#05AD98] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#048a7a] disabled:opacity-70"
          >
            {loading ? "Creando cuenta…" : "Registrarse"}
          </button>

          <p className="mt-5 text-center text-[13px] text-[#878787]">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#03695e] hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

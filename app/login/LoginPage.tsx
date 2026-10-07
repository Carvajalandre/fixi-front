"use client";
import { useState } from "react";
import Link from "next/link";
import { BrandMark, inputClasses, labelClasses } from "../../src/components/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No se pudo iniciar sesión. Verifica tus datos.");
        return;
      }

      const token = data.token;
      const role = data.role.toLowerCase(); // "user" o "support"
      const user = data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", user.id.toString());
      localStorage.setItem("user", JSON.stringify({ ...user, role }));

      document.cookie = `token=${token}; path=/`;

      if (role === "support") {
        window.location.href = "/dashboard/support";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f5f5] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Misma estructura original: tarjeta centrada */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl border border-[#e2e6e6] shadow-[0_8px_30px_rgba(31,42,41,0.08)]"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <BrandMark size="lg" />
            <h2 className="mt-4 text-[22px] font-semibold tracking-tight text-[#1f2a29]">
              Iniciar sesión
            </h2>
            <p className="mt-1 text-sm text-[#878787]">
              Accede a tu panel de tickets de Fixi
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

          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className={labelClasses}>
              Contraseña
            </label>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`${inputClasses} mb-5`}
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#05AD98] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#048a7a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Verificando…" : "Entrar"}
          </button>

          <p className="mt-5 text-center text-[13px] text-[#878787]">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#03695e] hover:underline"
            >
              Crear cuenta
            </Link>
          </p>
        </form>

        <p className="mt-4 text-center text-xs text-[#878787]">
          Acceso protegido · Tus datos se mantienen en este dispositivo
        </p>
      </div>
    </main>
  );
}

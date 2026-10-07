"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getRole } from "../../src/lib/auth";
import Sidebar from "../../src/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSupport] = useState(() => getRole() === "support");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    // Puerta de hidratación: evita desajuste SSR/cliente al leer localStorage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-[#f4f5f5]">
      <Sidebar isSupport={isSupport} />
      <main className="flex-1 min-w-0 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

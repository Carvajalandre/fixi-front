import type { ReactNode } from "react";

/* ---------- Iconografía profesional (SVG, sin emojis) ---------- */

type IconProps = { className?: string };

function base(path: ReactNode, className = "") {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export const Icons = {
  ticket: (p: IconProps) =>
    base(
      <>
        <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2.5 2.5 0 0 0 0-5Z" />
        <path d="M13 5v2m0 3v0m0 3v0m0 3v2" strokeDasharray="1 2" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  plus: (p: IconProps) =>
    base(
      <>
        <path d="M12 5v14M5 12h14" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  user: (p: IconProps) =>
    base(
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  shield: (p: IconProps) =>
    base(
      <>
        <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
        <path d="M9.5 12l2 2 3.5-4" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  wrench: (p: IconProps) =>
    base(
      <>
        <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14.5 12.5l-2-2 2.2-4.2Z" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  logout: (p: IconProps) =>
    base(
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5M21 12H9" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  check: (p: IconProps) =>
    base(<path d="M4 12.5l5 5L20 6.5" />, p.className ?? "h-4 w-4"),
  clock: (p: IconProps) =>
    base(
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  chart: (p: IconProps) =>
    base(
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  alert: (p: IconProps) =>
    base(
      <>
        <path d="M12 3.5 22 20H2L12 3.5Z" />
        <path d="M12 10v4.5m0 2.5v.5" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  inbox: (p: IconProps) =>
    base(
      <>
        <path d="M3 13l2.5-7h13L21 13v6a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19v-6Z" />
        <path d="M3 13h6l1.5 2.5h3L15 13h6" />
      </>,
      p.className ?? "h-5 w-5"
    ),
  arrowRight: (p: IconProps) =>
    base(<path d="M4 12h16m-6-6 6 6-6 6" />, p.className ?? "h-4 w-4"),
};

/* ---------- Primitivas de UI ---------- */

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims =
    size === "lg"
      ? "h-11 w-11 text-[20px]"
      : size === "sm"
        ? "h-9 w-9 text-[15px]"
        : "h-10 w-10 text-[17px]";
  return (
    <div
      className={`${dims} rounded-xl bg-[#05AD98] text-white flex items-center justify-center font-bold tracking-tight shadow-sm`}
    >
      F
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#048a7a] mb-1">
          Fixi · Soporte
        </p>
        <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight text-[#1f2a29]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-[14px] text-[#5b6665] max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#e2e6e6] shadow-[0_1px_2px_rgba(31,42,41,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; classes: string; dot: string }> = {
    open: {
      label: "Abierto",
      classes:
        "bg-[#fef6e7] text-[#92580a] border-[#f0dcb4]",
      dot: "bg-[#d99a2b]",
    },
    in_progress: {
      label: "En progreso",
      classes:
        "bg-[#e6f7f4] text-[#03695e] border-[#bfe9e2]",
      dot: "bg-[#05AD98]",
    },
    finish: {
      label: "Finalizado",
      classes: "bg-[#eef1f1] text-[#3a4746] border-[#d4d9d9]",
      dot: "bg-[#878787]",
    },
  };
  const item = map[status] ?? {
    label: status || "Sin estado",
    classes: "bg-[#eef1f1] text-[#3a4746] border-[#d4d9d9]",
    dot: "bg-[#878787]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${item.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

export function LoadingState({ label = "Cargando…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#d4d9d9] border-t-[#05AD98] mx-auto mb-3" />
        <p className="text-sm text-[#5b6665]">{label}</p>
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef1f1] text-[#5b6665]">
        {icon ?? <Icons.inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-[15px] font-semibold text-[#1f2a29]">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-[#5b6665]">{description}</p>
      )}
    </Card>
  );
}

export const inputClasses =
  "w-full rounded-lg border border-[#d4d9d9] bg-white px-3.5 py-2.5 text-[14px] text-[#1f2a29] placeholder:text-[#878787] transition-shadow focus:border-[#05AD98] focus:ring-2 focus:ring-[#05AD98]/25 focus:outline-none";

export const labelClasses =
  "block text-[13px] font-semibold text-[#3a4746] mb-1.5";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#05AD98] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#048a7a] disabled:opacity-60 disabled:cursor-not-allowed";

export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#d4d9d9] bg-white px-4 py-2 text-sm font-semibold text-[#3a4746] transition-colors hover:bg-[#f4f5f5] hover:border-[#bbbfbf]";

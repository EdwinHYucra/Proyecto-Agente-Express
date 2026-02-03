import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  logoSrc: string;
};

export default function AutenticacionLayout({ children, logoSrc }: Props) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl bg-white border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Branding (en desktop) */}
          <aside className="hidden lg:flex relative flex-col justify-between p-10 bg-gradient-to-b from-[#0B4EA2] to-[#083B7A] text-white">
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="Agente Express"
                className="h-10 w-auto drop-shadow"
              />
              <div className="leading-tight">
                <p className="text-sm opacity-90">Agente Multibanco</p>
                <p className="text-xl font-semibold tracking-tight">
                  Express
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">
                Bienvenido de vuelta
              </h2>
              <p className="text-white/85 text-sm leading-relaxed max-w-md">
                Accede a tu panel para gestionar clientes, operaciones y reportes
                desde cualquier dispositivo.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
                  <p className="font-semibold">Seguro</p>
                  <p className="text-white/80 mt-1">Sesiones con token y control de acceso.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
                  <p className="font-semibold">Rápido</p>
                  <p className="text-white/80 mt-1">Interfaz ligera y optimizada.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/70">
              © {new Date().getFullYear()} Agente Express
            </p>

            {/* Decoración */}
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          </aside>

          {/* Contenido (login/registro) */}
          <main className="p-6 sm:p-10 lg:p-12">
            {/* Logo en mobile */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <img src={logoSrc} alt="Agente Express" className="h-10 w-auto" />
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

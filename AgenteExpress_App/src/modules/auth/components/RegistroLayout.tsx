import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  logoSrc: string;
  imagenSrc?: string;
  children: ReactNode;
  onVerRequisitos?: () => void;
};

export default function RegistroLayout({ logoSrc, imagenSrc, children, onVerRequisitos }: Props) {
  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panel Izquierdo */}
          <aside className="lg:col-span-4">
            <div className="h-full rounded-[28px] overflow-hidden shadow-sm border border-slate-200 bg-gradient-to-b from-[#0B4EA2] via-[#0B4EA2] to-[#0a3f84]">
              <div className="p-6">
                <div className="flex items-center justify-center">
                  <img
                    src={logoSrc}
                    alt="Agente Express"
                    className="h-14 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-3xl overflow-hidden bg-white/10 border border-white/15 shadow-sm">
                  {imagenSrc ? (
                    <img
                      src={imagenSrc}
                      alt="Registro"
                      className="w-full h-[420px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[420px] flex items-center justify-center text-white/80">
                      <span className="text-sm">Coloca una imagen en src/assets/registro.jpg</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-7">
                <Button
                  type="button"
                  onClick={onVerRequisitos}
                  className="w-full h-12 rounded-full bg-[#F2C200] hover:bg-[#E4B600] text-slate-900 font-semibold"
                >
                  Ver requisitos
                </Button>
              </div>
            </div>
          </aside>

          {/* Contenido Derecha */}
          <main className="lg:col-span-8">
            <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6 sm:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

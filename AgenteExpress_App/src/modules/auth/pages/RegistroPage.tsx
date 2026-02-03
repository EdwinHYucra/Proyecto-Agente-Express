import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AutenticacionLayout from "../components/AutenticacionLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ShieldCheck, Zap, ArrowRight } from "lucide-react";

import logo from "@/assets/logo.png";

type RegistroEtapa1 = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefonoMovil: string;
};

export default function RegistroPage() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState<RegistroEtapa1>({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefonoMovil: "",
  });

  const [errores, setErrores] = useState<Partial<Record<keyof RegistroEtapa1, string>>>({});

  const soloNumerosMovil = useMemo(() => datos.telefonoMovil.replace(/\D/g, ""), [datos.telefonoMovil]);

  const formularioValido = useMemo(() => {
    if (!datos.nombres.trim()) return false;
    if (!datos.apellidoPaterno.trim()) return false;
    if (!datos.telefonoMovil.trim()) return false;
    if (soloNumerosMovil.length < 9) return false;
    return true;
  }, [datos, soloNumerosMovil.length]);

  const onCambiar = (patch: Partial<RegistroEtapa1>) => {
    setDatos((p) => ({ ...p, ...patch }));
    // Limpieza suave de errores en vivo:
    setErrores((e) => {
      const nuevo = { ...e };
      Object.keys(patch).forEach((k) => delete nuevo[k as keyof RegistroEtapa1]);
      return nuevo;
    });
  };

  const validar = () => {
    const e: Partial<Record<keyof RegistroEtapa1, string>> = {};

    if (!datos.nombres.trim()) e.nombres = "Campo obligatorio.";
    if (!datos.apellidoPaterno.trim()) e.apellidoPaterno = "Campo obligatorio.";

    if (!datos.telefonoMovil.trim()) {
      e.telefonoMovil = "Campo obligatorio.";
    } else if (soloNumerosMovil.length < 9) {
      e.telefonoMovil = "Ingresa un número válido (9 dígitos).";
    }

    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const onContinuar = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validar()) return;

    // Guardamos Etapa 1 para continuar luego
    localStorage.setItem("registro_etapa1", JSON.stringify(datos));

    // Placeholder (Etapa 2 la armamos después)
    navigate("/registro/etapa-2");
  };

  return (
    <AutenticacionLayout logoSrc={logo}>
      <div className="w-full max-w-6xl mx-auto">
        {/* Layout principal: 1 col en mobile, 2 cols en md+ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Columna Form */}
          <div className="md:col-span-7 lg:col-span-7">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                Regístrate y sé agente Express
              </h1>
              <p className="text-sm text-slate-500">
                Completa tus datos personales para continuar con el registro.
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 lg:p-10">
              <form onSubmit={onContinuar} className="space-y-6">
                {/* Nombres + Apellidos: 1 col mobile, 3 cols desktop cómodo */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6 xl:col-span-4 space-y-2">
                    <Label htmlFor="nombres">Nombres *</Label>
                    <Input
                      id="nombres"
                      value={datos.nombres}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCambiar({ nombres: e.target.value })}
                      placeholder="Tus nombres"
                      className="h-11 rounded-xl"
                      autoComplete="given-name"
                    />
                    {errores.nombres && <p className="text-xs text-red-600">{errores.nombres}</p>}
                  </div>

                  <div className="col-span-12 md:col-span-6 xl:col-span-4 space-y-2">
                    <Label htmlFor="apellidoPaterno">Apellido paterno *</Label>
                    <Input
                      id="apellidoPaterno"
                      value={datos.apellidoPaterno}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onCambiar({ apellidoPaterno: e.target.value })
                      }
                      placeholder="Apellido paterno"
                      className="h-11 rounded-xl"
                      autoComplete="family-name"
                    />
                    {errores.apellidoPaterno && <p className="text-xs text-red-600">{errores.apellidoPaterno}</p>}
                  </div>

                  <div className="col-span-12 xl:col-span-4 space-y-2">
                    <Label htmlFor="apellidoMaterno">Apellido materno</Label>
                    <Input
                      id="apellidoMaterno"
                      value={datos.apellidoMaterno}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onCambiar({ apellidoMaterno: e.target.value })
                      }
                      placeholder="Opcional"
                      className="h-11 rounded-xl"
                      autoComplete="additional-name"
                    />
                  </div>
                </div>

                {/* Teléfono + hint */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 xl:col-span-7 space-y-2">
                    <Label htmlFor="telefonoMovil">Teléfono móvil *</Label>
                    <Input
                      id="telefonoMovil"
                      inputMode="numeric"
                      value={datos.telefonoMovil}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onCambiar({ telefonoMovil: e.target.value })
                      }
                      placeholder="Ej: 999 888 777"
                      className="h-11 rounded-xl"
                      autoComplete="tel"
                    />
                    <p className="text-xs text-slate-500">Usaremos este número para contactarte.</p>
                    {errores.telefonoMovil && <p className="text-xs text-red-600">{errores.telefonoMovil}</p>}
                  </div>

                  {/* En desktop ancho, un bloque visual que equilibra el diseño */}
                  <div className="hidden xl:block col-span-5">
                    <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-800">Siguiente paso</p>
                      <p className="text-xs text-slate-600 mt-1">
                        En la etapa 2 te pediremos correo, RUC, rubro y ubicación del local.
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold text-slate-800">Requisitos</p>
                          <p className="text-xs text-slate-500 mt-1">Correo · RUC · Rubro</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold text-slate-800">Ubicación</p>
                          <p className="text-xs text-slate-500 mt-1">Dep · Prov · Dist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                  <Button
                    type="submit"
                    disabled={!formularioValido}
                    className="h-11 rounded-2xl bg-[#0B4EA2] hover:bg-[#083B7A] text-white disabled:opacity-60"
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Link to="/login" className="text-sm text-slate-600 hover:underline">
                    Ya tengo cuenta, volver a iniciar sesión
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Columna lateral (md+): contenido de marca / confianza */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 h-full">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-900">Registro guiado</h2>
                <p className="text-sm text-slate-500">
                  Te tomará solo unos minutos. Mantendremos tus datos seguros.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mt-0.5">
                    <ShieldCheck className="h-5 w-5 text-[#0B4EA2]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Seguro</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Validación por etapas y control de acceso.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mt-0.5">
                    <Zap className="h-5 w-5 text-[#0B4EA2]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Rápido</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Interfaz ligera, optimizada para celular.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-slate-200 p-4">
                <p className="text-xs text-slate-600">
                  Tip: en celular, los campos se muestran en una columna para facilitar el ingreso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AutenticacionLayout>
  );
}

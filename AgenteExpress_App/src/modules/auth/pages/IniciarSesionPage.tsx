import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";

import AutenticacionLayout from "../components/AutenticacionLayout";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ✅ Ajusta la ruta según tu proyecto.
// La idea: el logo estará en src/assets/logo.png
import logo from "@/assets/logo.png";

// (opcional) tu servicio real
// import { iniciarSesion } from "../servicios/autenticacion.api";

type Formulario = {
  correo: string;
  contrasena: string;
};

export default function IniciarSesionPage() {
  const navigate = useNavigate();

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Formulario>({
    correo: "",
    contrasena: "",
  });

  const esValido = useMemo(() => {
    const correoOk = /^\S+@\S+\.\S+$/.test(form.correo.trim());
    const passOk = form.contrasena.trim().length >= 6;
    return correoOk && passOk;
  }, [form.correo, form.contrasena]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esValido) return;

    setCargando(true);
    setError(null);

    try {
      // ✅ Aquí conectas tu API.
      // Ejemplo:
      // const resp = await iniciarSesion({ correo: form.correo, contrasena: form.contrasena });
      // localStorage.setItem("token", resp.token);

      // Simulación rápida
      await new Promise((r) => setTimeout(r, 800));
      localStorage.setItem("token", "demo_token");

      // Redirige a dashboard (ajusta a tu ruta real)
      navigate("/dashboard");
    } catch {
      setError("Credenciales incorrectas o error de conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <AutenticacionLayout logoSrc={logo}>
      <div className="max-w-md mx-auto">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            Inicia sesión
          </h1>
          <p className="text-sm text-slate-500">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 shadow-sm bg-white p-6 sm:p-7">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Correo */}
            <div className="space-y-2">
              <Label htmlFor="correo" className="text-slate-700">
                Correo
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="correo"
                  type="email"
                  placeholder="tucorreo@dominio.com"
                  value={form.correo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm((p) => ({ ...p, correo: e.target.value }))
                  }
                  className="pl-10 h-11 rounded-2xl"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="contrasena" className="text-slate-700">
                  Contraseña
                </Label>
                <Link
                  to="/recuperar-contrasena"
                  className="text-xs font-medium text-[#0B4EA2] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="contrasena"
                  type={mostrarContrasena ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.contrasena}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm((p) => ({ ...p, contrasena: e.target.value }))
                  }
                  className="pl-10 pr-11 h-11 rounded-2xl"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarContrasena((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  aria-label={
                    mostrarContrasena
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {mostrarContrasena ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">Mínimo 6 caracteres.</p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Botón */}
            <Button
              type="submit"
              disabled={!esValido || cargando}
              className="w-full h-11 rounded-2xl bg-[#0B4EA2] hover:bg-[#083B7A] text-white font-medium"
            >
              {cargando ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Iniciando...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            <div className="relative py-1">
              <Separator />
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-2 text-xs text-slate-400">
                o
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-2xl border-slate-200"
              onClick={() => navigate("/registro")}
            >
              Registrarse
            </Button>

            <p className="text-center text-xs text-slate-500">
              Al continuar, aceptas los{" "}
              <Link to="/terminos" className="text-[#0B4EA2] hover:underline">
                términos y condiciones
              </Link>
              .
            </p>
          </form>
        </div>

        {/* Microinteracción: tip móvil */}
        <p className="mt-4 text-center text-xs text-slate-500">
          Tip: en celular, los campos son más grandes para facilitar el ingreso.
        </p>
      </div>
    </AutenticacionLayout>
  );
}

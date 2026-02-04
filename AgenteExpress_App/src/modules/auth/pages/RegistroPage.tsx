import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegistroLayout from "../components/RegistroLayout";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import logo from "@/assets/logo.png";
// ✅ Pon tu imagen como: src/assets/registro.jpg (o cambia el import)
import registroImg from "@/assets/Promo.jpeg";

type RegistroEtapa1 = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefonoMovil: string;

  sinCorreo: boolean;
  correo: string;

  sinRuc: boolean;
  ruc: string;

  rubro: string;

  departamento: string;
  provincia: string;
  distrito: string;
};

const rubros = [
  "Bodega / Minimarket",
  "Restaurante",
  "Ferretería",
  "Ropa y accesorios",
  "Servicios",
  "Otro",
];

// Demo ubigeo (luego lo conectamos a API o data real)
const ubicaciones: Record<string, Record<string, string[]>> = {
  Arequipa: {
    Arequipa: ["Cercado", "Yanahuara", "Cayma", "JLByR"],
    Camaná: ["Camaná", "Ocoña"],
  },
  Lima: {
    Lima: ["Miraflores", "San Isidro", "Surco"],
    Callao: ["Callao", "Bellavista"],
  },
};

export default function RegistroPage() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState<RegistroEtapa1>({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefonoMovil: "",

    sinCorreo: false,
    correo: "",

    sinRuc: false,
    ruc: "",

    rubro: "",

    departamento: "",
    provincia: "",
    distrito: "",
  });

  const [errores, setErrores] = useState<Partial<Record<keyof RegistroEtapa1, string>>>({});

  const departamentos = useMemo(() => Object.keys(ubicaciones), []);
  const provincias = useMemo(() => {
    if (!datos.departamento) return [];
    return Object.keys(ubicaciones[datos.departamento] ?? {});
  }, [datos.departamento]);

  const distritos = useMemo(() => {
    if (!datos.departamento || !datos.provincia) return [];
    return (ubicaciones[datos.departamento]?.[datos.provincia] ?? []) as string[];
  }, [datos.departamento, datos.provincia]);

  const onCambiar = (patch: Partial<RegistroEtapa1>) => {
    setDatos((p) => ({ ...p, ...patch }));
    setErrores((e) => {
      const n = { ...e };
      Object.keys(patch).forEach((k) => delete n[k as keyof RegistroEtapa1]);
      return n;
    });
  };

  const validar = () => {
    const e: Partial<Record<keyof RegistroEtapa1, string>> = {};

    if (!datos.nombres.trim()) e.nombres = "Campo obligatorio.";
    if (!datos.apellidoPaterno.trim()) e.apellidoPaterno = "Campo obligatorio.";

    const soloNumeros = datos.telefonoMovil.replace(/\D/g, "");
    if (!datos.telefonoMovil.trim()) e.telefonoMovil = "Campo obligatorio.";
    else if (soloNumeros.length < 9) e.telefonoMovil = "Ingresa un número válido (9 dígitos).";

    if (!datos.sinCorreo) {
      if (!datos.correo.trim()) e.correo = "Campo obligatorio.";
      else if (!/^\S+@\S+\.\S+$/.test(datos.correo.trim())) e.correo = "Correo inválido.";
    }

    if (!datos.sinRuc) {
      const rucNum = datos.ruc.replace(/\D/g, "");
      if (!datos.ruc.trim()) e.ruc = "Campo obligatorio.";
      else if (rucNum.length !== 11) e.ruc = "RUC inválido (11 dígitos).";
    }

    if (!datos.rubro) e.rubro = "Selecciona un rubro.";
    if (!datos.departamento) e.departamento = "Selecciona departamento.";
    if (!datos.provincia) e.provincia = "Selecciona provincia.";
    if (!datos.distrito) e.distrito = "Selecciona distrito.";

    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const onContinuar = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validar()) return;

    localStorage.setItem("registro_etapa1", JSON.stringify(datos));
    navigate("/registro/etapa-2");
  };

  return (
    <RegistroLayout
      logoSrc={logo}
      imagenSrc={registroImg}
      onVerRequisitos={() => {
        // luego lo hacemos modal o página
        alert("Requisitos: correo (opcional), RUC (opcional), rubro y ubicación del local.");
      }}
    >
      <form onSubmit={onContinuar} className="space-y-8">
        {/* Título */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Regístrate y sé agente Express
          </h1>
          <p className="text-sm text-slate-500">
            Completa el formulario con tus datos.
          </p>
        </div>

        {/* Datos personales */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres *</Label>
              <Input
                id="nombres"
                value={datos.nombres}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCambiar({ nombres: e.target.value })}
                placeholder="Nombres"
                className="h-11 rounded-none border-0 border-b border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {errores.nombres && <p className="text-xs text-red-600">{errores.nombres}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellidoPaterno">Apellido paterno *</Label>
              <Input
                id="apellidoPaterno"
                value={datos.apellidoPaterno}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onCambiar({ apellidoPaterno: e.target.value })
                }
                placeholder="Apellido paterno"
                className="h-11 rounded-none border-0 border-b border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {errores.apellidoPaterno && <p className="text-xs text-red-600">{errores.apellidoPaterno}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellidoMaterno">Apellido materno</Label>
              <Input
                id="apellidoMaterno"
                value={datos.apellidoMaterno}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onCambiar({ apellidoMaterno: e.target.value })
                }
                placeholder="Apellido materno"
                className="h-11 rounded-none border-0 border-b border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2 sm:col-span-1">
              <Label htmlFor="telefonoMovil">Teléfono móvil *</Label>
              <Input
                id="telefonoMovil"
                inputMode="numeric"
                value={datos.telefonoMovil}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onCambiar({ telefonoMovil: e.target.value })
                }
                placeholder="Ej: 999 888 777"
                className="h-11 rounded-none border-0 border-b border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {errores.telefonoMovil && <p className="text-xs text-red-600">{errores.telefonoMovil}</p>}
            </div>
          </div>
        </div>

        <Separator />

        {/* Requisitos (checks + correo/ruc/rubro) */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Indicar si no cuenta con alguno de estos requisitos:
          </h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <Checkbox
                checked={datos.sinCorreo}
                onCheckedChange={(v) => {
                  const marcado = v === true; // evita "indeterminate"
                  onCambiar({
                    sinCorreo: marcado,
                    correo: marcado ? "" : datos.correo,
                  });
                }}
              />
              No tengo correo electrónico
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <Checkbox
                checked={datos.sinRuc}
                onCheckedChange={(v) => {
                  const marcado = v === true;
                  onCambiar({
                    sinRuc: marcado,
                    ruc: marcado ? "" : datos.ruc,
                  });
                }}
              />
              No tengo RUC
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="correo">Correo {datos.sinCorreo ? "" : "*"}</Label>
              <Input
                id="correo"
                value={datos.correo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCambiar({ correo: e.target.value })}
                placeholder="tucorreo@dominio.com"
                disabled={datos.sinCorreo}
                className="h-11 rounded-none border-0 border-b border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60"
              />
              {errores.correo && <p className="text-xs text-red-600">{errores.correo}</p>}
            </div>

            <div className="space-y-2">
              <Label>Rubro / Tipo de negocio *</Label>
              <Select value={datos.rubro} onValueChange={(v) => onCambiar({ rubro: v })}>
                <SelectTrigger className="h-11 rounded-none border-0 border-b border-slate-300 focus:ring-0">
                  <SelectValue placeholder="Selecciona un rubro" />
                </SelectTrigger>
                <SelectContent>
                  {rubros.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errores.rubro && <p className="text-xs text-red-600">{errores.rubro}</p>}
            </div>
          </div>

          {/* RUC (si aplica) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ruc">RUC {datos.sinRuc ? "" : "*"}</Label>
              <Input
                id="ruc"
                value={datos.ruc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCambiar({ ruc: e.target.value })}
                placeholder="11 dígitos"
                disabled={datos.sinRuc}
                className="h-11 rounded-none border-0 border-b border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60"
              />
              {errores.ruc && <p className="text-xs text-red-600">{errores.ruc}</p>}
            </div>
            <div />
          </div>
        </div>

        <Separator />

        {/* Ubicación */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">Ubicación de tu local:</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Departamento *</Label>
              <Select
                value={datos.departamento}
                onValueChange={(v) => onCambiar({ departamento: v, provincia: "", distrito: "" })}
              >
                <SelectTrigger className="h-11 rounded-none border-0 border-b border-slate-300 focus:ring-0">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {departamentos.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errores.departamento && <p className="text-xs text-red-600">{errores.departamento}</p>}
            </div>

            <div className="space-y-2">
              <Label>Provincia *</Label>
              <Select
                value={datos.provincia}
                onValueChange={(v) => onCambiar({ provincia: v, distrito: "" })}
                disabled={!datos.departamento}
              >
                <SelectTrigger className="h-11 rounded-none border-0 border-b border-slate-300 focus:ring-0 disabled:opacity-60">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {provincias.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errores.provincia && <p className="text-xs text-red-600">{errores.provincia}</p>}
            </div>

            <div className="space-y-2">
              <Label>Distrito *</Label>
              <Select
                value={datos.distrito}
                onValueChange={(v) => onCambiar({ distrito: v })}
                disabled={!datos.provincia}
              >
                <SelectTrigger className="h-11 rounded-none border-0 border-b border-slate-300 focus:ring-0 disabled:opacity-60">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {distritos.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errores.distrito && <p className="text-xs text-red-600">{errores.distrito}</p>}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
          <Button
            type="submit"
            className="h-11 px-10 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold"
          >
            CONTINUAR
          </Button>

          <Link to="/login" className="text-sm font-semibold text-slate-900 hover:underline">
            SALIR
          </Link>
        </div>
      </form>
    </RegistroLayout>
  );
}

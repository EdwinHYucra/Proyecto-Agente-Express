import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Divider,
  Paper,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

import RegistroLayout from "../components/RegistroLayout";
import CuentaCreadaDialog from "../components/CuentaCreadaDialog";

type FormState = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;

  sinCorreo: boolean;
  sinRuc: boolean;

  correo: string;
  rubro: string;

  departamento: string;
  provincia: string;
  distrito: string;
};

type Touched = Partial<Record<keyof FormState, boolean>>;

export default function DatosPersonalesPage() {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [touched, setTouched] = useState<Touched>({});

  const [form, setForm] = useState<FormState>({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    sinCorreo: false,
    sinRuc: false,
    correo: "",
    rubro: "",
    departamento: "",
    provincia: "",
    distrito: "",
  });

  // DEMO data (luego lo conectas a ubigeo real)
  const rubros = ["Bodega", "Farmacia", "Restaurante", "Servicios", "Otro"];
  const departamentos = ["Arequipa", "Lima", "Cusco"];
  const provincias = ["Arequipa", "Caylloma", "Camaná"];
  const distritos = ["Cayma", "Cerro Colorado", "Yanahuara"];

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const markTouched = (k: keyof FormState) =>
    setTouched((p) => ({ ...p, [k]: true }));

  const correoValido = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim());

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState | "sinCorreoMsg", string>> = {};

    if (!form.nombres.trim()) e.nombres = "Requerido.";
    if (!form.apellidoPaterno.trim()) e.apellidoPaterno = "Requerido.";
    if (!form.telefono.trim()) e.telefono = "Requerido.";

    // correo obligatorio (si marca sinCorreo, bloquear)
    if (form.sinCorreo) {
      e.sinCorreoMsg = "El correo es obligatorio para completar el registro.";
    } else {
      if (!form.correo.trim()) e.correo = "Requerido.";
      else if (!correoValido(form.correo)) e.correo = "Ingresa un correo válido.";
    }

    if (!form.rubro) e.rubro = "Selecciona un rubro.";

    if (!form.departamento) e.departamento = "Requerido.";
    if (!form.provincia) e.provincia = "Requerido.";
    if (!form.distrito) e.distrito = "Requerido.";

    return e;
  }, [form]);

  const canSubmit = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const forceTouchedMain = () => {
    setTouched({
      nombres: true,
      apellidoPaterno: true,
      telefono: true,
      sinCorreo: true,
      correo: true,
      rubro: true,
      departamento: true,
      provincia: true,
      distrito: true,
    });
  };

  const onContinuar = () => {
    forceTouchedMain();
    if (!canSubmit) return;

    // TODO: llamar API para crear cuenta
    setOpenDialog(true);
  };

  return (
    <RegistroLayout>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 950, letterSpacing: -0.6 }}>
          Regístrate y sé agente Express
        </Typography>

        <Typography sx={{ mt: 0.6, color: "text.secondary" }}>
          Etapa 1: Datos personales y ubicación de tu local.
        </Typography>

        <Divider sx={{ my: 2.2 }} />

        {/* Panel form (más compacto y pro) */}
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2, sm: 2.2 },
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,252,255,1) 100%)",
          }}
        >
          {/* Datos personales */}
          <Typography sx={{ fontWeight: 950, mb: 1.2 }}>
            Datos personales
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 1.6,
            }}
          >
            <TextField
              size="small"
              label="Nombres *"
              value={form.nombres}
              onChange={(e) => set("nombres", e.target.value)}
              onBlur={() => markTouched("nombres")}
              error={!!(touched.nombres && errors.nombres)}
              helperText={touched.nombres ? errors.nombres : " "}
              fullWidth
            />

            <TextField
              size="small"
              label="Apellido paterno *"
              value={form.apellidoPaterno}
              onChange={(e) => set("apellidoPaterno", e.target.value)}
              onBlur={() => markTouched("apellidoPaterno")}
              error={!!(touched.apellidoPaterno && errors.apellidoPaterno)}
              helperText={touched.apellidoPaterno ? errors.apellidoPaterno : " "}
              fullWidth
            />

            <TextField
              size="small"
              label="Apellido materno"
              value={form.apellidoMaterno}
              onChange={(e) => set("apellidoMaterno", e.target.value)}
              helperText=" "
              fullWidth
            />
          </Box>

          {/* teléfono: 1 columna, pero alineado */}
          <Box sx={{ mt: 0.4, maxWidth: { xs: "100%", sm: 360 } }}>
            <TextField
              size="small"
              label="Teléfono móvil *"
              value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              onBlur={() => markTouched("telefono")}
              error={!!(touched.telefono && errors.telefono)}
              helperText={touched.telefono ? errors.telefono : " "}
              fullWidth
            />
          </Box>

          <Divider sx={{ my: 1.6 }} />

          {/* Requisitos */}
          <Typography sx={{ fontWeight: 950, mb: 0.8 }}>
            Requisitos
          </Typography>

          <Typography sx={{ color: "text.secondary", fontSize: 13, mb: 1 }}>
            Indica si no cuentas con alguno de estos requisitos:
          </Typography>

          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 0.6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.sinCorreo}
                  onChange={(e) => set("sinCorreo", e.target.checked)}
                  onBlur={() => markTouched("sinCorreo")}
                />
              }
              label="No tengo correo electrónico"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.sinRuc}
                  onChange={(e) => set("sinRuc", e.target.checked)}
                />
              }
              label="No tengo RUC"
            />
          </Box>

          {/* aviso fuerte (bloquea continuar) */}
          {touched.sinCorreo && errors.sinCorreoMsg && (
            <Typography sx={{ color: "error.main", fontSize: 12.5, mb: 1 }}>
              {errors.sinCorreoMsg}
            </Typography>
          )}

          {/* Correo + Rubro */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 1.6,
              mt: 0.6,
            }}
          >
            <TextField
              size="small"
              label="Correo *"
              value={form.correo}
              onChange={(e) => set("correo", e.target.value)}
              onBlur={() => markTouched("correo")}
              disabled={form.sinCorreo}
              error={!!(touched.correo && errors.correo)}
              helperText={
                form.sinCorreo
                  ? "El correo es obligatorio para continuar."
                  : touched.correo
                  ? errors.correo
                  : " "
              }
              fullWidth
            />

            <FormControl
              size="small"
              error={!!(touched.rubro && errors.rubro)}
              fullWidth
              sx={{
                minWidth: 240, // evita que se “contraiga”
              }}
            >
              <InputLabel id="rubro-label">Rubro / Tipo de negocio *</InputLabel>
              <Select
                labelId="rubro-label"
                label="Rubro / Tipo de negocio *"
                value={form.rubro}
                onChange={(e: SelectChangeEvent) => set("rubro", e.target.value as string)}
                onBlur={() => markTouched("rubro")}
                fullWidth
                MenuProps={{ PaperProps: { style: { maxHeight: 320 } } }}
              >
                {rubros.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {touched.rubro ? errors.rubro || " " : " "}
              </FormHelperText>
            </FormControl>
          </Box>

          <Divider sx={{ my: 1.6 }} />

          {/* Ubicación */}
          <Typography sx={{ fontWeight: 950, mb: 1 }}>
            Ubicación de tu local
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 1.6,
            }}
          >
            <FormControl
              size="small"
              error={!!(touched.departamento && errors.departamento)}
              fullWidth
              sx={{ minWidth: 220 }}
            >
              <InputLabel id="dep-label">Departamento *</InputLabel>
              <Select
                labelId="dep-label"
                label="Departamento *"
                value={form.departamento}
                onChange={(e: SelectChangeEvent) => set("departamento", e.target.value as string)}
                onBlur={() =>_toggleTouched(markTouched, "departamento")}
                fullWidth
              >
                {departamentos.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {touched.departamento ? errors.departamento || " " : " "}
              </FormHelperText>
            </FormControl>

            <FormControl
              size="small"
              error={!!(touched.provincia && errors.provincia)}
              fullWidth
              sx={{ minWidth: 220 }}
            >
              <InputLabel id="prov-label">Provincia *</InputLabel>
              <Select
                labelId="prov-label"
                label="Provincia *"
                value={form.provincia}
                onChange={(e: SelectChangeEvent) => set("provincia", e.target.value as string)}
                onBlur={() => markTouched("provincia")}
                fullWidth
              >
                {provincias.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {touched.provincia ? errors.provincia || " " : " "}
              </FormHelperText>
            </FormControl>

            <FormControl
              size="small"
              error={!!(touched.distrito && errors.distrito)}
              fullWidth
              sx={{ minWidth: 220 }}
            >
              <InputLabel id="dist-label">Distrito *</InputLabel>
              <Select
                labelId="dist-label"
                label="Distrito *"
                value={form.distrito}
                onChange={(e: SelectChangeEvent) => set("distrito", e.target.value as string)}
                onBlur={() => markTouched("distrito")}
                fullWidth
              >
                {distritos.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {touched.distrito ? errors.distrito || " " : " "}
              </FormHelperText>
            </FormControl>
          </Box>

          {/* Acciones */}
          <Box sx={{ display: "flex", gap: 1.4, mt: 2.2, alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={onContinuar}
              disabled={!canSubmit}
              sx={{
                borderRadius: 999,
                px: 4,
                py: 1.15,
                textTransform: "none",
                fontWeight: 950,
              }}
            >
              Continuar
            </Button>

            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: 999,
                px: 2,
                textTransform: "none",
                fontWeight: 900,
              }}
            >
              Salir
            </Button>
          </Box>
        </Paper>

        <CuentaCreadaDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onGoLogin={() => navigate("/login")}
        />
      </Box>
    </RegistroLayout>
  );
}

/**
 * Helper mínimo para evitar warnings de lint si quieres.
 * Puedes borrarlo y usar markTouched directo.
 */
function _toggleTouched(
  mark: (k: any) => void,
  key: any
) {
  mark(key);
}

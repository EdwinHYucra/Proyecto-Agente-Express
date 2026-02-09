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
} from "@mui/material";
import Grid from "@mui/material/Grid2";

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

export default function DatosPersonalesPage() {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  // Simples datos demo (luego lo conectas a tu ubigeo real)
  const rubros = ["Bodega", "Farmacia", "Restaurante", "Servicios", "Otro"];
  const departamentos = ["Arequipa", "Lima", "Cusco"];
  const provincias = ["Arequipa", "Caylloma", "Camaná"];
  const distritos = ["Cayma", "Cerro Colorado", "Yanahuara"];

  const set = (k: keyof FormState, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const correoValido = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim());

  const errors = useMemo(() => {
    const e: Record<string, string> = {};

    if (!form.nombres.trim()) e.nombres = "Requerido.";
    if (!form.apellidoPaterno.trim()) e.apellidoPaterno = "Requerido.";
    if (!form.telefono.trim()) e.telefono = "Requerido.";

    // ✅ Correo es principal: si marca sinCorreo, NO puede continuar
    if (form.sinCorreo) {
      e.sinCorreo = "El correo es obligatorio para completar el registro.";
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

  const marcarTouched = (key: string) =>
    setTouched((p) => ({ ...p, [key]: true }));

  const onContinuar = () => {
    // fuerza “touched” en campos clave
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

    if (!canSubmit) return;

    // aquí luego llamas a tu API para crear la cuenta
    // por ahora: abre modal de éxito
    setOpenDialog(true);
  };

  return (
    <RegistroLayout>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.4 }}>
          Regístrate y sé agente Express
        </Typography>

        <Typography sx={{ mt: 0.6, color: "text.secondary" }}>
          Etapa 1: Datos personales y ubicación de tu local.
        </Typography>

        <Divider sx={{ my: 2.2 }} />

        {/* Datos personales */}
        <Grid container spacing={1.8}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Nombres *"
              value={form.nombres}
              onChange={(e) => set("nombres", e.target.value)}
              onBlur={() => marcarTouched("nombres")}
              error={!!(touched.nombres && errors.nombres)}
              helperText={touched.nombres ? errors.nombres : " "}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Apellido paterno *"
              value={form.apellidoPaterno}
              onChange={(e) => set("apellidoPaterno", e.target.value)}
              onBlur={() => marcarTouched("apellidoPaterno")}
              error={!!(touched.apellidoPaterno && errors.apellidoPaterno)}
              helperText={touched.apellidoPaterno ? errors.apellidoPaterno : " "}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Apellido materno"
              value={form.apellidoMaterno}
              onChange={(e) => set("apellidoMaterno", e.target.value)}
              helperText=" "
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Teléfono móvil *"
              value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              onBlur={() => marcarTouched("telefono")}
              error={!!(touched.telefono && errors.telefono)}
              helperText={touched.telefono ? errors.telefono : " "}
            />
          </Grid>
        </Grid>

        {/* Requisitos */}
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ fontWeight: 800, mt: 1.2 }}>
            Indicar si no cuenta con alguno de estos requisitos:
          </Typography>

          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 0.6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.sinCorreo}
                  onChange={(e) => set("sinCorreo", e.target.checked)}
                  onBlur={() => marcarTouched("sinCorreo")}
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

          {/* error principal si marca sinCorreo */}
          {touched.sinCorreo && errors.sinCorreo && (
            <Typography sx={{ mt: 0.5, color: "error.main", fontSize: 12 }}>
              {errors.sinCorreo}
            </Typography>
          )}
        </Box>

        {/* Correo + Rubro */}
        <Grid container spacing={1.8} sx={{ mt: 0.6 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Correo *"
              value={form.correo}
              onChange={(e) => set("correo", e.target.value)}
              onBlur={() => marcarTouched("correo")}
              disabled={form.sinCorreo}
              error={!!(touched.correo && errors.correo)}
              helperText={
                form.sinCorreo
                  ? "El correo es obligatorio para continuar."
                  : touched.correo
                  ? errors.correo
                  : " "
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              size="small"
              error={!!(touched.rubro && errors.rubro)}
            >
              <InputLabel>Rubro / Tipo de negocio *</InputLabel>
              <Select
                label="Rubro / Tipo de negocio *"
                value={form.rubro}
                onChange={(e) => set("rubro", e.target.value)}
                onBlur={() => marcarTouched("rubro")}
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
          </Grid>
        </Grid>

        {/* Ubicación */}
        <Typography sx={{ fontWeight: 900, mt: 1.6 }}>
          Ubicación de tu local:
        </Typography>

        <Grid container spacing={1.8} sx={{ mt: 0.4 }}>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              error={!!(touched.departamento && errors.departamento)}
            >
              <InputLabel>Departamento *</InputLabel>
              <Select
                label="Departamento *"
                value={form.departamento}
                onChange={(e) => set("departamento", e.target.value)}
                onBlur={() => marcarTouched("departamento")}
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
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              error={!!(touched.provincia && errors.provincia)}
            >
              <InputLabel>Provincia *</InputLabel>
              <Select
                label="Provincia *"
                value={form.provincia}
                onChange={(e) => set("provincia", e.target.value)}
                onBlur={() => marcarTouched("provincia")}
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
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              error={!!(touched.distrito && errors.distrito)}
            >
              <InputLabel>Distrito *</InputLabel>
              <Select
                label="Distrito *"
                value={form.distrito}
                onChange={(e) => set("distrito", e.target.value)}
                onBlur={() => marcarTouched("distrito")}
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
          </Grid>
        </Grid>

        {/* Acciones */}
        <Box sx={{ display: "flex", gap: 1.5, mt: 2.2, alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={onContinuar}
            disabled={!canSubmit}
            sx={{
              borderRadius: 999,
              px: 4,
              py: 1.1,
              textTransform: "none",
              fontWeight: 900,
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
              fontWeight: 800,
            }}
          >
            Salir
          </Button>
        </Box>

        <CuentaCreadaDialog open={openDialog} onClose={() => setOpenDialog(false)} />
      </Box>
    </RegistroLayout>
  );
}

import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import AutenticacionLayoutMUI from "../components/AutenticacionLayout";
import logo from "@/assets/logo.png";

type Formulario = {
  correo: string;
  contrasena: string;
};

const COLOR_AZUL = "#0B4EA2";

export default function IniciarSesionPage() {
  const navigate = useNavigate();

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Formulario>({
    correo: "",
    contrasena: "",
  });

  const correoValido = useMemo(
    () => /^\S+@\S+\.\S+$/.test(form.correo.trim()),
    [form.correo]
  );

  const passValido = useMemo(
    () => form.contrasena.trim().length >= 6,
    [form.contrasena]
  );

  const esValido = correoValido && passValido;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esValido) return;

    setCargando(true);
    setError(null);

    try {
      // TODO: conectar API real
      await new Promise((r) => setTimeout(r, 700));
      localStorage.setItem("token", "demo_token");
      navigate("/dashboard");
    } catch {
      setError("Credenciales incorrectas o error de conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <AutenticacionLayoutMUI>
      {/* Logo arriba */}
      <Stack alignItems="center" sx={{ mb: 2 }}>
        <Box
          component="img"
          src={logo}
          alt="Agente Express"
          sx={{ height: 76, width: "auto" }}
        />
      </Stack>

      <Stack spacing={1.1} alignItems="center" textAlign="center">
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, letterSpacing: -0.6, color: "#0f172a" }}
        >
          Inicia sesión
        </Typography>
        <Typography sx={{ color: "rgba(15,23,42,.65)" }}>
          Ingresa tus credenciales para continuar
        </Typography>
      </Stack>

      {/* Card interno del formulario */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: { xs: 2.5, sm: 3 },
          borderRadius: 6,
          border: "1px solid rgba(15,23,42,.10)",
          background: "rgba(255,255,255,.88)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Mancha interna sutil (dentro del form card) */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `
              radial-gradient(420px 240px at 15% 15%, rgba(11,78,162,.10) 0%, rgba(11,78,162,0) 60%),
              radial-gradient(360px 220px at 85% 65%, rgba(16,185,129,.08) 0%, rgba(16,185,129,0) 62%)
            `,
          }}
        />

        <Box component="form" onSubmit={onSubmit} sx={{ position: "relative" }}>
          <Stack spacing={2.1}>
            {/* Correo */}
            <Box>
              <Typography sx={{ fontWeight: 800, mb: 0.8, color: "#0f172a" }}>
                Correo
              </Typography>

              <TextField
                fullWidth
                placeholder="tucorreo@dominio.com"
                value={form.correo}
                onChange={(e) =>
                  setForm((p) => ({ ...p, correo: e.target.value }))
                }
                error={form.correo.length > 0 && !correoValido}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon sx={{ color: "rgba(15,23,42,.55)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#fff",
                  },
                }}
              />

              {form.correo.length > 0 && !correoValido && (
                <FormHelperText sx={{ color: "#dc2626", mt: 0.8 }}>
                  Ingresa un correo válido.
                </FormHelperText>
              )}
            </Box>

            {/* Contraseña */}
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 0.8 }}
              >
                <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>
                  Contraseña
                </Typography>

                <Link
                  component={RouterLink}
                  to="/recuperar-contrasena"
                  underline="hover"
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: COLOR_AZUL,
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Stack>

              <TextField
                fullWidth
                type={mostrarContrasena ? "text" : "password"}
                placeholder="••••••••"
                value={form.contrasena}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contrasena: e.target.value }))
                }
                error={form.contrasena.length > 0 && !passValido}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "rgba(15,23,42,.55)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setMostrarContrasena((v) => !v)}
                        edge="end"
                        aria-label={
                          mostrarContrasena
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                      >
                        {mostrarContrasena ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#fff",
                  },
                }}
              />

              <FormHelperText sx={{ mt: 0.8, color: "rgba(15,23,42,.60)" }}>
                Mínimo 6 caracteres.
              </FormHelperText>
            </Box>

            {/* Error */}
            {error && (
              <Box
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(220,38,38,.25)",
                  background: "rgba(220,38,38,.06)",
                  px: 2,
                  py: 1.4,
                  color: "#b91c1c",
                  fontWeight: 700,
                }}
              >
                {error}
              </Box>
            )}

            {/* Botón */}
            <Button
              type="submit"
              disabled={!esValido || cargando}
              variant="contained"
              sx={{
                height: 52,
                borderRadius: 999,
                fontWeight: 900,
                letterSpacing: 0.2,
                textTransform: "none",
                backgroundColor: COLOR_AZUL,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#083B7A", boxShadow: "none" },
                "&:disabled": { backgroundColor: "rgba(15,23,42,.12)" },
              }}
            >
              {cargando ? "Iniciando..." : "Iniciar sesión"}
            </Button>

            {/* Separador */}
            <Box sx={{ position: "relative", py: 0.5 }}>
              <Divider />
              <Typography
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  px: 1.5,
                  background: "rgba(255,255,255,.88)",
                  color: "rgba(15,23,42,.55)",
                  fontWeight: 900,
                  fontSize: 12,
                }}
              >
                o
              </Typography>
            </Box>

            {/* Registro */}
            <Button
              variant="outlined"
              onClick={() => navigate("/registro")}
              sx={{
                height: 52,
                borderRadius: 999,
                fontWeight: 900,
                textTransform: "none",
                borderColor: "rgba(11,78,162,.45)",
                color: COLOR_AZUL,
                "&:hover": {
                  borderColor: COLOR_AZUL,
                  background: "rgba(11,78,162,.06)",
                },
              }}
            >
              Registrarse
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: 13,
                color: "rgba(15,23,42,.65)",
              }}
            >
              Al continuar, aceptas los{" "}
              <Link
                component={RouterLink}
                to="/terminos"
                underline="hover"
                sx={{ fontWeight: 900, color: COLOR_AZUL }}
              >
                términos y condiciones
              </Link>
              .
            </Typography>
          </Stack>
        </Box>
      </Paper>

      {/* Tip afuera del card */}
      <Typography
        sx={{
          mt: 2.2,
          textAlign: "center",
          fontSize: 13,
          color: "rgba(15,23,42,.60)",
        }}
      >
        Tip: en celular, los campos son más grandes para facilitar el ingreso.
      </Typography>
    </AutenticacionLayoutMUI>
  );
}

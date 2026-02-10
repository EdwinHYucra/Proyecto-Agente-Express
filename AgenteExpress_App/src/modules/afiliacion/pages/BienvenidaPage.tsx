import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
} from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const BRAND = {
  green: "#0EA342",
  greenHover: "#0C8C38",
};

export default function BienvenidaPage() {
  const navigate = useNavigate();

  const [aceptaAutenticidad, setAceptaAutenticidad] = useState(false);
  const [aceptaDatos, setAceptaDatos] = useState(false);
  const [touched, setTouched] = useState(false);

  const canNext = useMemo(
    () => aceptaAutenticidad && aceptaDatos,
    [aceptaAutenticidad, aceptaDatos],
  );

  const onNext = () => {
    setTouched(true);
    if (!canNext) return;

    // siguiente fase (ejemplo):
    // navigate("/afiliacion/fase-2");
    navigate("/afiliacion/fase-2");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 980,
          borderRadius: 4,
          border: "1px solid rgba(15,23,42,.10)",
          overflow: "hidden",
          boxShadow: "0 18px 45px rgba(2, 8, 23, .10)",
          bgcolor: "rgba(255,255,255,.92)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Header interno de la tarjeta */}
        <Box
          sx={{
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.2, md: 3 },
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderBottom: "1px solid rgba(15,23,42,.08)",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(11,78,162,.12)",
              color: "#0B4EA2",
            }}
          >
            <HandshakeIcon />
          </Box>

          <Box>
            <Typography
              sx={{ fontWeight: 950, letterSpacing: -0.3, fontSize: 20 }}
            >
              ¡Bienvenido a la familia de Agente Express!
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 0.2 }}>
              Antes de iniciar tu proceso de afiliación, acepta la declaración
              jurada.
            </Typography>
          </Box>
        </Box>

        {/* Contenido */}
        <Box sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 2.5, md: 3 } }}>
          <Typography sx={{ mb: 2, lineHeight: 1.6 }}>
            Estimado cliente, requerimos aceptes la siguiente{" "}
            <b>DECLARACIÓN JURADA DE AUTENTICIDAD DE DOCUMENTOS</b> antes de
            iniciar tu proceso de afiliación.
          </Typography>

          <Stack spacing={0.8}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={aceptaAutenticidad}
                  onChange={(e) => setAceptaAutenticidad(e.target.checked)}
                />
              }
              label="Declaro bajo juramento que los documentos son auténticos"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={aceptaDatos}
                  onChange={(e) => setAceptaDatos(e.target.checked)}
                />
              }
              label="Autorizo el tratamiento de mis datos personales"
            />
          </Stack>

          {touched && !canNext && (
            <Alert sx={{ mt: 2 }} severity="warning">
              Para continuar debes aceptar ambas declaraciones.
            </Alert>
          )}

          <Typography sx={{ mt: 2.3, color: "text.secondary" }}>
            A continuación deberás seguir los siguientes <b>3 pasos</b> para
            completar tu afiliación.
          </Typography>

          {/* Acciones */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={onNext}
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.2,
                fontWeight: 900,
                textTransform: "none",
                background: `linear-gradient(90deg, ${BRAND.green} 0%, #0B7D3C 100%)`,
                "&:hover": {
                  background: `linear-gradient(90deg, ${BRAND.greenHover} 0%, #096C33 100%)`,
                },
                boxShadow: "0 10px 22px rgba(14,163,66,.22)",
              }}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

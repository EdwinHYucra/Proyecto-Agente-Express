import { Box, Paper, Typography, Divider, Button, Stack, Chip } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { useNavigate } from "react-router-dom";

const BRAND = {
  green: "#0EA342",
  greenHover: "#0C8C38",
  blue: "#0B4EA2",
};

export default function CompletadaPage() {
  const navigate = useNavigate();

  // 🔧 Pon aquí el WhatsApp real cuando lo tengas
  const WHATSAPP_ASESOR = "https://wa.me/51999999999?text=Hola,%20quiero%20mejorar%20al%20plan%20Premium%20en%20Agente%20Express.";

  return (
    <Box sx={{ maxWidth: 980, mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,.10)",
          bgcolor: "rgba(255,255,255,.86)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 2.2, md: 2.6 } }}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <CheckCircleRoundedIcon style={{ color: BRAND.green }} />
            <Typography sx={{ fontWeight: 950, fontSize: { xs: 20, md: 24 } }}>
              ¡Fase 2 completada!
            </Typography>
          </Stack>

          <Typography sx={{ mt: 0.8, color: "text.secondary", fontSize: 14 }}>
            Tus datos y requisitos fueron enviados correctamente. Ya tienes una cuenta <b>gratuita</b> activa.
          </Typography>

          <Box sx={{ mt: 1.1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip size="small" label="Etapa 2 · Finalizada" />
            <Chip size="small" variant="outlined" color="success" label="Cuenta Free activa" />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 2.6 } }}>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>
            ¿Qué puedes hacer con tu cuenta gratuita?
          </Typography>

          <Stack spacing={0.8} sx={{ color: "text.secondary", fontSize: 14 }}>
            <Typography>• Acceder al <b>Dashboard</b> (resumen y métricas).</Typography>
            <Typography>• Usar el módulo <b>Realizar Operación</b> (según habilitación).</Typography>
            <Typography>• Consultar <b>Historial de Operaciones</b>.</Typography>
            <Typography>• Ajustar <b>Configuración</b> básica de tu cuenta.</Typography>
          </Stack>

          <Box sx={{ mt: 2.2 }}>
            <Typography sx={{ fontWeight: 900, mb: 1 }}>
              ¿Quieres mejorar a Premium?
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              Con Premium puedes acceder a más funcionalidades, soporte preferente y activación avanzada.
              Si deseas, un asesor te guía.
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2.4,
              display: "flex",
              justifyContent: { xs: "stretch", sm: "flex-end" },
              gap: 1.2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<SupportAgentRoundedIcon />}
              onClick={() => window.open(WHATSAPP_ASESOR, "_blank")}
              sx={{
                borderRadius: 2.2,
                textTransform: "none",
                fontWeight: 900,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Hablar con un asesor
            </Button>

            <Button
              variant="contained"
              startIcon={<DashboardRoundedIcon />}
              onClick={() => navigate("/dashboard")}
              sx={{
                borderRadius: 2.2,
                textTransform: "none",
                fontWeight: 900,
                bgcolor: BRAND.green,
                "&:hover": { bgcolor: BRAND.greenHover },
                width: { xs: "100%", sm: "auto" },
                px: 3,
              }}
            >
              Ir al Dashboard
            </Button>

            <Button
              variant="contained"
              startIcon={<WorkspacePremiumRoundedIcon />}
              onClick={() => window.open(WHATSAPP_ASESOR, "_blank")}
              sx={{
                borderRadius: 2.2,
                textTransform: "none",
                fontWeight: 900,
                bgcolor: BRAND.blue,
                "&:hover": { bgcolor: "#083F86" },
                width: { xs: "100%", sm: "auto" },
                px: 3,
              }}
            >
              Solicitar Premium
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

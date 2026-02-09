import type { ReactNode } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import logo from "../../../assets/logo.png";

type Props = {
  children: ReactNode;
};

export default function RegistroLayout({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 3,
        bgcolor: "#EEF2F7",
        backgroundImage:
          "radial-gradient(900px 400px at 20% 10%, rgba(11,78,162,0.18), transparent 60%), radial-gradient(700px 350px at 85% 70%, rgba(39,174,96,0.14), transparent 55%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: 4,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" }, // izquierda más angosta
          border: "1px solid rgba(15,23,42,0.08)",
        }}
      >
        {/* IZQUIERDA */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
            color: "white",
            background:
              "linear-gradient(180deg, #0B4EA2 0%, #083B7A 55%, #062F63 100%)",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                component="img"
                src={logo}
                alt="Agente Express"
                sx={{ height: 42, width: "auto", filter: "drop-shadow(0 6px 12px rgba(0,0,0,.18))" }}
              />
            </Box>

            <Typography variant="h6" sx={{ mt: 2.5, fontWeight: 800, letterSpacing: -0.2 }}>
              Afíliate a AgenteExpress
            </Typography>
            <Typography sx={{ mt: 1, opacity: 0.9, fontSize: 13, lineHeight: 1.5 }}>
              Completa tus datos para habilitar tu cuenta de agente y continuar con el proceso de registro.
            </Typography>

            <Box
              sx={{
                mt: 2.5,
                p: 1.5,
                borderRadius: 2.5,
                border: "1px solid rgba(255,255,255,.14)",
                bgcolor: "rgba(255,255,255,.08)",
              }}
            >
              <Typography sx={{ fontSize: 12, opacity: 0.95 }}>
                Consejo: usa un correo válido, ahí recibirás la confirmación.
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                bgcolor: "#F5C400",
                color: "#111827",
                "&:hover": { bgcolor: "#EAB308" },
              }}
              onClick={() => alert("Aquí puedes abrir Requisitos (modal o ruta).")}
            >
              Ver requisitos
            </Button>

            <Typography sx={{ mt: 2, fontSize: 12, opacity: 0.8 }}>
              © {new Date().getFullYear()} Agente Express
            </Typography>
          </Box>
        </Box>

        {/* DERECHA */}
        <Box sx={{ p: { xs: 2.5, sm: 3 }, bgcolor: "white" }}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}

import type { ReactNode } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import logo from "@/assets/logo.png";

type Props = {
  children: ReactNode;
};

export default function RegistroLayout({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 3 },
        // fondo suave tipo “manchas”
        background:
          "radial-gradient(1200px 600px at 15% 10%, rgba(11,78,162,0.18), transparent 60%)," +
          "radial-gradient(900px 500px at 85% 20%, rgba(46,125,50,0.14), transparent 55%)," +
          "radial-gradient(900px 600px at 60% 95%, rgba(25,118,210,0.10), transparent 55%)," +
          "linear-gradient(180deg, #EEF3FA 0%, #F6F8FC 55%, #F9FAFC 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 1060,
          borderRadius: 5,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" }, // izquierda compacta
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
              "linear-gradient(180deg, #0B4EA2 0%, #083B7A 55%, #062C60 100%)",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box
                component="img"
                src={logo}
                alt="Agente Express"
                sx={{ height: 44, width: "auto", filter: "drop-shadow(0 6px 18px rgba(0,0,0,.25))" }}
              />
            </Box>

            <Typography sx={{ mt: 2.4, fontWeight: 900, fontSize: 18 }}>
              Afíliate a AgenteExpress
            </Typography>

            <Typography sx={{ mt: 0.8, opacity: 0.9, fontSize: 13.5, lineHeight: 1.45 }}>
              Completa tus datos para habilitar tu cuenta de agente y continuar con el
              proceso de registro.
            </Typography>

            <Box
              sx={{
                mt: 2.2,
                p: 1.6,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,.18)",
                backgroundColor: "rgba(255,255,255,.10)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <InfoOutlinedIcon sx={{ mt: "2px", opacity: 0.95 }} />
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: 12.5 }}>
                    Consejo
                  </Typography>
                  <Typography sx={{ mt: 0.4, fontSize: 12.5, opacity: 0.9 }}>
                    Usa un correo válido; ahí recibirás la confirmación.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: 999,
                py: 1.2,
                fontWeight: 900,
                textTransform: "none",
                backgroundColor: "#F5C400",
                color: "#0A1F44",
                "&:hover": { backgroundColor: "#E7B800" },
              }}
              onClick={() => {
                // TODO: abrir modal / ruta de requisitos
              }}
            >
              Ver requisitos
            </Button>

            <Typography
              sx={{
                mt: 2,
                opacity: 0.8,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} Agente Express · Hecho por TuEquipo
            </Typography>
          </Box>
        </Box>

        {/* DERECHA */}
        <Box sx={{ p: { xs: 2.3, sm: 3, md: 3.2 } }}>
          {/* Logo arriba en móvil */}
          <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center", mb: 2 }}>
            <Box component="img" src={logo} alt="Agente Express" sx={{ height: 42, width: "auto" }} />
          </Box>

          {children}

          {/* Footer móvil */}
          <Typography
            sx={{
              display: { xs: "block", md: "none" },
              mt: 2.4,
              fontSize: 12,
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Agente Express · Hecho por TuEquipo
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

import type { ReactNode } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

type Props = {
  children: ReactNode;
};

export default function AutenticacionLayoutMUI({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 5 },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(241,245,249,1) 40%, rgba(226,232,240,1) 100%)",
      }}
    >
      {/* Manchas/Blobs del fondo (suaves) */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(520px 320px at 12% 18%, rgba(11,78,162,.14) 0%, rgba(11,78,162,0) 62%),
            radial-gradient(420px 280px at 88% 20%, rgba(16,185,129,.10) 0%, rgba(16,185,129,0) 62%),
            radial-gradient(560px 340px at 80% 92%, rgba(59,130,246,.12) 0%, rgba(59,130,246,0) 64%)
          `,
          opacity: 0.95,
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative" }}>
        <Paper
          elevation={10}
          sx={{
            borderRadius: { xs: 4, sm: 6 },
            border: "1px solid rgba(15,23,42,.10)",
            overflow: "hidden",
            background: "rgba(255,255,255,.92)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Contenido */}
          <Box sx={{ p: { xs: 3, sm: 4 } }}>{children}</Box>

          {/* Footer */}
          <Box
            sx={{
              px: { xs: 3, sm: 4 },
              pb: { xs: 2.5, sm: 3 },
              pt: 1.5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "rgba(15,23,42,.55)", fontWeight: 600 }}
            >
              © {new Date().getFullYear()} Agente Express · Hecho por {}
              <span style={{ fontWeight: 900 }}>Matzu.dev</span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

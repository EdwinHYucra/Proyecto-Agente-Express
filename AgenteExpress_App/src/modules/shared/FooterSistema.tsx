import { Box, Divider, Typography, Link } from "@mui/material";

type Props = {
  madeBy?: string;
};

export default function FooterSistema({ madeBy = "TuEquipo" }: Props) {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: "rgba(255,255,255,.65)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(15,23,42,.08)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: 1.6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            © 2026 Agente Express · <b>Hecho por {madeBy}</b>
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="#" underline="hover" sx={{ fontSize: 13 }}>
              Términos
            </Link>
            <Link href="#" underline="hover" sx={{ fontSize: 13 }}>
              Privacidad
            </Link>
          </Box>
        </Box>

        <Divider sx={{ mt: 1.2, opacity: 0.35 }} />
      </Box>
    </Box>
  );
}

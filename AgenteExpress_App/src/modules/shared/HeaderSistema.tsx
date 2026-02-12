import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

type Props = {
  logoSrc: string;
  codigoAgente: string;
  nombreUsuario: string;
  onLogout: () => void;

  // ✅ nuevo (para mobile drawer)
  showMenuButton?: boolean;
  onOpenMenu?: () => void;
};

export default function HeaderSistema({
  logoSrc,
  codigoAgente,
  nombreUsuario,
  onLogout,
  showMenuButton = false,
  onOpenMenu,
}: Props) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#0B4EA2",
        borderBottom: "1px solid rgba(255,255,255,.12)",
        zIndex: (t) => t.zIndex.drawer + 1, // ✅ header manda por encima
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 72 },
          px: { xs: 1, md: 2.5 },
          display: "flex",
          gap: 1.2,
        }}
      >
        {/* Izquierda: botón menú (mobile) + logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
          {showMenuButton && (
            <IconButton
              onClick={onOpenMenu}
              sx={{ color: "white" }}
              aria-label="Abrir menú"
            >
              <MenuRoundedIcon />
            </IconButton>
          )}

          <Box
            component="img"
            src={logoSrc}
            alt="Agente Express"
            sx={{
              height: { xs: 28, md: 34 },
              width: "auto",
              objectFit: "contain",
            }}
          />

          <Box sx={{ display: { xs: "none", sm: "block" }, minWidth: 0 }}>
            <Typography sx={{ color: "white", fontWeight: 900, lineHeight: 1.1 }}>
              Agente Multibanco
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,.85)", fontWeight: 700, fontSize: 13 }}>
              Express
            </Typography>
          </Box>
        </Box>

        {/* Centro: código */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <Chip
            label={`Código de Agente: ${codigoAgente}`}
            sx={{
              bgcolor: "rgba(255,255,255,.14)",
              color: "white",
              fontWeight: 800,
              border: "1px solid rgba(255,255,255,.16)",
              height: 34,
              maxWidth: { xs: "100%", sm: 420 },
              "& .MuiChip-label": {
                px: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
        </Box>

        {/* Derecha */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,.92)",
              fontWeight: 800,
              display: { xs: "none", md: "block" },
            }}
          >
            Bienvenido: {nombreUsuario}
          </Typography>

          <Avatar sx={{ width: 34, height: 34, bgcolor: "rgba(255,255,255,.18)", fontWeight: 900 }}>
            {(nombreUsuario?.[0] ?? "U").toUpperCase()}
          </Avatar>

          <Tooltip title="Cerrar sesión">
            <IconButton onClick={onLogout} sx={{ color: "white" }}>
              <LogoutRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

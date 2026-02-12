import { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import PolicyRoundedIcon from "@mui/icons-material/PolicyRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export const DRAWER_WIDTH = 280;
export const HEADER_H_XS = 64;
export const HEADER_H_MD = 72;

const BRAND = {
  blue: "#0B4EA2",
  green: "#0EA342",
};

type SideNavProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export default function SideNav({ mobileOpen, onMobileClose }: SideNavProps) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const routes = useMemo(
    () => ({
      dashboard: "/dashboard",
      operaciones: {
        base: "/operaciones",
        cashOut: "/operaciones/cash-out",
        cashIn: "/operaciones/cash-in",
        recargas: "/operaciones/recargas",
        productos: "/operaciones/productos-digitales",
      },
      funciones: "/funciones-operativas",
      historial: "/historial-operaciones",
      config: "/configuracion",
      calc: "/calculadora",
      terminos: "/terminos",
      privacidad: "/privacidad",
    }),
    []
  );

  const inOperaciones = location.pathname.startsWith(routes.operaciones.base);

  // ✅ estado solo para toggle manual, sin useEffect
  const [openOperaciones, setOpenOperaciones] = useState(false);
  const openOperacionesFinal = inOperaciones || openOperaciones;

  const closeIfMobile = () => {
    if (!isMdUp) onMobileClose();
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    closeIfMobile();
    navigate("/login", { replace: true });
  };

  const isDesktop = isMdUp;

  const navBg = isDesktop ? BRAND.blue : "white";
  const dividerColor = isDesktop ? "rgba(255,255,255,.14)" : "rgba(2,6,23,.10)";
  const titleColor = isDesktop ? "rgba(255,255,255,.92)" : "rgba(2,6,23,.88)";
  const subtitleColor = isDesktop ? "rgba(255,255,255,.70)" : "rgba(2,6,23,.55)";
  const iconColor = isDesktop ? "rgba(255,255,255,.92)" : "rgba(2,6,23,.68)";
  const textColor = isDesktop ? "rgba(255,255,255,.92)" : "rgba(2,6,23,.86)";

  // ✅ Active sin className: usar aria-current="page"
  const itemBaseSx = {
    mx: 1.25,
    borderRadius: 2.2,
    py: 1.05,
    px: 1.25,
    gap: 1,
    transition: "all .18s ease",
    position: "relative",
    "&:hover": { bgcolor: isDesktop ? "rgba(255,255,255,.08)" : "rgba(2,6,23,.05)" },

    '&[aria-current="page"]': {
      bgcolor: isDesktop ? "rgba(14,163,66,.18)" : "rgba(14,163,66,.10)",
      boxShadow: isDesktop ? "none" : "inset 0 0 0 1px rgba(14,163,66,.22)",
    },
    '&[aria-current="page"]::before': {
      content: '""',
      position: "absolute",
      left: 0,
      top: 8,
      bottom: 8,
      width: 4,
      borderRadius: 999,
      bgcolor: BRAND.green,
    },
  } as const;

  const iconSx = {
    minWidth: 38,
    color: iconColor,
    "& .MuiSvgIcon-root": { fontSize: 21 },
  } as const;

  const textSx = {
    "& .MuiListItemText-primary": {
      fontWeight: 800,
      fontSize: 14.5,
      color: textColor,
    },
  } as const;

  const subItemSx = {
    mx: 1.25,
    ml: 3.25,
    borderRadius: 2,
    py: 0.85,
    px: 1.15,
    position: "relative",
    "&:hover": { bgcolor: isDesktop ? "rgba(255,255,255,.08)" : "rgba(2,6,23,.05)" },

    '&[aria-current="page"]': {
      bgcolor: isDesktop ? "rgba(14,163,66,.18)" : "rgba(14,163,66,.10)",
      boxShadow: isDesktop ? "none" : "inset 0 0 0 1px rgba(14,163,66,.22)",
    },
  } as const;

  const content = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: navBg }}>
      <Box sx={{ px: 2.2, py: 1.8 }}>
        <Typography sx={{ fontWeight: 950, letterSpacing: 0.2, color: titleColor }}>
          Menú
        </Typography>
        <Typography sx={{ mt: 0.4, fontSize: 12.5, color: subtitleColor }}>
          Navegación del sistema
        </Typography>
      </Box>

      <Divider sx={{ borderColor: dividerColor }} />

      <List sx={{ py: 1 }}>
        <ListItemButton
          component={NavLink}
          to={routes.dashboard}
          end
          onClick={closeIfMobile}
          sx={itemBaseSx}
        >
          <ListItemIcon sx={iconSx}><HomeRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Inicio" />
        </ListItemButton>

        <ListItemButton
          onClick={() => setOpenOperaciones((v) => !v)}
          sx={itemBaseSx}
        >
          <ListItemIcon sx={iconSx}><CompareArrowsRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Realizar Operación" />
          {openOperacionesFinal ? (
            <ExpandLessRoundedIcon sx={{ color: iconColor }} />
          ) : (
            <ExpandMoreRoundedIcon sx={{ color: iconColor }} />
          )}
        </ListItemButton>

        <Collapse in={openOperacionesFinal} timeout="auto" unmountOnExit>
          <Box sx={{ position: "relative", mt: 0.5, mb: 0.75 }}>
            <Box
              sx={{
                position: "absolute",
                left: 22,
                top: 6,
                bottom: 6,
                width: 2,
                borderRadius: 999,
                bgcolor: isDesktop ? "rgba(255,255,255,.16)" : "rgba(2,6,23,.10)",
              }}
            />
            {[
              ["Cash Out", routes.operaciones.cashOut],
              ["Cash In", routes.operaciones.cashIn],
              ["Recargas", routes.operaciones.recargas],
              ["Productos digitales", routes.operaciones.productos],
            ].map(([label, to]) => (
              <ListItemButton
                key={to}
                component={NavLink}
                to={to}
                onClick={closeIfMobile}
                sx={subItemSx}
              >
                <ListItemText
                  primary={label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 800,
                      fontSize: 13.5,
                      color: isDesktop ? "rgba(255,255,255,.85)" : "rgba(2,6,23,.78)",
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </Box>
        </Collapse>

        <ListItemButton component={NavLink} to={routes.funciones} onClick={closeIfMobile} sx={itemBaseSx}>
          <ListItemIcon sx={iconSx}><FunctionsRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Funciones Operativas" />
        </ListItemButton>

        <ListItemButton component={NavLink} to={routes.historial} onClick={closeIfMobile} sx={itemBaseSx}>
          <ListItemIcon sx={iconSx}><HistoryRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Historial de Operaciones" />
        </ListItemButton>

        <ListItemButton component={NavLink} to={routes.config} onClick={closeIfMobile} sx={itemBaseSx}>
          <ListItemIcon sx={iconSx}><SettingsRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Configuración" />
        </ListItemButton>

        <ListItemButton component={NavLink} to={routes.calc} onClick={closeIfMobile} sx={itemBaseSx}>
          <ListItemIcon sx={iconSx}><CalculateRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Abrir calculadora" />
        </ListItemButton>

        <Divider sx={{ my: 1, borderColor: dividerColor }} />

        <ListItemButton component={NavLink} to={routes.terminos} onClick={closeIfMobile} sx={itemBaseSx}>
          <ListItemIcon sx={iconSx}><GavelRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Términos y condiciones" />
        </ListItemButton>

        <ListItemButton component={NavLink} to={routes.privacidad} onClick={closeIfMobile} sx={itemBaseSx}>
          <ListItemIcon sx={iconSx}><PolicyRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Política de privacidad de datos" />
        </ListItemButton>
      </List>

      <Box sx={{ mt: "auto", p: 1.25 }}>
        <Divider sx={{ mb: 1, borderColor: dividerColor }} />
        <ListItemButton onClick={onLogout} sx={itemBaseSx}>
          <ListItemIcon sx={iconSx}><LogoutRoundedIcon /></ListItemIcon>
          <ListItemText sx={textSx} primary="Cerrar Sesión" />
        </ListItemButton>
      </Box>
    </Box>
  );

  // ✅ MOBILE: Drawer temporal debajo del header
  const mobileDrawerPaperSx = {
    width: DRAWER_WIDTH,
    top: `${HEADER_H_XS}px`,
    height: `calc(100dvh - ${HEADER_H_XS}px)`,
    bgcolor: "white", // ✅ mobile blanco
    borderRight: "1px solid rgba(0,0,0,.10)",
  };

  // ✅ DESKTOP: NO Drawer permanente (evita pisar footer). Usamos sticky.
  if (isMdUp) {
    return (
      <Box sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
        <Box
          sx={{
            position: "sticky",
            top: `${HEADER_H_MD}px`,                 // ✅ debajo del header
            height: `calc(100dvh - ${HEADER_H_MD}px)`, // ✅ ocupa solo viewport bajo header
            overflowY: "auto",
            bgcolor: BRAND.blue,
            borderRight: "1px solid rgba(0,0,0,.10)",
          }}
        >
          {content}
        </Box>
      </Box>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onMobileClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: (t) => t.zIndex.appBar - 1, // ✅ que el header “domine”
        "& .MuiDrawer-paper": mobileDrawerPaperSx,
      }}
    >
      {content}
    </Drawer>
  );
}

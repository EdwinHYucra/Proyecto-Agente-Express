import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import HeaderSistema from "./HeaderSistema";
import FooterSistema from "./FooterSistema";
import logo from "../../assets/logo.png";

type Props = {
  madeBy?: string;
};

export default function FlowShellLayout({ madeBy = "Edwin Eulogio" }: Props) {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#EEF3F9",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 380px at 12% 8%, rgba(11,78,162,.16), transparent 60%)," +
            "radial-gradient(700px 420px at 88% 16%, rgba(225,29,72,.10), transparent 60%)," +
            "radial-gradient(720px 420px at 60% 92%, rgba(11,78,162,.10), transparent 60%)",
          pointerEvents: "none",
        },
      }}
    >
      <HeaderSistema
        logoSrc={logo}
        codigoAgente="CGDT-170499"
        nombreUsuario="Luis"
        onLogout={onLogout}
        // ✅ SIN menú lateral en flujo (no pasar showMenuButton/onOpenMenu)
      />

      <Box
        sx={{
          flex: 1,
          px: { xs: 2, sm: 2.5, md: 3 },
          py: { xs: 2.2, md: 3 },
          position: "relative",
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Outlet />
        </Box>
      </Box>

      <FooterSistema madeBy={madeBy} />
    </Box>
  );
}

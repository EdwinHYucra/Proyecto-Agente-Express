import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CuentaCreadaDialog({ open, onClose }: Props) {
  const navigate = useNavigate();

  const irLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, p: 0.5 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 900, pb: 1 }}>
        ¡Registro exitoso!
      </DialogTitle>

      <DialogContent sx={{ pt: 1.5 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <CheckCircleIcon sx={{ fontSize: 44, color: "#16A34A", mt: 0.2 }} />
          <Box>
            <Typography sx={{ fontWeight: 800, mb: 0.5 }}>
              Tu cuenta fue creada con éxito.
            </Typography>

            <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              Revisa tu correo para confirmar el registro. Si no lo ves, revisa “Correo no deseado”.
              <br />
              Gracias por elegirnos, <b>Agente Express</b>.
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        {/* ✅ Un solo botón (como pediste) */}
        <Button
          onClick={irLogin}
          variant="contained"
          sx={{
            borderRadius: 999,
            px: 3,
            textTransform: "none",
            fontWeight: 800,
          }}
        >
          Ir a iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type Props = {
  open: boolean;
  onClose: () => void;
  onGoLogin: () => void;
};

export default function CuentaCreadaDialog({ open, onClose, onGoLogin }: Props) {
  const handleAceptar = () => {
    onClose();
    onGoLogin(); // ambos caminos van a login (como pediste)
  };

  return (
    <Dialog
      open={open}
      onClose={handleAceptar}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <DialogTitle sx={{ fontWeight: 950 }}>
        ¡Registro exitoso!
      </DialogTitle>

      <DialogContent>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <CheckCircleRoundedIcon color="success" sx={{ fontSize: 44, mt: 0.2 }} />
          <Stack spacing={0.8}>
            <Typography sx={{ fontWeight: 800 }}>
              Tu cuenta fue creada con éxito.
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Revisa tu correo para confirmar el registro. Si no lo ves, revisa
              “Correo no deseado”.
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Gracias por elegirnos, <b>Agente Express</b>.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2.2 }}>
        <Button
          variant="contained"
          onClick={handleAceptar}
          sx={{
            borderRadius: 999,
            px: 3.2,
            textTransform: "none",
            fontWeight: 950,
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

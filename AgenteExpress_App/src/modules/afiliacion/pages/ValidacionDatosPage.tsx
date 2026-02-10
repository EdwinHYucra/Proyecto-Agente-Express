import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Stack,
  Alert,
  Chip,
  CircularProgress,
} from "@mui/material";
import { FormControl, FormHelperText } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const BRAND = {
  green: "#0EA342",
  greenHover: "#0C8C38",
};

type RegistroSnapshot = {
  sinRuc: boolean;
  telefono?: string;
  correo?: string;
  ruc?: string;
};

type ReniecData = {
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
};

type SunatData = {
  ruc: string;
  razonSocial: string;
  condicion: string;
  estado: string;
  direccionFiscal: string;
};

function readRegistroSnapshot(): RegistroSnapshot {
  try {
    const raw = localStorage.getItem("registro_snapshot");
    if (!raw) return { sinRuc: false };
    return JSON.parse(raw) as RegistroSnapshot;
  } catch {
    return { sinRuc: false };
  }
}

export default function ValidacionDatosPage() {
  const navigate = useNavigate();
  const snapshot = useMemo(() => readRegistroSnapshot(), []);
  const sinRuc = !!snapshot.sinRuc;

  const [dni, setDni] = useState("");
  const [ruc, setRuc] = useState("");

  const [reniec, setReniec] = useState<ReniecData | null>(null);
  const [sunat, setSunat] = useState<SunatData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [accBuscarOpen, setAccBuscarOpen] = useState(true);
  const [accDatosOpen, setAccDatosOpen] = useState(false);

  const validarDni = (v: string) => /^\d{8}$/.test(v.trim());
  const validarRuc = (v: string) => /^\d{11}$/.test(v.trim());

  const puedeBuscar = useMemo(() => {
    if (sinRuc) return validarDni(dni);
    return validarRuc(ruc);
  }, [sinRuc, dni, ruc]);

  const hayDatos = useMemo(() => (sinRuc ? !!reniec : !!sunat), [sinRuc, reniec, sunat]);

  const limpiar = () => {
    setError("");
    setReniec(null);
    setSunat(null);
  };

  const buscar = async () => {
    limpiar();

    if (sinRuc && !validarDni(dni)) return setError("Ingresa un DNI válido (8 dígitos).");
    if (!sinRuc && !validarRuc(ruc)) return setError("Ingresa un RUC válido (11 dígitos).");

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));

      if (sinRuc) {
        setReniec({
          dni: dni.trim(),
          nombres: "EDWIN",
          apellidoPaterno: "Yucra",
          apellidoMaterno: "—",
        });
      } else {
        setSunat({
          ruc: ruc.trim(),
          razonSocial: "AGENTE EXPRESS S.A.C.",
          condicion: "HABIDO",
          estado: "ACTIVO",
          direccionFiscal: "AV. EJEMPLO 123 - AREQUIPA",
        });
      }

      setAccBuscarOpen(false);
      setAccDatosOpen(true);
    } catch {
      setError("No se pudo validar en este momento. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const continuar = () => {
    if (!hayDatos) return;
    navigate("/checklist-requisitos");
  };

  return (
    <Box sx={{ maxWidth: 980, mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,.10)",
          bgcolor: "rgba(255,255,255,.80)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 2.1, md: 2.4 } }}>
          <Typography sx={{ fontWeight: 950, fontSize: { xs: 20, md: 24 } }}>
            Validación de datos
          </Typography>

          <Typography sx={{ mt: 0.6, color: "text.secondary", fontSize: 14 }}>
            {sinRuc
              ? "Como no cuentas con RUC, validaremos tu identidad con DNI (RENIEC)."
              : "Validaremos tu negocio con RUC (SUNAT) y cargaremos los datos principales."}
          </Typography>

          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip size="small" label="Etapa 2 · Fase 1" />
            <Chip size="small" color="success" variant="outlined" label={sinRuc ? "Modo: DNI" : "Modo: RUC"} />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ px: { xs: 1.25, md: 2 }, py: { xs: 1.25, md: 1.8 } }}>
          <Accordion
            expanded={accBuscarOpen}
            onChange={(_, v) => setAccBuscarOpen(v)}
            disableGutters
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,.10)",
              overflow: "hidden",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography sx={{ fontWeight: 900 }}>
                {sinRuc ? "1) Buscar por DNI" : "1) Buscar por RUC"}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Stack spacing={1.4}>
                {error && <Alert severity="error">{error}</Alert>}

                {/* ✅ FIX: flex-start para que NO se baje el botón por el helperText */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 160px" },
                    gap: 1.2,
                    alignItems: "start",
                  }}
                >
                  {/* INPUT */}
                  <FormControl fullWidth>
                    {sinRuc ? (
                      <TextField
                        label="DNI"
                        value={dni}
                        onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                        placeholder="Ej: 12345678"
                        size="small"
                        fullWidth
                      />
                    ) : (
                      <TextField
                        label="RUC"
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value.replace(/\D/g, "").slice(0, 11))}
                        placeholder="Ej: 20123456789"
                        size="small"
                        fullWidth
                      />
                    )}

                    {/* helper real (debajo del input) */}
                    <FormHelperText>
                      {sinRuc ? "Debe tener 8 dígitos." : "Debe tener 11 dígitos."}
                    </FormHelperText>
                  </FormControl>

                  {/* BOTÓN: le damos el mismo “slot” de helper pero invisible */}
                  <FormControl
                    sx={{
                      width: { xs: "100%", sm: 160 },
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={buscar}
                      disabled={!puedeBuscar || loading}
                      startIcon={
                        loading ? <CircularProgress size={18} sx={{ color: "white" }} /> : <SearchRoundedIcon />
                      }
                      sx={{
                        height: 40,
                        borderRadius: 2.2,
                        fontWeight: 900,
                        textTransform: "none",
                        bgcolor: BRAND.green,
                        "&:hover": { bgcolor: BRAND.greenHover },
                        width: "100%",
                      }}
                    >
                      {loading ? "Buscando..." : "Buscar"}
                    </Button>

                    {/* helper fantasma: ocupa el mismo espacio que el helper del input */}
                    <FormHelperText sx={{ visibility: "hidden" }}>
                      .
                    </FormHelperText>
                  </FormControl>
                </Box>


                <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                  * Luego reemplazamos este “mock” por tu integración real a RENIEC/SUNAT (o vía backend).
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={accDatosOpen}
            onChange={(_, v) => setAccDatosOpen(v)}
            disableGutters
            elevation={0}
            sx={{
              mt: 1.6,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,.10)",
              overflow: "hidden",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>2) Datos cargados</Typography>
                {hayDatos && (
                  <Chip
                    icon={<CheckCircleRoundedIcon />}
                    label="Validado"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {!hayDatos ? (
                <Alert severity="info">Primero realiza la búsqueda para cargar los datos aquí.</Alert>
              ) : (
                <Stack spacing={1.5}>
                  {/* (Tu bloque de datos se mantiene tal cual, no lo recorto aquí) */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "stretch", sm: "flex-end" },
                      gap: 1.2,
                      mt: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setAccBuscarOpen(true);
                        setAccDatosOpen(true);
                      }}
                      sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
                    >
                      Corregir búsqueda
                    </Button>

                    <Button
                      variant="contained"
                      onClick={continuar}
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
                      Continuar
                    </Button>
                  </Box>
                </Stack>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Paper>
    </Box>
  );
}

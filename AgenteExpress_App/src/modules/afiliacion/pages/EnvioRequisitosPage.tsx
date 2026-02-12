import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useNavigate } from "react-router-dom";

const BRAND = {
  green: "#0EA342",
  greenHover: "#0C8C38",
};

type LatLng = { lat: number; lng: number };

function countFiles(files: File[]) {
  return files?.length ?? 0;
}

/** Intenta extraer lat/lng desde enlaces típicos de Google Maps */
function parseLatLngFromGoogleMapsUrl(url: string): LatLng | null {
  const u = url.trim();
  if (!u) return null;

  // Caso 1: .../@-16.398889,-71.535000,17z
  const m1 = u.match(/@(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/);
  if (m1) return { lat: Number(m1[1]), lng: Number(m1[3]) };

  // Caso 2: ...?q=-16.39,-71.53 o ...?query=lat,lng
  const m2 = u.match(/[?&](q|query)=(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/);
  if (m2) return { lat: Number(m2[2]), lng: Number(m2[4]) };

  // Caso 3: ...!3d-16.39!4d-71.53
  const m3 = u.match(/!3d(-?\d+(\.\d+)?)!4d(-?\d+(\.\d+)?)/);
  if (m3) return { lat: Number(m3[1]), lng: Number(m3[3]) };

  return null;
}

export default function EnvioRequisitosPage() {
  const navigate = useNavigate();

  // Archivos
  const [dniFront, setDniFront] = useState<File | null>(null);
  const [dniBack, setDniBack] = useState<File | null>(null);
  const [recibos, setRecibos] = useState<File[]>([]);
  const [fotosNegocio, setFotosNegocio] = useState<File[]>([]);
  const [capturaUbicacion, setCapturaUbicacion] = useState<File | null>(null);

  // Ubicación
  const [mapUrl, setMapUrl] = useState("");
  const [coords, setCoords] = useState<LatLng | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState("");

  const requisitosOk = useMemo(() => {
    const dniOk = !!dniFront && !!dniBack;
    const reciboOk = recibos.length >= 1;
    const fotosOk = fotosNegocio.length >= 2;
    const ubicacionOk = !!coords || !!capturaUbicacion; // si quieres forzar coords, quita capturaUbicacion
    return dniOk && reciboOk && fotosOk && ubicacionOk;
  }, [dniFront, dniBack, recibos, fotosNegocio, coords, capturaUbicacion]);

  const handlePickSingle =
    (setter: (f: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null;
      setter(f);
      e.target.value = "";
    };

  const handlePickMultiple =
    (setter: (f: File[]) => void, current: File[]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = Array.from(e.target.files ?? []);
      if (!list.length) return;
      setter([...current, ...list]);
      e.target.value = "";
    };

  const removeFromList = (idx: number, list: File[], setter: (v: File[]) => void) => {
    const next = list.filter((_, i) => i !== idx);
    setter(next);
  };

  const usarMiUbicacion = () => {
    setError("");
    setGeoLoading(true);

    if (!navigator.geolocation) {
      setGeoLoading(false);
      setError("Este navegador no soporta geolocalización.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        setGeoLoading(false);
        // casos típicos: permiso denegado, timeout, etc.
        setError("No se pudo obtener la ubicación. Verifica permisos de ubicación en tu navegador.");
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const aplicarLinkMaps = () => {
    setError("");
    const parsed = parseLatLngFromGoogleMapsUrl(mapUrl);
    if (!parsed) {
      setError("No pude extraer coordenadas de ese enlace. Prueba con un link que incluya @lat,lng.");
      return;
    }
    setCoords(parsed);
  };

  const guardarYContinuar = () => {
    setError("");
    if (!requisitosOk) {
      setError("Completa todos los requisitos antes de continuar.");
      return;
    }

    // En demo, guardamos “metadatos” (no los archivos en sí) en localStorage.
    // Los archivos normalmente se suben al backend con FormData.
    const payload = {
      dniFront: dniFront?.name ?? null,
      dniBack: dniBack?.name ?? null,
      recibos: recibos.map((f) => f.name),
      fotosNegocio: fotosNegocio.map((f) => f.name),
      coords,
      capturaUbicacion: capturaUbicacion?.name ?? null,
      mapUrl: mapUrl.trim() || null,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("afiliacion_requisitos_snapshot", JSON.stringify(payload));
    navigate("/resumen-afiliacion"); // cambia por tu ruta real
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
            Envío de requisitos
          </Typography>

          <Typography sx={{ mt: 0.6, color: "text.secondary", fontSize: 14 }}>
            Sube tus documentos para completar el registro. (Demo: aún no se suben al servidor).
          </Typography>

          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip size="small" label="Etapa 2 · Fase 2" />
            <Chip
              size="small"
              color={requisitosOk ? "success" : "default"}
              variant="outlined"
              icon={requisitosOk ? <CheckCircleRoundedIcon /> : undefined}
              label={requisitosOk ? "Listo para continuar" : "Pendiente"}
            />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ px: { xs: 1.25, md: 2 }, py: { xs: 1.25, md: 1.8 } }}>
          {error && <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert>}

          <Stack spacing={2}>
            {/* DNI */}
            <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 900, mb: 1 }}>1) Copia del DNI</Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 1.2,
                }}
              >
                <Box>
                  <Button
                    fullWidth
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileRoundedIcon />}
                    sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
                  >
                    Subir DNI (Frontal)
                    <input hidden type="file" accept="image/*" onChange={handlePickSingle(setDniFront)} />
                  </Button>
                  <Typography sx={{ mt: 0.6, fontSize: 13, color: "text.secondary" }}>
                    {dniFront ? `✅ ${dniFront.name}` : "Pendiente"}
                  </Typography>
                </Box>

                <Box>
                  <Button
                    fullWidth
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileRoundedIcon />}
                    sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
                  >
                    Subir DNI (Posterior)
                    <input hidden type="file" accept="image/*" onChange={handlePickSingle(setDniBack)} />
                  </Button>
                  <Typography sx={{ mt: 0.6, fontSize: 13, color: "text.secondary" }}>
                    {dniBack ? `✅ ${dniBack.name}` : "Pendiente"}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Recibo / servicios */}
            <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 900, mb: 1 }}>
                2) Recibo de servicios / Contrato de alquiler
              </Typography>

              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileRoundedIcon />}
                sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
              >
                Agregar archivos
                <input
                  hidden
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={handlePickMultiple(setRecibos, recibos)}
                />
              </Button>

              <Typography sx={{ mt: 0.6, fontSize: 13, color: "text.secondary" }}>
                {countFiles(recibos) ? `✅ ${recibos.length} archivo(s)` : "Mínimo 1 archivo"}
              </Typography>

              {!!recibos.length && (
                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {recibos.map((f, idx) => (
                    <Chip
                      key={`${f.name}-${idx}`}
                      label={f.name}
                      onDelete={() => removeFromList(idx, recibos, setRecibos)}
                      deleteIcon={<DeleteOutlineRoundedIcon />}
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Paper>

            {/* Fotos del negocio */}
            <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 900, mb: 1 }}>3) Fotos del negocio (mínimo 2)</Typography>

              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileRoundedIcon />}
                sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
              >
                Agregar fotos
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePickMultiple(setFotosNegocio, fotosNegocio)}
                />
              </Button>

              <Typography sx={{ mt: 0.6, fontSize: 13, color: "text.secondary" }}>
                {fotosNegocio.length >= 2
                  ? `✅ ${fotosNegocio.length} foto(s)`
                  : `Faltan ${Math.max(0, 2 - fotosNegocio.length)} foto(s)`}
              </Typography>

              {!!fotosNegocio.length && (
                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {fotosNegocio.map((f, idx) => (
                    <Chip
                      key={`${f.name}-${idx}`}
                      label={f.name}
                      onDelete={() => removeFromList(idx, fotosNegocio, setFotosNegocio)}
                      deleteIcon={<DeleteOutlineRoundedIcon />}
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Paper>

            {/* Ubicación real */}
            <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 900, mb: 1 }}>4) Ubicación real</Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
                  gap: 1.2,
                  alignItems: "start",
                }}
              >
                <Button
                  variant="contained"
                  onClick={usarMiUbicacion}
                  startIcon={<MyLocationRoundedIcon />}
                  disabled={geoLoading}
                  sx={{
                    height: 40,
                    borderRadius: 2.2,
                    textTransform: "none",
                    fontWeight: 900,
                    bgcolor: BRAND.green,
                    "&:hover": { bgcolor: BRAND.greenHover },
                  }}
                >
                  {geoLoading ? "Obteniendo..." : "Usar mi ubicación"}
                </Button>

                <Box>
                  <TextField
                    label="(Opcional) Pega enlace de Google Maps"
                    value={mapUrl}
                    onChange={(e) => setMapUrl(e.target.value)}
                    size="small"
                    fullWidth
                  />
                  <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      onClick={aplicarLinkMaps}
                      sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
                    >
                      Extraer coordenadas del link
                    </Button>

                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<UploadFileRoundedIcon />}
                      sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
                    >
                      (Opcional) Subir captura
                      <input hidden type="file" accept="image/*" onChange={handlePickSingle(setCapturaUbicacion)} />
                    </Button>
                  </Box>

                  <Typography sx={{ mt: 0.8, fontSize: 13, color: "text.secondary" }}>
                    {coords
                      ? `✅ Coordenadas: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`
                      : "Pendiente: usa ubicación o pega un link con @lat,lng."}
                    {capturaUbicacion ? ` · Captura: ${capturaUbicacion.name}` : ""}
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mt: 1.5 }}>
                En móviles, la geolocalización funciona mejor si tu app corre en HTTPS o en localhost.
              </Alert>
            </Paper>

            {/* Acciones */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "stretch", sm: "space-between" },
                gap: 1.2,
                flexWrap: "wrap",
                pt: 0.5,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/validacion-datos")}
                sx={{ borderRadius: 2.2, textTransform: "none", fontWeight: 900 }}
              >
                Volver
              </Button>

              <Button
                variant="contained"
                onClick={guardarYContinuar}
                disabled={!requisitosOk}
                sx={{
                  borderRadius: 2.2,
                  textTransform: "none",
                  fontWeight: 900,
                  bgcolor: BRAND.green,
                  "&:hover": { bgcolor: BRAND.greenHover },
                  width: { xs: "100%", sm: "auto" },
                  px: 3,
                  height: 40,
                }}
              >
                Continuar
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

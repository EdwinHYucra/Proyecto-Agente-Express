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
  FormControl,
  FormHelperText,
  FormControlLabel,
  Switch,
  Autocomplete,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

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
  regimenTributario: string; // ✅ agregado
};

type ViaTipo = "AV." | "JR." | "CALLE" | "PSJE." | "CARRETERA" | "OTRO";

const VIAS: ViaTipo[] = ["AV.", "JR.", "CALLE", "PSJE.", "CARRETERA", "OTRO"];

/** Mock simple para demo (luego lo reemplazas por ubigeo real o catálogo) */
const UBIGEO = {
  departamentos: ["Arequipa", "Lima"],
  provincias: {
    Arequipa: ["Arequipa", "Caylloma"],
    Lima: ["Lima", "Huaral"],
  } as Record<string, string[]>,
  distritos: {
    Arequipa: ["Cercado", "Yanahuara", "Cayma"],
    Caylloma: ["Chivay", "Maca"],
    Lima: ["Miraflores", "San Isidro", "Surco"],
    Huaral: ["Huaral", "Chancay"],
  } as Record<string, string[]>,
};

const AGENTES_EXISTENTES = [
  "Agente BCP",
  "Agente Interbank",
  "Agente BBVA",
  "Agente Scotiabank",
  "KasNet",
];

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

  // 1) Buscar
  const [dni, setDni] = useState("");
  const [ruc, setRuc] = useState("");

  const [reniec, setReniec] = useState<ReniecData | null>(null);
  const [sunat, setSunat] = useState<SunatData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // acordeones
  const [accBuscarOpen, setAccBuscarOpen] = useState(true);
  const [accGeneralesOpen, setAccGeneralesOpen] = useState(false);
  const [accNegocioOpen, setAccNegocioOpen] = useState(false);
  const [accAdicionalOpen, setAccAdicionalOpen] = useState(false);

  // 2) Datos generales (editable por ahora, pero puedes bloquearlo en readOnly si quieres)
  // DNI
  const [genDni, setGenDni] = useState("");
  const [genNombres, setGenNombres] = useState("");
  const [genApellidos, setGenApellidos] = useState("");

  // RUC
  const [genRuc, setGenRuc] = useState("");
  const [genRazonSocial, setGenRazonSocial] = useState("");
  const [genCondicion, setGenCondicion] = useState("");
  const [genEstado, setGenEstado] = useState("");
  const [genRegimen, setGenRegimen] = useState("");

  // 3) Datos del negocio
  const [denominacionComercial, setDenominacionComercial] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");

  const [via, setVia] = useState<ViaTipo | "">("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");

  // 4) Información adicional
  const [trabajaRedAgentes, setTrabajaRedAgentes] = useState(false);
  const [agentesSeleccionados, setAgentesSeleccionados] = useState<string[]>([]);
  const [tieneInternet, setTieneInternet] = useState(true);

  const validarDni = (v: string) => /^\d{8}$/.test(v.trim());
  const validarRuc = (v: string) => /^\d{11}$/.test(v.trim());

  const puedeBuscar = useMemo(() => {
    if (sinRuc) return validarDni(dni);
    return validarRuc(ruc);
  }, [sinRuc, dni, ruc]);

  const hayDatos = useMemo(() => (sinRuc ? !!reniec : !!sunat), [sinRuc, reniec, sunat]);
  // 5) confirmar y continuar
  const confirmarYContinuar = () => {
    if (!hayDatos) return; // ✅ solo después de Buscar
    navigate("/siguiente-paso"); // 🔁 cambia esta ruta a la real
  };


  // ubigeo dependiente
  const provinciasDisponibles = useMemo(() => {
    if (!departamento) return [];
    return UBIGEO.provincias[departamento] ?? [];
  }, [departamento]);

  const distritosDisponibles = useMemo(() => {
    if (!provincia) return [];
    return UBIGEO.distritos[provincia] ?? [];
  }, [provincia]);

  const limpiarBusqueda = () => {
    setError("");
    setReniec(null);
    setSunat(null);
  };

  const buscar = async () => {
    limpiarBusqueda();

    if (sinRuc && !validarDni(dni)) return setError("Ingresa un DNI válido (8 dígitos).");
    if (!sinRuc && !validarRuc(ruc)) return setError("Ingresa un RUC válido (11 dígitos).");

    setLoading(true);
    try {
      // ✅ DEMO: solo muestra (sin API real por ahora)
      await new Promise((r) => setTimeout(r, 800));

      if (sinRuc) {
        const data: ReniecData = {
          dni: dni.trim(),
          nombres: "EDWIN",
          apellidoPaterno: "YUCRA",
          apellidoMaterno: "—",
        };
        setReniec(data);

        // precarga datos generales
        setGenDni(data.dni);
        setGenNombres(data.nombres);
        setGenApellidos(`${data.apellidoPaterno} ${data.apellidoMaterno}`.trim());
      } else {
        const data: SunatData = {
          ruc: ruc.trim(),
          razonSocial: "AGENTE EXPRESS S.A.C.",
          condicion: "HABIDO",
          estado: "ACTIVO",
          regimenTributario: "RÉGIMEN MYPE TRIBUTARIO",
        };
        setSunat(data);

        // precarga datos generales
        setGenRuc(data.ruc);
        setGenRazonSocial(data.razonSocial);
        setGenCondicion(data.condicion);
        setGenEstado(data.estado);
        setGenRegimen(data.regimenTributario);
      }

      // ✅ regla: no avanza si no se presiona Buscar
      setAccBuscarOpen(false);
      setAccGeneralesOpen(true);
      setAccNegocioOpen(false);
      setAccAdicionalOpen(false);
    } catch {
      setError("No se pudo validar en este momento. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Guardado demo (porque las siguientes páginas aún no van)
  const guardar = () => {
    if (!hayDatos) return;

    const payload = {
      modo: sinRuc ? "DNI" : "RUC",
      generales: sinRuc
        ? { dni: genDni, nombres: genNombres, apellidos: genApellidos }
        : {
          ruc: genRuc,
          razonSocial: genRazonSocial,
          condicion: genCondicion,
          estado: genEstado,
          regimenTributario: genRegimen,
        },
      negocio: {
        denominacionComercial,
        ubicacion: { departamento, provincia, distrito },
        direccion: { via, direccion, referencia },
      },
      adicional: {
        trabajaRedAgentes,
        agentes: trabajaRedAgentes ? agentesSeleccionados : [],
        tieneInternet,
      },
    };

    localStorage.setItem("afiliacion_validacion_datos", JSON.stringify(payload));
    alert("✅ Datos guardados (demo). Luego aquí se continúa al siguiente paso del flujo.");
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
        {/* Header de página */}
        <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 2.1, md: 2.4 } }}>
          <Typography sx={{ fontWeight: 950, fontSize: { xs: 20, md: 24 } }}>
            Validación de datos
          </Typography>

          <Typography sx={{ mt: 0.6, color: "text.secondary", fontSize: 14 }}>
            {sinRuc
              ? "Como no cuentas con RUC, validaremos tu identidad con DNI (demo)."
              : "Validaremos tu negocio con RUC (demo) y cargaremos los datos principales."}
          </Typography>

          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip size="small" label="Etapa 2 · Fase 1" />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              label={sinRuc ? "Modo: DNI" : "Modo: RUC"}
            />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ px: { xs: 1.25, md: 2 }, py: { xs: 1.25, md: 1.8 } }}>
          {/* 1) Buscar por DNI/RUC */}
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

                {/* ✅ Alineación perfecta: helper real + helper fantasma */}
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

                    <FormHelperText>
                      {sinRuc ? "Debe tener 8 dígitos." : "Debe tener 11 dígitos."}
                    </FormHelperText>
                  </FormControl>

                  {/* BOTÓN */}
                  <FormControl sx={{ width: { xs: "100%", sm: 160 } }}>
                    <Button
                      variant="contained"
                      onClick={buscar}
                      disabled={!puedeBuscar || loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={18} sx={{ color: "white" }} />
                        ) : (
                          <SearchRoundedIcon />
                        )
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

                    {/* helper fantasma */}
                    <FormHelperText sx={{ visibility: "hidden" }}>.</FormHelperText>
                  </FormControl>
                </Box>

                <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                  * Demo: solo muestra datos de ejemplo. Luego se conecta a servicios reales.
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* 2) Datos generales (BLOQUEADO hasta buscar) */}
          <Accordion
            expanded={accGeneralesOpen && hayDatos}
            onChange={(_, v) => {
              if (!hayDatos) return;
              setAccGeneralesOpen(v);
            }}
            disabled={!hayDatos}
            disableGutters
            elevation={0}
            sx={{
              mt: 1.6,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,.10)",
              overflow: "hidden",
              "&:before": { display: "none" },
              opacity: hayDatos ? 1 : 0.55,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>2) Datos generales</Typography>
                {hayDatos ? (
                  <Chip
                    icon={<CheckCircleRoundedIcon />}
                    label="Cargado"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  <Chip size="small" label="Requiere búsqueda" variant="outlined" />
                )}
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {!hayDatos ? (
                <Alert severity="info">Primero realiza la búsqueda para habilitar este paso.</Alert>
              ) : (
                <Stack spacing={1.4}>
                  {sinRuc ? (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 1.2,
                      }}
                    >
                      <TextField
                        label="DNI"
                        value={genDni}
                        onChange={(e) => setGenDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="Nombre(s)"
                        value={genNombres}
                        onChange={(e) => setGenNombres(e.target.value)}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="Apellidos"
                        value={genApellidos}
                        onChange={(e) => setGenApellidos(e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ gridColumn: { xs: "auto", md: "1 / span 2" } }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 1.2,
                      }}
                    >
                      <TextField
                        label="RUC"
                        value={genRuc}
                        onChange={(e) => setGenRuc(e.target.value.replace(/\D/g, "").slice(0, 11))}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="Razón social"
                        value={genRazonSocial}
                        onChange={(e) => setGenRazonSocial(e.target.value)}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="Condición"
                        value={genCondicion}
                        onChange={(e) => setGenCondicion(e.target.value)}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="Estado del contribuyente"
                        value={genEstado}
                        onChange={(e) => setGenEstado(e.target.value)}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="Régimen tributario"
                        value={genRegimen}
                        onChange={(e) => setGenRegimen(e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ gridColumn: { xs: "auto", md: "1 / span 2" } }}
                      />
                    </Box>
                  )}

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (!hayDatos) return;
                        setAccNegocioOpen(true);
                      }}
                      sx={{
                        borderRadius: 2.2,
                        textTransform: "none",
                        fontWeight: 900,
                        bgcolor: BRAND.green,
                        "&:hover": { bgcolor: BRAND.greenHover },
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

          {/* 3) Datos del negocio (BLOQUEADO hasta buscar) */}
          <Accordion
            expanded={accNegocioOpen && hayDatos}
            onChange={(_, v) => {
              if (!hayDatos) return;
              setAccNegocioOpen(v);
            }}
            disabled={!hayDatos}
            disableGutters
            elevation={0}
            sx={{
              mt: 1.6,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,.10)",
              overflow: "hidden",
              "&:before": { display: "none" },
              opacity: hayDatos ? 1 : 0.55,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography sx={{ fontWeight: 900 }}>3) Datos del negocio</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {!hayDatos ? (
                <Alert severity="info">Primero realiza la búsqueda para habilitar este paso.</Alert>
              ) : (
                <Stack spacing={1.4}>
                  <TextField
                    label="Denominación comercial"
                    value={denominacionComercial}
                    onChange={(e) => setDenominacionComercial(e.target.value)}
                    size="small"
                    fullWidth
                    helperText="Este nombre saldrá en comprobantes y documentos."
                  />

                  {/* Ubicación */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                      gap: 1.2,
                    }}
                  >
                    <FormControl size="small" fullWidth>
                      <InputLabel>Departamento</InputLabel>
                      <Select
                        label="Departamento"
                        value={departamento}
                        onChange={(e) => {
                          const dep = String(e.target.value);
                          setDepartamento(dep);
                          setProvincia("");
                          setDistrito("");
                        }}
                      >
                        {UBIGEO.departamentos.map((d) => (
                          <MenuItem key={d} value={d}>
                            {d}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth disabled={!departamento}>
                      <InputLabel>Provincia</InputLabel>
                      <Select
                        label="Provincia"
                        value={provincia}
                        onChange={(e) => {
                          const prov = String(e.target.value);
                          setProvincia(prov);
                          setDistrito("");
                        }}
                      >
                        {provinciasDisponibles.map((p) => (
                          <MenuItem key={p} value={p}>
                            {p}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth disabled={!provincia}>
                      <InputLabel>Distrito</InputLabel>
                      <Select
                        label="Distrito"
                        value={distrito}
                        onChange={(e) => setDistrito(String(e.target.value))}
                      >
                        {distritosDisponibles.map((di) => (
                          <MenuItem key={di} value={di}>
                            {di}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Dirección */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "190px 1fr" },
                      gap: 1.2,
                      alignItems: "start",
                    }}
                  >
                    <FormControl size="small" fullWidth>
                      <InputLabel>Vía</InputLabel>
                      <Select
                        label="Vía"
                        value={via}
                        onChange={(e) => setVia(e.target.value as ViaTipo)}
                      >
                        {VIAS.map((v) => (
                          <MenuItem key={v} value={v}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Tipo de vía</FormHelperText>
                    </FormControl>

                    <TextField
                      label="Dirección"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      size="small"
                      fullWidth
                      helperText="Ej: Los Pinos 123"
                    />
                  </Box>

                  <TextField
                    label="Referencia (opcional)"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                    size="small"
                    fullWidth
                  />

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (!hayDatos) return;
                        setAccAdicionalOpen(true);
                      }}
                      sx={{
                        borderRadius: 2.2,
                        textTransform: "none",
                        fontWeight: 900,
                        bgcolor: BRAND.green,
                        "&:hover": { bgcolor: BRAND.greenHover },
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

          {/* 4) Información adicional (BLOQUEADO hasta buscar) */}
          <Accordion
            expanded={accAdicionalOpen && hayDatos}
            onChange={(_, v) => {
              if (!hayDatos) return;
              setAccAdicionalOpen(v);
            }}
            disabled={!hayDatos}
            disableGutters
            elevation={0}
            sx={{
              mt: 1.6,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,.10)",
              overflow: "hidden",
              "&:before": { display: "none" },
              opacity: hayDatos ? 1 : 0.55,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography sx={{ fontWeight: 900 }}>4) Información adicional</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {!hayDatos ? (
                <Alert severity="info">Primero realiza la búsqueda para habilitar este paso.</Alert>
              ) : (
                <Stack spacing={1.4}>
                  {/* Pregunta 1 */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={trabajaRedAgentes}
                        onChange={(e) => {
                          const v = e.target.checked;
                          setTrabajaRedAgentes(v);
                          if (!v) setAgentesSeleccionados([]);
                        }}
                      />
                    }
                    label="¿Trabaja con red de agentes?"
                  />

                  {trabajaRedAgentes && (
                    <Autocomplete
                      multiple
                      freeSolo
                      options={AGENTES_EXISTENTES}
                      value={agentesSeleccionados}
                      onChange={(_, values) => setAgentesSeleccionados(values)}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox checked={selected} sx={{ mr: 1 }} />
                          {option}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Selecciona agentes (puedes elegir varios o escribir otros)"
                          size="small"
                          helperText="Ej: KasNet, Agente BCP, u otros."
                        />
                      )}
                    />
                  )}

                  {/* Pregunta 2 */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tieneInternet}
                        onChange={(e) => setTieneInternet(e.target.checked)}
                      />
                    }
                    label="¿Cuenta con internet?"
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "stretch", sm: "flex-end" },
                      gap: 1.2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<SaveRoundedIcon />}
                      onClick={guardar}
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
                      Guardar
                    </Button>

                    {/* Si quieres seguir dejando el navigate para luego, lo puedes comentar */}
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/bienvenida")}
                      sx={{
                        borderRadius: 2.2,
                        textTransform: "none",
                        fontWeight: 900,
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      Volver
                    </Button>
                  </Box>
                </Stack>
              )}
            </AccordionDetails>
          </Accordion>
          {/* Acciones finales */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={confirmarYContinuar}
              disabled={!hayDatos || loading}
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
              Confirmar y continuar
            </Button>
          </Box>

        </Box>
      </Paper>
    </Box>
  );
}

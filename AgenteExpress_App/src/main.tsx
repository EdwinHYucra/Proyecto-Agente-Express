import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { registerLicense } from "@syncfusion/ej2-base";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-react-popups/styles/material.css";

import "./app/index.css";
import AppRouter from "./app/router";

registerLicense("Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWX5cdnVSRGNYWUx1V0BWYEs=");

// Por ahora usamos el theme simple (el anterior)
const theme = createTheme({
  // Si “todavía no usarás tu theme”, igual puedes dejar esto mínimo.
  // Si luego quieres tu paleta, lo ajustamos en 1 minuto.
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);
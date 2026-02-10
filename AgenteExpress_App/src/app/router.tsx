import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import IniciarSesionPage from "../modules/auth/pages/IniciarSesionPage";
import DatosPersonalesPage from "../modules/auth/pages/DatosPersonalesPage";

import BienvenidaPage from "../modules/afiliacion/pages/BienvenidaPage";
import ValidacionDatosPage from "../modules/afiliacion/pages/ValidacionDatosPage";
import ChecklistRequisitosPage from "../modules/registro/pages/ChecklistRequisitosPage";
import ContratoAfiliacionPage from "../modules/registro/pages/ContratoAfiliacionPage";

// Layout global (header/footer)
import AppShellLayout from "../modules/shared/AppShellLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* raíz */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Públicas (sin header/footer) */}
        <Route path="/login" element={<IniciarSesionPage />} />
        <Route path="/registro" element={<DatosPersonalesPage />} />

        {/* Sistema / Afiliación (con header/footer) */}
        <Route element={<AppShellLayout madeBy="Edwin Eulogio" />}>
          <Route path="/bienvenida" element={<BienvenidaPage />} />
          <Route path="/validacion-datos" element={<ValidacionDatosPage />} />
          <Route path="/checklist-requisitos" element={<ChecklistRequisitosPage />} />
          <Route path="/contrato-afiliacion" element={<ContratoAfiliacionPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

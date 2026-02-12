import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import IniciarSesionPage from "../modules/auth/pages/IniciarSesionPage";
import DatosPersonalesPage from "../modules/auth/pages/DatosPersonalesPage";

import BienvenidaPage from "../modules/afiliacion/pages/BienvenidaPage";
import ValidacionDatosPage from "../modules/afiliacion/pages/ValidacionDatosPage";
import EnvioRequisitosPage from "../modules/afiliacion/pages/EnvioRequisitosPage";

// (estos dos dijiste que aún no se harán; puedes dejarlos o comentarlos)
import ChecklistRequisitosPage from "../modules/registro/pages/ChecklistRequisitosPage";
import ContratoAfiliacionPage from "../modules/registro/pages/ContratoAfiliacionPage";

// Layouts
import AppShellLayout from "../modules/shared/AppShellLayout";
import FlowShellLayout from "../modules/shared/FlowShellLayout";
import CompletadaPage from "@/modules/afiliacion/pages/CompletadaPage";

// Sistema
//import DashboardPage from "../modules/dashboard/pages/DashboardPage"; // crea esta page si aún no existe

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* raíz */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Públicas (sin header/footer) */}
        <Route path="/login" element={<IniciarSesionPage />} />
        <Route path="/registro" element={<DatosPersonalesPage />} />

        {/* ✅ Flujo de Afiliación (con header/footer, SIN menú lateral) */}
        <Route element={<FlowShellLayout madeBy="Edwin Eulogio" />}>
          <Route path="/bienvenida" element={<BienvenidaPage />} />
          <Route path="/validacion-datos" element={<ValidacionDatosPage />} />
          <Route path="/envio-de-requisitos" element={<EnvioRequisitosPage />} />
          <Route path="/confimacion" element={<CompletadaPage />} />

          {/* Opcional (si ya la crearás): */}
          {/* <Route path="/afiliacion/fase-2-completada" element={<Fase2CompletadaPage />} /> */}

          {/* Si estos aún no van, mejor comentarlos por ahora */}
          <Route path="/checklist-requisitos" element={<ChecklistRequisitosPage />} />
          <Route path="/contrato-afiliacion" element={<ContratoAfiliacionPage />} />
        </Route>

        {/* ✅ Sistema (con header/footer + menú lateral) */}
        <Route element={<AppShellLayout madeBy="Edwin Eulogio" />}>
          <Route path="/dashboard" element={< IniciarSesionPage/>} />


          {/* Ejemplo para cuando actives operaciones */}
          {/* <Route path="/operaciones/cash-out" element={<CashOutPage />} /> */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

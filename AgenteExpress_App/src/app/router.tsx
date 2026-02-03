import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SeleccionPlanPage from "../modules/registro/pages/SeleccionPlanPage";
import DatosPersonalesPage from "../modules/registro/pages/DatosPersonalesPage";

import BienvenidaPage from "../modules/registro/pages/BienvenidaPage";
import ValidacionRucPage from "../modules/registro/pages/ValidacionRucPage";
import ChecklistRequisitosPage from "../modules/registro/pages/ChecklistRequisitosPage";
import ContratoAfiliacionPage from "../modules/registro/pages/ContratoAfiliacionPage";
import IniciarSesionPage from "../modules/auth/pages/IniciarSesionPage";
import RegistroPage from "@/modules/auth/pages/RegistroPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<IniciarSesionPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/registro/plan" element={<SeleccionPlanPage />} />
        <Route path="/registro/datos" element={<DatosPersonalesPage />} />
        <Route path="/registro/bienvenida" element={<BienvenidaPage />} />
        <Route path="/registro/validacion-ruc" element={<ValidacionRucPage />} />
        <Route path="/registro/checklist-requisitos" element={<ChecklistRequisitosPage />} />
        <Route path="/registro/contrato-afiliacion" element={<ContratoAfiliacionPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

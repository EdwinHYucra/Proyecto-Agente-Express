import { useState } from "react";
import RegistroLayout from "../components/RegistroLayout";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

export default function SeleccionPlanPage() {

  const [plan, setPlan] = useState<"FREE" | "PREMIUM" | null>(null);

  return (
    <RegistroLayout>

      <h2>Selecciona tu tipo de cuenta</h2>

      <div style={{
        display: "flex",
        gap: 30,
        marginTop: 40,
        flexWrap: "wrap"
      }}>

        {/* FREE */}
        <div
          className={`e-card plan-card ${plan === "FREE" ? "selected" : ""}`}
          onClick={() => setPlan("FREE")}
        >

          <div className="e-card-header">
            <div className="e-card-header-title">
              Cuenta Free
            </div>
          </div>

          <div className="e-card-content">
            Registro básico
            <ul>
              <li>✔ Registro simple</li>
              <li>✔ Operaciones básicas</li>
              <li>✔ Soporte estándar</li>
            </ul>
          </div>

        </div>

        {/* PREMIUM */}
        <div
          className={`e-card plan-card premium ${plan === "PREMIUM" ? "selected" : ""}`}
          onClick={() => setPlan("PREMIUM")}
        >

          <div className="e-card-header">
            <div className="e-card-header-title">
              Cuenta Premium
            </div>
          </div>

          <div className="e-card-content">
            Funciones avanzadas
            <ul>
              <li>✔ Todo Free</li>
              <li>✔ Reportes</li>
              <li>✔ Prioridad soporte</li>
            </ul>
          </div>

        </div>

      </div>

      <div style={{ marginTop: 40 }}>
        <ButtonComponent
          cssClass="e-primary"
          disabled={!plan}
        >
          Continuar
        </ButtonComponent>
      </div>

    </RegistroLayout>
  );
}

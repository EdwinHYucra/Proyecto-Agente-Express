import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import "./layout.css";
import logo from "../../assets/logo.png";

export default function HeaderSistema() {
  return (
    <>
      {/* HEADER PRINCIPAL */}
      <AppBarComponent colorMode="Primary" className="app-header">
        <div className="header-left">
          <img src={logo} className="header-logo" />
          <span className="header-title">
            Codigo de Agente: CGDT-170499
          </span>
        </div>

        <div className="header-right">
          <span>Bienvenido: Luis</span>
          <div className="avatar">L</div>
        </div>
      </AppBarComponent>

      {/* BARRA VERDE */}
      <div className="header-metrics">
        <span>Este mes vas ganando: S/0.00</span>
        <span>Mes anterior: S/0.00</span>
        <span>Fecha: 26/01/2026 19:17</span>
      </div>
    </>
  );
}
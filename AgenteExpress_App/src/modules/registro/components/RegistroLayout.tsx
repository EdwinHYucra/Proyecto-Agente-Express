import type{ ReactNode } from "react";
import "./RegistroLayout.css";
import logo from "../../../assets/logo.png";
import promo from "../../../assets/Promo.jpeg";

type Props = {
  children: ReactNode;
};

export default function RegistroLayout({ children }: Props) {
  return (
    <div className="reg-root">
      <section className="reg-shell">
        {/* IZQUIERDA */}
        <aside className="reg-left">
          <div className="reg-left-top">
            {/* Reemplaza con tu logo real */}
            <img className="reg-logo" src={logo} alt="Agente Express" />
          </div>

          <div className="reg-left-media">
            {/* Reemplaza con tu imagen real */}
            <img className="reg-photo" src={promo} alt="Promo" />
          </div>

          <button className="reg-req-btn" type="button">
            Ver Requisitos
          </button>
        </aside>

        {/* DERECHA */}
        <main className="reg-right">
          <div className="reg-content">
            {children}
          </div>
        </main>
      </section>
    </div>
  );
}

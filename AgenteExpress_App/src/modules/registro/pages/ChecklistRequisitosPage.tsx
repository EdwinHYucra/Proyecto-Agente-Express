import RegistroLayout from "../components/RegistroLayout";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import StepRegistro from "../components/StepRegistro";

export default function ChecklistRequisitosPage() {
    return (
        <RegistroLayout>

            <StepRegistro activeStep={1} />
            <h1 style={{ textAlign: "center", marginBottom: 20 }}>
                Check List de Requisitos
            </h1>

            <p style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 30px" }}>
                Antes de continuar con tu afiliación como agente KasNet, asegúrate de
                contar con los siguientes requisitos:
            </p>

            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <ul style={{ lineHeight: "2.2em", fontSize: 16 }}>
                    <li>✔ Documento de identidad vigente (DNI)</li>
                    <li>✔ RUC activo y habido</li>
                    <li>✔ Correo electrónico válido</li>
                    <li>✔ Número de teléfono móvil</li>
                    <li>✔ Dirección del local comercial</li>
                </ul>
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
                <ButtonComponent cssClass="e-primary">
                    Siguiente
                </ButtonComponent>
            </div>
        </RegistroLayout>
    );
}

import RegistroLayout from "../components/RegistroLayout";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import StepRegistro from "../components/StepRegistro";

export default function ContratoAfiliacionPage() {
  return (
    <RegistroLayout>
      <StepRegistro activeStep={2} />
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        ¡Bienvenido a la familia KasNet!
      </h1>

      <p style={{ marginBottom: 20 }}>
        Estimado cliente, requerimos que aceptes la siguiente{" "}
        <strong>DECLARACIÓN JURADA DE AUTENTICIDAD DE DOCUMENTOS</strong> antes de
        iniciar tu proceso de afiliación.
      </p>

      <div
        style={{
          maxHeight: 250,
          overflowY: "auto",
          padding: 15,
          border: "1px solid #ddd",
          marginBottom: 20,
          fontSize: 14
        }}
      >
        <p>
          Al amparo de lo dispuesto en el artículo 427° del Código Penal, declaro
          bajo juramento que los documentos e información proporcionados son
          auténticos y veraces.
        </p>

        <p>
          Asimismo, autorizo el tratamiento de mis datos personales conforme a
          la Ley N° 29733 – Ley de Protección de Datos Personales.
        </p>

        <p>
          En caso de información falsa o fraudulenta, asumo las
          responsabilidades legales correspondientes.
        </p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <CheckBoxComponent label="Acepto la declaración jurada" />
        <br />
        <CheckBoxComponent label="Acepto el tratamiento de datos personales" />
      </div>

      <div style={{ textAlign: "right" }}>
        <ButtonComponent cssClass="e-primary">
          Siguiente
        </ButtonComponent>
      </div>
    </RegistroLayout>
  );
}

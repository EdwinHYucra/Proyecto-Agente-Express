import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";

export default function BienvenidaPage() {

  return (
    <div style={{ padding: 40 }}>

      <h2 style={{ textAlign: "center" }}>
        ¡Bienvenido a la familia KasNet!
      </h2>

      <p style={{ marginTop: 20 }}>
        Estimado cliente requerimos aceptes la siguiente DECLARACIÓN JURADA DE AUTENTICIDAD DE DOCUMENTOS
        antes de iniciar tu proceso de afiliación.
      </p>

      <div style={{ marginTop: 20 }}>
        <CheckBoxComponent label="Declaro bajo juramento que los documentos son auténticos" />
      </div>

      <div style={{ marginTop: 10 }}>
        <CheckBoxComponent label="Autorizo el tratamiento de mis datos personales" />
      </div>

      <p style={{ marginTop: 20 }}>
        A continuación deberás seguir los siguientes 3 pasos para completar tu afiliación.
      </p>

      <div style={{ textAlign: "right", marginTop: 30 }}>
        <ButtonComponent cssClass="e-primary">
          Siguiente
        </ButtonComponent>
      </div>

    </div>
  );
}

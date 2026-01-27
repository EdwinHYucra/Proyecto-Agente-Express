import RegistroLayout from "../components/RegistroLayout";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

export default function DatosPersonalesPage() {

  return (
    <RegistroLayout>

        {/* TÍTULO */}
        <h2 style={{ color: "#3f51b5", marginBottom: 30 }}>
          Regístrate y sé agente Express
        </h2>

        {/* FILA 1 */}
        <div style={{ display: "flex", gap: 20 }}>

          <TextBoxComponent
            placeholder="Nombres *"
            floatLabelType="Always"
            width="250px"
          />

          <TextBoxComponent
            placeholder="Apellido paterno *"
            floatLabelType="Always"
            width="250px"
          />

          <TextBoxComponent
            placeholder="Apellido materno"
            floatLabelType="Always"
            width="250px"
          />

        </div>

        {/* FILA 2 */}
        <div style={{ marginTop: 20, width: 250 }}>
          <TextBoxComponent
            placeholder="Teléfono Móvil *"
            floatLabelType="Always"
          />
        </div>

        {/* TEXTO */}
        <div style={{ marginTop: 30, fontWeight: 500 }}>
          Indicar si no cuenta con alguno de estos requisitos:
        </div>

        {/* CHECKS */}
        <div style={{ display: "flex", gap: 60, marginTop: 10 }}>

          <CheckBoxComponent label="No tengo correo electrónico" />

          <CheckBoxComponent label="No tengo RUC" />

        </div>

        {/* FILA 3 */}
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>

          <TextBoxComponent
            placeholder="Correo"
            floatLabelType="Always"
            width="250px"
          />

          <DropDownListComponent
            placeholder="Rubro / Tipo de negocio"
            floatLabelType="Always"
            width="250px"
          />

        </div>

        {/* SUBTÍTULO */}
        <div style={{ marginTop: 35, fontWeight: 600 }}>
          Ubicación de tu local:
        </div>

        {/* FILA 4 */}
        <div style={{ display: "flex", gap: 20, marginTop: 10 }}>

          <DropDownListComponent
            placeholder="Departamento *"
            floatLabelType="Always"
            width="220px"
          />

          <DropDownListComponent
            placeholder="Provincia *"
            floatLabelType="Always"
            width="220px"
          />

          <DropDownListComponent
            placeholder="Distrito *"
            floatLabelType="Always"
            width="220px"
          />

        </div>

        {/* BOTONES */}
        <div style={{ display: "flex", gap: 20, marginTop: 40 }}>

          <ButtonComponent
            cssClass="e-primary"
            style={{ width: 160 }}
          >
            Continuar
          </ButtonComponent>

          <ButtonComponent
            cssClass="e-flat"
            style={{ width: 160 }}
          >
            Salir
          </ButtonComponent>

        </div>
    </RegistroLayout>
  );
}

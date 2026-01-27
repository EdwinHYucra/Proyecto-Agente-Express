import { StepperComponent } from "@syncfusion/ej2-react-navigations";
import type { StepModel } from "@syncfusion/ej2-react-navigations";

interface Props {
  activeStep: number;
}

export default function StepRegistro({ activeStep }: Props) {

  const steps: StepModel[] = [
    { label: "Cuenta" },
    { label: "Requisitos" },
    { label: "Contrato" }
  ];

  return (
    <div style={{ marginBottom: 30 }}>
      <StepperComponent
        steps={steps}
        activeStep={activeStep}
        orientation="Horizontal"
        labelPosition="Bottom"
      />
    </div>
  );
}

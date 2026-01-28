import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective }
    from "@syncfusion/ej2-react-navigations";

import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import StepRegistro from "../components/StepRegistro";
import HeaderSistema from "../../shared/HeaderSistema";
import FooterSistema from "../../shared/FooterSistema";

export default function ValidacionRucPage() {

    return (
        <>
        <HeaderSistema />
        <div style={{ padding: 40 }}>
            
            <StepRegistro activeStep={0} />


            {/* RUC */}
            <div style={{ marginBottom: 20 }}>
                <TextBoxComponent
                    placeholder="RUC *"
                    floatLabelType="Always"
                />

                <div style={{ marginTop: 10 }}>
                    <ButtonComponent>
                        Registrar RUC
                    </ButtonComponent>
                </div>
            </div>

            {/* SECCIONES */}
            <AccordionComponent>

                <AccordionItemsDirective>

                    <AccordionItemDirective header="AGENTE" content="Información agente" />
                    <AccordionItemDirective header="FISCAL" content="Dirección fiscal" />
                    <AccordionItemDirective header="COMERCIO" content="Dirección comercio" />
                    <AccordionItemDirective header="ADICIONAL" content="Información adicional" />
                    <AccordionItemDirective header="CONTACTO" content="Contacto prospecto" />

                </AccordionItemsDirective>

            </AccordionComponent>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 20, marginTop: 30 }}>
                <ButtonComponent>Guardar</ButtonComponent>
                <ButtonComponent cssClass="e-primary">Enviar</ButtonComponent>
            </div>

        </div>
        <FooterSistema />
        </>
    );
}

import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

export default function CuentaCreadaPage() {

    return (
        <DialogComponent
            visible={true}
            width="600px"
            showCloseIcon={false}
            isModal={true}
        >

            <div style={{ display: "flex", gap: 30 }}>

                {/* IZQUIERDA */}
                <div style={{ width: 180, textAlign: "center" }}>
                    <h2 style={{ color: "#4F46E5" }}>¡Genial!</h2>

                    <p>
                        Solo te falta realizar los siguientes pasos para completar tu registro
                    </p>

                    <img
                        src="/oskar.png"
                        style={{ width: 140 }}
                    />
                </div>

                {/* DERECHA */}
                <div style={{ flex: 1 }}>

                    <h2>¡Registro exitoso!</h2>
                    <p>Confirma tu registro:</p>

                    <ol>
                        <li>Busca el correo enviado por <b>AFILIACIONES KASNET</b></li>
                        <li>Ingresa al enlace y coloca las credenciales enviadas</li>
                    </ol>

                    <p>
                        Si no encuentras el correo, revisa la carpeta "Correo no deseado"
                    </p>

                    <p>
                        Gracias por elegirnos,<br />
                        Tu familia <b>Agente KasNet</b>
                    </p>

                    <div style={{ textAlign: "right", marginTop: 20 }}>
                        <ButtonComponent cssClass="e-primary">
                            Ingresar
                        </ButtonComponent>
                    </div>

                </div>

            </div>

        </DialogComponent>
    );
}
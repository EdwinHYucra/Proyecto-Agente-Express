import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useNavigate } from "react-router-dom";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CuentaCreadaPage({ visible, onClose }: Props) {

  const navigate = useNavigate();

  const handleIngresar = () => {
    onClose();

    setTimeout(() => {
      navigate("/registro/validacion-ruc");
    }, 100);
  };

  return (
    <DialogComponent
      visible={visible}
      width="600px"
      isModal={true}
      showCloseIcon={false}
      closeOnEscape={false}
    >
      <div style={{ display: "flex", gap: 30 }}>

        {/* IZQUIERDA */}
        <div style={{ width: 180, textAlign: "center" }}>
          <h2 style={{ color: "#4F46E5" }}>¡Genial!</h2>

          <p>
            Solo te falta realizar los siguientes pasos para completar tu registro
          </p>

          <img src="/oskar.png" style={{ width: 140 }} />
        </div>

        {/* DERECHA */}
        <div style={{ flex: 1 }}>

          <h2>¡Registro exitoso!</h2>

          <p>Confirma tu registro:</p>

          <ol>
            <li>Busca el correo enviado por <b>AFILIACIONES AGENTEEXPRESS</b></li>
            <li>Ingresa al enlace y coloca las credenciales enviadas</li>
          </ol>

          <p>
            Si no encuentras el correo, revisa la carpeta "Correo no deseado"
          </p>

          <p>
            Gracias por elegirnos,<br />
            Tu familia <b>AgenteExpress</b>
          </p>

          <div style={{ textAlign: "right", marginTop: 20 }}>
            <ButtonComponent
              cssClass="e-primary"
              onClick={handleIngresar}
            >
              Ingresar
            </ButtonComponent>
          </div>

        </div>

      </div>
    </DialogComponent>
  );
}
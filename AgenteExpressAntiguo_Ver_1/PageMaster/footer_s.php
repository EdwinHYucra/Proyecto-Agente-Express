<footer class="fontSign">
        <section class="pre-footer">
            <div>
                <h2>Streaming Express</h2>
            </div>
        </section>
        <section class="footer">
            <div>
                <h3>Streaming Express</h3>
                <p>Streaming Express es un servicio prestado por InDigital.</p>
            </div>
            <div>
                <h3>Contacto</h3>
                <p>Email: streaming@agenteexpress.com</p>
                <p>WhatsApp: +5154528635</p>
            </div>
        </section>
        <section class="copyright">
            <p>Copyright 2024 Streaming Express | Desarrollado por InDigital.</p>
            <div class="copy-social-media">
                <a href="https://www.facebook.com/StreamingExpressDT"><img src="../IMG/facebook.png" alt=""></a>
                <a href="https://api.whatsapp.com/send?phone=+5154528635&text=Hola,%20Necesito%20adquirir%20un%20Servicio%20de%20*Streaming*" target="_blank"><img src="../IMG/iconwsp.png" alt=""></a>
            </div>
        </section>
    </footer>
    
  
    <div class="iconflotante">
        <a href="https://api.whatsapp.com/send?phone=+5154528635&text=Hola,%20Necesito%20adquirir%20un%20Servicio%20de%20*Streaming*" target="_blank"><img src="../IMG/iconwsp.png" alt="" class="img-wap"></a>
    </div>
    




<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Pedido</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            background: #f0f0f0;
        }
        .iconflotante2 {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .btnI {
            padding: 10px 10px 10px 20px;
            font-size: 30px;
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
        }
        .popup {
            display: none;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            padding: 1px 40px 1px 10px;
            width: 98%; /* Ajusta el ancho para que no ocupe todo el ancho */
            max-width: 550px;
            border-radius: 15px;
            max-height: 100vh;
            overflow-y: auto;
            overflow-x: hidden; /* Evita el scroll horizontal */
            box-sizing: border-box;
        }
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
        .popup h2 {
            text-align: center;
            color: #000;
            margin-bottom: 20px;
        }
        .input-container {
            position: relative;
            margin-bottom: 15px;
        }
        .input-container input {
            width: 100%;
            padding: 10px 40px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
        }
        .input-container .icon {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            font-size: 18px;
            color: #888;
        }
        .popup-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 10px;
            margin: 10px 0;
            padding: 10px;
            background-color: #f9f9f9;
            cursor: pointer;
        }
        .popup-button.selected {
            border-color: #0ec438;
            background-color: #eaffea;
            border-width: 3px; /* Ajusta este valor para el ancho deseado */
            border-style: solid; /* Asegúrate de que el borde tenga un estilo sólido */
        }
        .popup-button span {
            color: #000;
            font-weight: bold;
        }
        .popup-button small {
            display: block;
            color: #000;
        }
        .popup-button strong {
            color: #000;
        }
        .popup label {
            margin-bottom: 5px;
            color: #000;
            display: block;
        }
        .popup p {
            margin-top: 15px;
            text-align: center;
            color: #1da1f2;
            font-weight: bold;
        }
        .finalizar-btn {
            background-color: #0ec438;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 15px;
            font-size: 22px;
            width: 100%;
            margin-top: 10px;
            cursor: pointer;
            font-weight: bold; /* Hace el texto en negrita */
            animation: pulse 2s infinite ease-in-out;
        }
        .finalizar-btn:hover {
            background-color: #039c27;
        }
        .cerrar-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #000;
        }
    </style>
</head>
<body>

    <div class="iconflotante2">
        <button class="btnI" type="button" onclick="mostrarPopup()">REALIZAR MI PEDIDO</button>
    </div>

    <div class="overlay" id="overlay" onclick="cerrarPopup()"></div>

    <div class="popup" id="popup">
        <button class="cerrar-btn" onclick="cerrarPopup()">&#10005;</button>
        <h2>CONFIRMACIÓN DE PEDIDO</h2>

        
        <div class="popup-button" onclick="seleccionarPlan(this, 'Un perfil Netflix', 9.90)" style="display: flex; align-items: center;">
            <img src="../IMG/Netflix.png" alt="Netflix" style="width: 40px; height: auto; margin-right: 10px; border-radius: 5px;" />
            <span style="text-align: left;">❤ Un perfil Netflix<br>
                <small style="padding: 0; margin: 0;">
                    <span style="background: #ED1515; color: white; padding: 2px 4px; border-radius: 3px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);">Ahorra 30%
                    </span>
                </small>
            </span>
            <strong style="margin-left: auto;">S/ 9.90</strong>
        </div>
        
        <div class="popup-button" onclick="seleccionarPlan(this, 'TU DUO Netflix + Disney', 18.90)" style="display: flex; align-items: center;">
            <img src="../IMG/Duo.png" alt="Netflix+Disney" style="width: 40px; height: auto; margin-right: 10px; border-radius: 5px;" />
            <span style="text-align: left;">❤ TU DUO ❤Netflix + Disney<br>
                <small style="padding: 0; margin: 0;">
                    <span style="background: #ED1515; color: white; padding: 2px 4px; border-radius: 3px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);">Ahorra 40%
                    </span>
                </small>
            </span>
            <strong style="margin-left: auto;">S/ 18.90</strong>
        </div>
        
        <div class="popup-button" onclick="seleccionarPlan(this, 'COMBITO Netflix + Disney + Max', 23.90)" style="display: flex; align-items: center;">
            <img src="../IMG/Trio.png" alt="Netflix+Disney+Max" style="width: 40px; height: auto; margin-right: 10px; border-radius: 5px;" />
            <span style="text-align: left;">❤💜 TRIO 💜 ❤ Netflix + Disney + Max<br>
                <small style="padding: 0; margin: 0;">
                    <span style="background: #ED1515; color: white; padding: 2px 4px; border-radius: 3px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);">Ahorra 50%
                    </span>
                </small>
            </span>
            <strong style="margin-left: auto;">S/ 23.90</strong>
        </div>
        
        <div class="popup-button" onclick="seleccionarPlan(this, 'COMBAZO Netflix + Disney + Max + Prime', 27.90)" style="display: flex; align-items: center;">
            <img src="../IMG/Cuarteto.png" alt="Netflix+Disney+Max+Prime" style="width: 40px; height: auto; margin-right: 10px; border-radius: 5px;" />
            <span style="text-align: left;">🧡 CUARTETO 🧡 Netflix + Disney + Max + Prime<br>
                <small style="padding: 0; margin: 0;">
                    <span style="background: #ED1515; color: white; padding: 2px 4px; border-radius: 3px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);">Ahorra 60%
                    </span>
                </small>
            </span>
            <strong style="margin-left: auto;">S/ 27.90</strong>
        </div>


        <p>TE ENVIAREMOS TU PERFIL POR WHATSAPP 👨‍💻👩‍💻</p>

        <label for="nombre">Nombre de perfil *</label>
        <div class="input-container">
            <span class="icon">&#128100;</span>
            <input type="text" id="nombre" placeholder="Nombre de perfil" required>
        </div>

        <label for="contrasena">Crear PIN (4 números) *</label>
        <div class="input-container">
            <span class="icon">&#128274;</span>
            <input type="text" id="contrasena" placeholder="Ejemplo: 4321" required maxlength="4" pattern="\d{4}">
        </div>

        <label for="whatsapp">WhatsApp *</label>
        <div class="input-container">
            <span class="icon">&#128241;</span>
            <input type="tel" id="whatsapp" placeholder="Número de contacto" required>
        </div>

        <p>
            <input type="checkbox" id="confirmacion" required>
            Confirmo que he revisado los datos ingresados (Esto facilitará la entrega.)
        </p>

        <button class="finalizar-btn" onclick="finalizarPedido()">FINALIZAR MI PEDIDO - S/ <span id="precio">9.90</span></button>
    </div>

    <script>
        function mostrarPopup() {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popup").style.display = "block";
        }

        function cerrarPopup() {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("popup").style.display = "none";
        }

        function seleccionarPlan(elemento, plan, precio) {
            document.querySelectorAll('.popup-button').forEach(button => {
                button.classList.remove('selected');
            });
            elemento.classList.add('selected');
            document.getElementById("precio").textContent = precio.toFixed(2);
        }

        function finalizarPedido() {
            const nombre = document.getElementById("nombre").value;
            const contrasena = document.getElementById("contrasena").value;
            const whatsapp = document.getElementById("whatsapp").value;
            const precio = document.getElementById("precio").textContent;
        
            // Verificar si todos los campos obligatorios están completos
            if (!nombre || !contrasena || !whatsapp) {
                alert('Por favor, completa todos los campos antes de finalizar el pedido.');
                return;
            }
        
            // Obtener el plan seleccionado
            const planSeleccionado = document.querySelector('.popup-button.selected span').textContent;
        
            // Crear el mensaje para enviar a WhatsApp
            const mensaje = `*Hola, quiero confirmar mi pedido Streaming:*\n\n- Nombre de perfil: ${nombre}\n- PIN: ${contrasena}\n- WhatsApp: ${whatsapp}\n- Plan seleccionado: ${planSeleccionado}\n- *Precio: S/ ${precio}*\n\n*AL ACEPTAR MI PEDIDO ME COMPROMETO A REALIZAR LA CANCELACIÓN CORRESPONDIENTE UNA VEZ VERIFICADO MIS ACCESOS*`;
        
            // Codificar el mensaje para la URL de WhatsApp
            const mensajeCodificado = encodeURIComponent(mensaje);
        
            // Redirigir a WhatsApp con el número y el mensaje
            window.open(`https://wa.me/54528635?text=${mensajeCodificado}`, '_blank');
        
            // Cerrar el popup
            cerrarPopup();
        }
        
        
        
        
        
        
    </script>
</body>
</html>
        






    
    
</head>
<body>

    <div class="iconflotante2">
        <button class="btnI" type="button" onclick="mostrarPopup()">REALIZAR MI PEDIDO</button>
    </div>

    <div class="overlay" id="overlay" onclick="cerrarPopup()"></div>

    <div class="popup" id="popup">
        <h2>¡Pedido Realizado!</h2>
        <p>Gracias por tu pedido. Se ha procesado correctamente.</p>
        <button onclick="cerrarPopup()">Cerrar</button>
    </div>

    <script>
        function mostrarPopup() {
            document.getElementById("overlay").style.display = "block"; // Muestra el fondo oscuro
            document.getElementById("popup").style.display = "block"; // Muestra el popup
        }

        function cerrarPopup() {
            document.getElementById("overlay").style.display = "none"; // Oculta el fondo oscuro
            document.getElementById("popup").style.display = "none"; // Oculta el popup
        }
    </script>
</body>
</html>

    
    <script type="text/javascript" src="../JS/header.js"></script>
</body>

</html>
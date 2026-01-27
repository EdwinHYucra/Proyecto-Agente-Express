<?php require_once("../PageMaster/header.php") ?>
<?php
// Obtener la URL actual
/*$currentUrl = $_SERVER['REQUEST_URI'];

// Verificar si la URL ya contiene la sección
if (strpos($currentUrl, "#Ubicar-Agente") === false) {
    // Si no contiene la sección, redirigir a la misma página con la sección deseada
    header("Location: /Pages/agente.php#Ubicar-Agente");
    exit(); // Asegurarse de que el script se detenga después de redireccionar
}*/
?>
<head>
    <link rel="stylesheet" href="/CSS/agente.css">
</head>
<section class="container-beneficios">
    <h1 id="Beneficios" class="title-c-b">BENEFICIOS</h1>
    <div class="rows-beneficios">
        <div class="caja-rows">
            <img src="../IMG/img-icons/iconRequisitos.png" alt="icono requisitos">
            <h2>Requisitos Básicos</h2>
            <p>Los requisitos que solicitamos para formar parte de nuestra red de Agentes Express son básicos, en un plazo máximo de 10 días ya puedes empezar a generar ganancias.</p>
        </div>
        <div class="caja-rows">
            <img src="../IMG/img-icons/iconGanancias.png" alt="icono Ganacias">
            <h2>Ganancias</h2>
            <p>¿Cansado de trabajar para beneficio de otros? pasa de ganar comisiones en centavos a ganar en soles por cada operación (S/ 1.00 a 5.00 soles)</p>
        </div>
        <div class="caja-rows">
            <img src="../IMG/img-icons/iconCInstante.png" alt="icono Comision Instante">
            <h2>Comisiones al Instante</h2>
            <p>No tiene que esperar a fin de mes para recibir los pagos de sus comisiones, ni metas que cumplir, genera ganancias desde la primera operación.</p>
        </div>
    </div>
    <div class="rows-beneficios">
        <div class="caja-rows">
            <img src="../IMG/img-icons/iconSIntegrado.png" alt="icono Sistema Integrado">
            <h2>Sistema Integrado</h2>
            <p>Con un solo proveedor puedes realizar +8’000 pagos de servicios, depositar a todos los bancos, cajas y financieras, retiros, giros, recargas y mucho más, todo en un solo sistema, sin exclusividad de servicio.</p>
        </div>
        <div class="caja-rows">
            <img src="../IMG/img-icons/iconHExtendidos.png" alt="icono Horario Extendido">
            <h2>Horarios Extendidos</h2>
            <p>No te restrinjas a los horarios de los bancos, Agente Express te permite realizar tus pagos a la hora que necesites (horarios de atención depende de cada establecimiento). </p>
        </div>
        <div class="caja-rows">
            <img src="../IMG/img-icons/iconPasarela.png" alt="icono Pasarela de Pagos">
            <h2>Pasarela de Pagos</h2>
            <p>Puedes aceptar pagos con tarjeta de crédito o débito por venta de tus productos, con la comisión mas baja del mercado 1.99% + IGV y lo más importante es que recibes el dinero de tus ventas al instante</p>
        </div>
    </div>
    <div class="rows-beneficios">

    </div>
</section>
<section class="container-requisitos">
    <h1 id="Requisitos" class="title-c-b">REQUISITOS</h1>
    <div class="container-caja-requisitos">
        <div class="container-title-c-r">
            <h1>Sé un Agente Express</h1>
            <h1>¡Impulsa tu negocio!</h1>
        </div>
        <div class="caja-requisitos">
            <ul>
                <li>
                <strong><p>REQUISITOS DEL TITULAR</p></strong>
                <ol>
                    <li>Foto del DNI vigente (ambos lados)</li>
                    <li>Correo electrónico</li>
                    <li>Nro. De Celular</li>
                    <li>Cuenta de Ahorros o Cuenta Corriente en Soles</li>
                    </ol>
                </li>
                <li>
                <strong><p>REQUISITOS DEL NEGOCIO</p></strong>
                    <ol>
                        <li>RUC Activo y Habido</li>
                        <li>Ficha RUC (Opcional)</li>
                        <li>Copia de recibo de servicios</li>
                        <li>Fotos del negocio</li>
                        <li>Ubicación del negocio</li>
                        <li>Vigencia de poder (si eres Persona Jurídica)</li>
                    </ol>
                </li>
                <li>
                <strong><p>CAPITAL DE TRABAJO</p></strong>
                    <ol>
                    <li>Contar con un capital adecuado de trabajo para realizar transacciones (Capital💰 de trabajo Recomendando S/ 2000.00)</li>
                </ol>
                </li>
                <li>
                    <strong><p>OTROS REQUISITOS</p></strong>
                    <ol>
                        <li>Contar con Internet (Mínimo 15MB📡)</li>
                        <li>Computadora💻 o laptop básica (Windows 10 en adelante)</li>
                    </ol>
                </li>
            </ul>
            
            
            
        </div>
        <div class="caja-requisitos-botones">
            <div class="inputSecondR">
                <input type="button" value="Contactanos" onclick="btncontactanos()" style="background-color: rgb(0,81,153);">
            </div>
            <div class="inputFirstR">
                <input type="button" value="¡Quiero Ser un Agente!" onclick="btnreqregister()" style="background-color: rgb(0,81,153)";>
            </div>
            <div class="inputSecondR">
                <input type="button" value="Ya soy Un Agente" style="background-color: rgb(0,81,153)"; onclick="btnreqlogin()" >
            </div>
        </div>
    </div>
</section>
<section class="container-ubicar-Agente">
    <h1 id="Ubicar-Agente" class="title-c-b">UBICA LOS AGENTES EXPRESS</h1>
    <div class="container-select">
        <div class="caja-select"> <label for="Pais">Pais:</label>
            <select name="" id="Pais">
                <option value="">Peru</option>
                <option value="">Bolivia</option>
            </select>
        </div>
        <div class="caja-select"><label for="">Departamento:</label>
            <select name="" id="">
                <option value="">Arequipa</option>
                <option value="">Lima</option>
            </select>
        </div>
        <div class="caja-select"><label for="">Provincia:</label>
            <select name="" id="">
                <option value="">Arequipa</option>
                <option value="">Islay</option>
            </select>
        </div>
        <div class="caja-select"><label for="">Distrito:</label>
            <select name="" id="">
                <option value="">Miraflores</option>
                <option value="">Mariano Melgar</option>
            </select>
        </div>
        <div class="caja-btn">
            <input type="button" value="Buscar">
        </div>
    </div>
    <div id="mapa" class="maps">

    </div>
</section>
<section class="container-material-Express">
    <h1 id="Material-Express" class="title-c-b">MATERIAL EXPRESS</h1>
    <div class="caja-material-express">
        <div class="cajas-materiales">
            <div id="baner1" class="caja-material">
                <p>Banner de Agente Express</p>
                <p>FORMATO 140x70</p>
            </div>
            <div id="baner2" class="caja-material">
                <p>Banner de Agente Express</p>
                <p>FORMATO 160x80</p>
            </div>
            <div id="baner3" class="caja-material">
                <p>Jala-Vistas Agente Express</p>
                <p>FORMATO 20x30</p>
            </div>
        </div>

        <div id="img-baner1" class="img-material">
            <img src="../IMG/banner.png" alt="">
            <h1>Banner ExPreSS 2024 FORMATO 140cmx70cm</h1>
        </div>
        <div id="img-baner2" class="img-material">
            <img src="../IMG/banner.png" alt="">
            <h1>Banner ExPreSS 2024 FORMATO 160cmx80cm</h1>
        </div>
        <div id="img-baner3" class="img-material">
            <img src="../IMG/jalavistas.png" alt="">
            <h1>Jala-Vistas ExPreSS 2024 FORMATO 20cmx30cm</h1>
        </div>
        <p>• Descargue nuestro material de alta calidad para mejorar su negocio. Ofrecemos plantillas de diseño y recursos de marketing fáciles de usar.</p>
    </div>
</section>
<section class="container-videos-Tuto">
    <h1 id="Videos-Tuto" class="title-c-b">VIDEO TUTORIALES</h1>
    <div class="caja-video-tuto">
        <div class="caja-video">
            <p>Depósitos</p>
            <iframe src="https://www.youtube.com/embed/HtfTG4EgXcY" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="caja-video">
            <p>Pago de Servicios</p>
            <iframe src="https://www.youtube.com/embed/FNpnKsWSQCo" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
</section>

<script src="../JS/agente-clic-caja.js"></script>
<?php require_once("../PageMaster/footer.php") ?>
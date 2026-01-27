<?php require_once("../PageMaster/header.php") ?>
<head>
    <link rel="stylesheet" href="/CSS/contactos.css">
    <script src="/JS/contactos.js"></script>
</head>

<section class="contenido-contacto">
    <div class="caja-contacto-contenido">
        <h1>Contacto</h1>
        <ul>
            <li>Comunicate a nuestro Call Center (054) 654209</li>
            <li>¡Nos encantaría escucharte!</li>
            <li>¿Tienes preguntas? ¡Estamos aquí para ayudarte!</li>
            <li>¿Necesitas ayuda? ¡Déjanos saber cómo podemos ayudarte!</li>
        </ul>

        <p>Por favor, completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.</p>
        <p>Tu privacidad es importante para nosotros. No compartiremos tu información personal con terceros</p>
        <div>
        <img class="img-c-c-c" src="../IMG/FondoContac01.jpeg" alt="">
        </div>
    </div>    
    <div class="contenedor-form">
    <form class="contac-form" action="../AD/formulario_contacto.php" method="post">
        <label for="">Nombres:</label>
        <input name="txtnombre" type="text" placeholder="Nombres" required>
        <label for="">Apellidos:</label>
        <input name="txtapellido" type="text" placeholder="Apellidos" required>
            <label for="">Numero de Teléfono:</label>
    <div class="caja-form-number">
        <select name="prefijo" id="">
            <option value="+51"><img src="../IMG/img-icons/peru.png" alt="">+51</option>
            <option value="+591"><img src="../IMG/img-icons/bolivia.png" alt="">+591</option>
        </select>
        <input name="txtnumero" type="number" placeholder="Numero" required>
    </div>
    
    <label for="">Correo:</label>
    <input name="txtcorreo" type="email"id="" placeholder="example@gmail.com" required>
    <label for="">Mensaje:</label>
    <textarea name="txtmensaje"  cols="30" rows="10" placeholder="Deja un mensaje aqui" required></textarea>
    <button type="submit">Enviar</button>
    </form>
</div>
</section>


<section class="contenido-ubicanos">
    <div class="caja-ubica">
        <h1>Ubícanos</h1>
        <div>
        <p class="p-separacion">Dirección.</p>
            <p class="p-separacion">Av. Lambramani, Urb. San Sebastian B-1, Arequipa, Arequipa - Perú</p>
            <p>Horario de atención.</p>
            <ul>
                <li>Lun - Vie : 9:00 - 19:00</li>
                <li>Sab : 9:00 - 13:00</li>
            </ul>
            <p>Numero de Contacto.</p>
            <ul>
                <li>(054) 654209</li>
            </ul>
            <p>Correo: <a href="">afiliaciones@agenteexpress.com</a></p>
        </div>
    </div>
    <div id="mapa-local" class="mapa-ubicacion"></div>
</section>
<section class="contenido-tcn">
    <div class="contenido-caja">
        <p>¡Únete a este gran equipo!</p>
        <p>En Agente Express buscamos crecer y contar siempre con el mejor equipo.</p>
        <div>
            <button type="button">bolsa de trabajo</button>
            <button type="button">Afiliados</button>
        </div>
    </div>
</section>
<?php require_once("../PageMaster/footer.php") ?>
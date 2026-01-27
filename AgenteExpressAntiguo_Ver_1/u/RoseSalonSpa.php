<?php
// Datos dinámicos
$profile = [
    "name" => "Rose Salón & Spa",
    "description" => "Rose Vilma Bustamante Soto",
    "links" => [
        ["icon" => "user-circle", "label" => "Rose Salón & Spa", "type" => "Business Card", "url" => "#"],
        ["icon" => "whatsapp", "label" => "WhatsApp", "type" => "+51 994716416", "url" => "https://wa.me/51994716416"],
        ["icon" => "instagram", "label" => "Instagram", "type" => "Rose_SalonSpa", "url" => "https://instagram.com/SalonySpaROSE"],
        ["icon" => "facebook", "label" => "Facebook", "type" => "Rose_SalonSpa", "url" => "https://www.facebook.com/SalonySpaROSE"],
        ["icon" => "tiktok", "label" => "TikTok", "type" => "@Rose_SalonSpa", "url" => "https://tiktok.com/@Rose_SalonSpa"],
        ["icon" => "YouTube", "label" => "YouTube", "type" => "@Rose_SalonSpa", "url" => "https://youtube.com/@Rose_SalonSpa"],
    ],
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $profile['name']; ?></title>
    <style>
        /* General Styles */
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background-color: #0033cc;
            color: white;
        }

        .container {
            max-width: 420px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        /* Header styles */
        .header {
            margin-top: 40px;
        }

        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            overflow: hidden;
        }

        .profile-image img {
            width: 100%;
        }

        h1 {
            margin: 10px 0 5px;
            font-size: 24px;
        }

        p.description {
            font-size: 14px;
            margin: 0 0 20px;
        }

        .btn {
            display: inline-block;
            background-color: white;
            color: #0033cc;
            font-size: 14px;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: bold;
            text-decoration: none;
            margin-top: 10px;
        }

        /* Links section */
        .links {
            margin-top: 20px;
            background-color: #fff; /* Fondo blanco */
            border-radius: 15px; /* Bordes redondeados */
            padding: 20px; /* Espaciado interno */
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Sombra opcional */
        }

        .link-card {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background-color: #fff;
            border-radius: 10px;
            padding: 15px;
            color: #0033cc;
            margin-bottom: 10px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */
            text-decoration: none; /* Sin subrayado */
            transition: box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .link-card:hover {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Más sombra al pasar el mouse */
            background-color: #f0f0f0; /* Fondo ligeramente más claro */
        }

        .link-card .icon {
            width: 40px;        /* Tamaño del círculo */
            height: 40px;
            background-color: #e5e5e5;  /* Fondo de color claro (opcional) */
            border-radius: 50%; /* Hace que el contenedor sea circular */
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden; /* Asegura que cualquier exceso de imagen quede recortado */
            margin-right: 15px; /* Agrega espacio entre la imagen y el texto */
        }
        
        .link-card .icon img {
            width: 100%;  /* Hace que la imagen ocupe el 100% del contenedor */
            height: 100%; /* Asegura que la imagen llene todo el espacio */
            object-fit: cover;  /* Hace que la imagen se recorte si es necesario */
            display: block; /* Elimina espacio debajo de la imagen */
}

        .link-card .text {
            text-align: left;
        }

        .link-card .text p {
            margin: 0;
            font-weight: bold;
        }

        .link-card .text small {
            color: gray;
            font-size: 12px;
        }

        .link-card a {
            text-decoration: none;
            font-size: 14px;
            color: #0033cc;
            font-weight: bold;
        }
        
        /* Modal Styles */
.modal {
    display: none; /* Oculto por defecto */
    position: fixed; 
    z-index: 1000; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%;
    overflow: auto; 
    background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
}

.modal-content {
    background-color: #fff;
    margin: 15% auto; 
    padding: 20px;
    border-radius: 15px;
    width: 80%; 
    max-width: 300px; 
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    color: #0033cc;
}

.modal-content h2 {
    font-size: 18px;
    margin-bottom: 5px;
    text-align: center;
}

.modal-content .subtitle {
    font-size: 12px;
    color: gray;
    margin-bottom: 15px;
}

.modal-content h3 {
    font-size: 22px;
    font-weight: bold;
}

.modal-content .type,
.modal-content .email {
    color: gray;
    font-size: 14px;
    margin: 5px 0;
}

.modal-content .icon {
    margin: 20px auto;
}

.modal-content .icon img {
    width: 80px;
    height: 80px;
}

.btn-save {
    background-color: #5e35b1;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 30px;
    cursor: pointer;
    margin-top: 20px;
}

.btn-save:hover {
    background-color: #45278f;
}

.close {
    color: gray;
    float: right;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
}

.footer {
    background-color: #0033cc; /* Fondo azul */
    text-align: center;
    padding: 20px 15px;
    color: white;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
}

.footer-buttons {
    margin-bottom: 10px;
}

.footer-buttons .btn {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 20px;
    margin: 0 10px;
    cursor: pointer;
    border: none;
}

.footer-buttons .btn-dark {
    background-color: #2b2d42; /* Color gris oscuro */
    color: white;
}

.footer-buttons .btn-dark:hover {
    background-color: #1d1e2c; /* Gris más oscuro al pasar el mouse */
}

.footer-buttons .btn-blue {
    background-color: #0033cc; /* Azul intenso */
    color: white;
}

.footer-buttons .btn-blue:hover {
    background-color: #0025a1; /* Azul más oscuro al pasar el mouse */
}

.footer-text {
    margin-top: 10px;
    color: white;
    font-weight: bold;
}

.footer-credits {
    margin-top: 20px;
    font-size: 12px;
}

.footer-credits a {
    color: #ffffff; /* Color del enlace */
    text-decoration: underline;
}

.footer-credits a:hover {
    color: #ddd; /* Color al pasar el mouse sobre el enlace */
}


        
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <div class="profile-image">
                <img src="/IMG/LogoSalon.png" alt="Imagen de perfil">
            </div>
            <h1><?php echo $profile['name']; ?></h1>
            <p class="description"><?php echo $profile['description']; ?></p>
            <a href="#" class="btn">Conoce más de mí</a>
        </div>

        <!-- Links Section -->
        <div class="links">
            <?php foreach ($profile['links'] as $link): ?>
            <a href="<?php echo $link['url']; ?>" target="_blank" class="link-card">
                <div class="icon">
                    <?php echo match ($link['icon']) {
                        "user-circle" => '<img src="/IMG/contacto.png" alt="User Circle" />', // Cambia por la ruta correcta
                        "whatsapp" => '<img src="/IMG/whatsapp.png" alt="WhatsApp" />',
                        "instagram" => '<img src="/IMG/instagram2.png" alt="Instagram" />',
                        "facebook" => '<img src="/IMG/facebook2.png" alt="Facebook" />',
                        "tiktok" => '<img src="/IMG/tiktok.png" alt="TikTok" />',
                        "YouTube" => '<img src="/IMG/YouTube.png" alt="YouTube" />',
                        default => '<img src="/IMG/whastapp.png" alt="Link" />',
                    }; ?>
                </div>
                <div class="text">
                    <p><?php echo $link['label']; ?></p>
                    <small><?php echo $link['type']; ?></small>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
    
    <!-- Modal -->
<div id="businessCardModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Agregar a mis contactos</h2>
        <p class="subtitle">Tarjeta Virtual</p>
        <h3>Rose Salón & Spa</h3>
        <p class="type">Rose Vilma Bustamante Soto</p>
        <p class="email">Rose@agenteexpress.com</p>
        <div class="icon">
            <img src="/IMG/LogoSalon.png" alt="Business Card Icon" />
        </div>
        <button class="btn-save" onclick="downloadVCF()">Guardar</button>
    </div>
</div>

<script>
    // Selecciona el modal y el enlace
    const modal = document.getElementById("businessCardModal");
    const link = document.querySelector(".link-card[href='#']");
    const closeModal = document.querySelector(".modal .close");

    // Abre el modal cuando se hace clic en el enlace
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Previene la navegación
        modal.style.display = "block";
    });

    // Cierra el modal al hacer clic en la "X"
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cierra el modal al hacer clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
</script>

<script>
    function downloadVCF() {
        window.location.href = "generate-vcf.php"; // Ruta al archivo PHP que genera el .vcf
    }
</script>

<div class="footer">
    <div class="footer-buttons">
        <button class="btn btn-dark">Comparte</button>
        <button class="btn btn-blue">Contactate</button>
    </div>
    <p class="footer-text">¿Uno no es suficiente?</p>
    <div class="footer-credits">
        <p>Desarrollado por <a href="#" target="_blank">Christian Diaz Torres</a></p>
        <p>© 2024 COntacto Express - Todos los derechos reservados</p>
    </div>
</div>

</body>
</html>




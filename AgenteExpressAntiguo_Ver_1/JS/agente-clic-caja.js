const div1 = document.getElementById('baner1');
const div2 = document.getElementById('baner2');
const div3 = document.getElementById('baner3');
const imagen1 = document.getElementById('img-baner1');
const imagen2 = document.getElementById('img-baner2');
const imagen3 = document.getElementById('img-baner3');

// Agregar eventos de click a los divs
div1.addEventListener('click', () => {
  imagen1.style.display = 'block';
  imagen2.style.display = 'none';
  imagen3.style.display = 'none';
});

div2.addEventListener('click', () => {
  imagen1.style.display = 'none';
  imagen2.style.display = 'block';
  imagen3.style.display = 'none';
});

div3.addEventListener('click', () => {
  imagen1.style.display = 'none';
  imagen2.style.display = 'none';
  imagen3.style.display = 'block';
});

function inicializarMapa() {
    // Coordenadas de las ubicaciones
    var ubicaciones = [
        { lat: -16.411385, lng: -71.522057, nombre: 'Lima, Perú' }
        
    ];

    // Inicializar el mapa centrado en una ubicación específica
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 15,
        center: { lat: -16.411385, lng: -71.522057 } // Centro de Arequipa
    });

    // Agregar marcadores para cada ubicación
    ubicaciones.forEach(function(ubicacion) {
        var marcador = new google.maps.Marker({
            position: { lat: ubicacion.lat, lng: ubicacion.lng },
            map: mapa,
            title: ubicacion.nombre
        });

        // Agregar ventana de información al hacer clic en el marcador
        var infoWindow = new google.maps.InfoWindow({
            content: ubicacion.nombre
        });

        marcador.addListener('click', function() {
            infoWindow.open(mapa, marcador);
        });
    });
}

function btncontactanos(){
    window.location.href = 'contactos.php'
}
function btnreqregister(){
    window.location.href = '../register.html'
}
function btnreqlogin(){
    window.location.href = '../login.html'
}
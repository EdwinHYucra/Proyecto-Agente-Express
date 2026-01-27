function inicializarMapa() {
    // Coordenadas de las ubicaciones
    var ubicaciones = [
        { lat: -16.411385, lng: -71.522057, nombre: 'Agente Express, Arequipa - Perú' }
        
    ];

    // Inicializar el mapa centrado en una ubicación específica
    var mapa = new google.maps.Map(document.getElementById('mapa-local'), {
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
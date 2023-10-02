document.addEventListener('DOMContentLoaded', function () {
    let markers = [];
    document.getElementById('actualizarMarcadores').addEventListener('click', actualizarMarcadores);

    function actualizarMarcadores() {
        // Lógica para eliminar los marcadores actuales
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      
        // Lógica para obtener los nuevos puntos desde ruta.Puntos y agregarlos como marcadores
        // Reemplaza esta lógica con tu propia forma de obtener los puntos y nombres de las rutas
      
        // Por ejemplo, supongamos que tienes una variable "rutaSeleccionada" que contiene la ruta seleccionada:
        const puntos = rutaSeleccionada.Puntos;
      
        // Agrega los nuevos marcadores
        for (let i = 0; i < puntos.length; i++) {
          const punto = puntos[i];
          const marker = new google.maps.Marker({
            position: { lat: punto.latitud, lng: punto.longitud },
            map: map,
            title: `Punto ${i + 1}`
          });
          markers.push(marker);
        }
      }
});
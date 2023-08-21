"use strict";

let map;
let markers = [];
let marcadores = [];

function initMap() {
    const initialLatLng = { lat: 11.019329071044922, lng: -74.84967803955078 };
    map = new google.maps.Map(document.getElementById("gmp-map"), {
        zoom: 14,
        center: initialLatLng,
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: false
    });

    // Agregar evento click al mapa
    map.addListener("click", (event) => {        
        marcadores.push([event.latLng.lat(),event.latLng.lng()]);        
        addMarker(event.latLng);
    });

    // Capturar automáticamente los marcadores al enviar el formulario
    document.getElementById("ruta-form").addEventListener("submit", capturarYEnviarMarcadores);
}

function addMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
    markers.push(marker);    
}

function capturarYEnviarMarcadores(event) {
    // Obtener los datos de los marcadores en formato JSON
    const marcadoresJson = JSON.stringify(marcadores);

    // Actualizar el campo oculto en el formulario
    document.getElementById("marcadores").value = marcadores;

    // El formulario se enviará automáticamente después de esta función
}
"use strict";

function initMap() {
  const myLatLng = {
    lat: 11.019329071044922,
    lng: -74.84967803955078
  };
  const map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: 14,
    center: myLatLng,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "My location"
  });

  // Guarda una referencia a los marcadores existentes
  const markers = [];

  // Definir una función para eliminar todos los marcadores
  function clearMarkers() {
    markers.forEach((marker) => {
      marker.setMap(null); // Elimina el marcador del mapa
    });
    markers.length = 0; // Borra el array de marcadores
  }

  // Definir una función para realizar el fetch y actualizar los marcadores
  function updateMarkers() {
    // Borra los marcadores existentes
    // clearMarkers();

    fetch("/online") // Cambia la URL a la que corresponda
      .then((response) => response.json())
      .then((data) => {
        // Suponiendo que la respuesta contiene un arreglo de objetos con latitud y longitud
        data.forEach((point) => {
          const pointLatLng = { lat: point.latitude, lng: point.longitude };
          const marker = new google.maps.Marker({
            position: pointLatLng,
            map,
            title: point.nombre
          });
          markers.push(marker); // Agrega el marcador a la lista de marcadores
        });
      })
      .catch((error) => {
        console.error("Error al obtener puntos:", error);
      });
  }

  // Llamar a updateMarkers inicialmente
  updateMarkers();

  // Definir una función para realizar el fetch y actualizar las posiciones de los marcadores existentes
  function updateMarkerPositions() {
    fetch("/online") // Cambia la URL a la que corresponda
      .then((response) => response.json())
      .then((data) => {
        // Suponiendo que la respuesta contiene un arreglo de objetos con latitud y longitud
        data.forEach((point, index) => {
          // Verifica si hay un marcador existente para este punto
          if (markers[index]) {
            const newLatLng = new google.maps.LatLng(point.latitude, point.longitude);
            markers[index].setPosition(newLatLng); // Actualiza la posición del marcador existente
          }
        });
      })
      .catch((error) => {
        console.error("Error al obtener puntos:", error);
      });
  }

  // Llamar a updateMarkerPositions inicialmente
  updateMarkerPositions();

  // Establecer un intervalo para ejecutar updateMarkerPositions cada X milisegundos (por ejemplo, cada 10 segundos)
  const interval = 1000; // 1 segundos
  setInterval(updateMarkerPositions, interval);
}
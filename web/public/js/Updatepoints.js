// updateMap.js

function updateMapWithMarkers(map) {
    const url = "/online"; // Cambia la URL a la que corresponda
  
    // Realizar una solicitud HTTP GET para obtener los datos de la URL
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Suponiendo que la respuesta contiene un arreglo de objetos con latitud y longitud
        data.forEach((point) => {
          const myLatLng = { lat: point.latitude, lng: point.longitude };
          new google.maps.Marker({
            position: myLatLng,
            map,
            title: point.nombre
          });
        });
      })
      .catch((error) => {
        console.error("Error al obtener puntos:", error);
      });
  }
  
  // Exporta la función para que esté disponible para su uso en otros archivos
  module.exports = { updateMapWithMarkers };
  
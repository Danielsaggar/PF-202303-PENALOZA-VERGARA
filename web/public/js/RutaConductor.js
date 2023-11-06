// Esta función hace una solicitud para obtener los datos actualizados

document.addEventListener('DOMContentLoaded', function () {
    async function fetchAndRenderData() {
    const placa = document.getElementById("placaId")    
    const placaId = placa.value    
    console.log("placa", placaId)
    try {
      const response = await fetch(`/conductor?placaId=${placaId}`); // Debes definir tu ruta de servidor adecuadamente
      if (response.ok) {
        const data = await response.json();
        // Actualiza la interfaz de usuario con los nuevos datos
        // Por ejemplo, puedes recorrer los datos y crear elementos HTML para mostrarlos
        // y luego anexarlos al div#right
        const rightDiv = document.getElementById('right');
        rightDiv.innerHTML = ''; // Limpia el contenido anterior
        data.forEach((ruta) => {
          const rutaElement = document.createElement('div');
          rutaElement.innerHTML = `
          <h1>Ruta: ${ruta.Ruta}</h1>
          ${ruta.Puntos.map((Puntos, index) => `
            <h2>Punto ${index + 1}: Lat: ${Puntos.latitud} Lon: ${Puntos.longitud} Check: ${Puntos.check ? 'Sí' : 'No'}
          `).join('')}
        `;
        rightDiv.appendChild(rutaElement);
         });
      } else {
        console.error('Error al obtener datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Llama a la función inicialmente y establece un intervalo para actualizaciones periódicas
  fetchAndRenderData();
  setInterval(fetchAndRenderData, 1000); // Actualiza cada 1 segundos (ajusta el intervalo según tus necesidades)
});
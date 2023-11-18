// Esta función hace una solicitud para obtener los datos actualizados
document.addEventListener('DOMContentLoaded', function () {
    async function fetchAndRenderData() {
    const placa = document.getElementById("placaId")    
    const placaId = placa.value        
    try {
      const response = await fetch(`/conductor?placaId=${placaId}`); // Debes definir tu ruta de servidor adecuadamente
      if (response.ok) {        
        const data = await response.json();   
        console.log("Data", data[0])     
        if(data[0].Rutas){
           // Actualiza la interfaz de usuario con los nuevos datos
          // Por ejemplo, puedes recorrer los datos y crear elementos HTML para mostrarlos
          // y luego anexarlos al div#right
          const rightDiv = document.getElementById('right');          
          rightDiv.innerHTML = ''; // Limpia el contenido anterior
                    
          data[0].Rutas.forEach((ruta) => {
            console.log("Ruta: ", ruta)
            const rutaElement = document.createElement('div');
            rutaElement.id = 'ruta';
            rutaElement.className = 'rutas';
            const puntosElement = document.createElement('div');
            puntosElement.id = 'puntos'; // Puedes asignar el ID que desees
            rutaElement.innerHTML = `
            <h1>Ruta: ${ruta.Ruta}</h1>       
            `;
            puntosElement.innerHTML = `
            ${ruta.Puntos.map((Puntos, index) => `
            <h2>Punto ${index + 1}: Lat: ${Puntos.latitud} Lon: ${Puntos.longitud} Check: ${Puntos.check ? 'Sí' : 'No'}
            `).join('')}    
            `;
            // Agregar el nuevo div como hijo de rutaElement
            rutaElement.appendChild(puntosElement);
            rightDiv.appendChild(rutaElement);
          });      
        }else{
          console.log("No hay ruta ")
        }       
      } else {
        console.error('Error al obtener datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }  
  // Llama a la función inicialmente y establece un intervalo para actualizaciones periódicas
  fetchAndRenderData();
  setInterval(fetchAndRenderData, 50000); // Actualiza cada 1 segundos (ajusta el intervalo según tus necesidades)
});

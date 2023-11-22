// Esta función hace una solicitud para obtener los datos actualizados
document.addEventListener('DOMContentLoaded', function () {
    async function fetchCheck() {
    const placa = document.getElementById("placaId")    
    const placaId = placa.value        
    try {
      const response = await fetch(`/conductor?placaId=${placaId}`); // Debes definir tu ruta de servidor adecuadamente
      if (response.ok) {        
        const data = await response.json();   
        console.log("Data", data[0])     
        if(data[0].Rutas){           
          /**Verificar los puntos y la cercanía a ellos**/
          data[0].Rutas.forEach((ruta) => {
            ruta.Puntos.forEach((punto) => {
              if (Tolerance(data[0].latitude, punto.latitud, 0.0005) && 
              Tolerance(data[0].longitude, punto.longitud, 0.0005) ){
                punto.check=true
                console.log("Verdadeo, Kpo")
              }
            });
          });    
          
          data[0].Rutas.forEach((ruta) => {
            let rutaTerminada = true; // Suponemos que la ruta está terminada hasta que se encuentre un punto con check en false
            ruta.Puntos.forEach((punto) => {
              if (!punto.check) {
                // Si encuentra un punto con check en false, marca la ruta como no terminada y sale del bucle
                rutaTerminada = false;
                return;
              }
            });
            // Asigna la propiedad terminado a la ruta según la condición
            ruta.terminado = rutaTerminada;
          });          
          
          // Realizar solicitud POST
          const postData = {
            // Datos que deseas enviar en el cuerpo del POST
            placaId: placaId,
            Rutas: data[0].Rutas,            
        };

        const postResponse = await fetch('/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ajusta según el tipo de contenido que estás enviando
            },
            body: JSON.stringify(postData),
        });

        if (postResponse.ok) {
          // Manejar la respuesta del POST
          const postResult = await postResponse.json();
          console.log('Respuesta del POST:', postResult);
        } else {
            console.error('Error en la solicitud POST:', postResponse.statusText);
        }
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
  fetchCheck();
  setInterval(fetchCheck, 2500); // Actualiza cada 1 segundos (ajusta el intervalo según tus necesidades)
});

function Tolerance(number1, number2, tolerance) {
  // Redondear ambos números a una cierta cantidad de decimales
  const roundedNumber1 = Number(number1.toFixed(7));
  const roundedNumber2 = Number(number2.toFixed(7));

  // Verificar si la diferencia entre los números es menor o igual a la tolerancia
  const difference = Math.abs(roundedNumber1 - roundedNumber2);

  return difference <= tolerance;
}
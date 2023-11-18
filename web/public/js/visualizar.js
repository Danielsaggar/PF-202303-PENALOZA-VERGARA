document.addEventListener('DOMContentLoaded', function () {
    async function verificar() {
        const rutaElements = document.querySelectorAll('.rutas');

        // Agrega un evento de clic al h1 para mostrar/ocultar los div dentro de #ruta
        rutaElements.forEach((rutaElement) => {            
            rutaElement.addEventListener('click', visualizar);
        });

        function visualizar() {
             // Accede al elemento específico que fue clickeado
            const clickedRutaElement = event.currentTarget;

            // Recorre todos los div dentro del elemento clickeado y alterna su visibilidad
            const divs = clickedRutaElement.querySelectorAll('div');
            divs.forEach((div) => {
                div.style.display = (div.style.display === 'none') ? 'block' : 'none';
            });
        }
    }
    // Llama a la función inicialmente y establece un intervalo para actualizaciones periódicas
    verificar();
    setInterval(verificar, 500); // Actualiza cada 1 segundos (ajusta el intervalo según tus necesidades)
});

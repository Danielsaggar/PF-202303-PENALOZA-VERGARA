function convert(X) {
    const paresLatLon = X.split(',');    
    // Crear un vector para almacenar los pares de latitud y longitud
    const vectorDePares = [];

    // Recorrer cada par de latitud y longitud y dividirlos por coma
    for (let i = 0; i < paresLatLon.length; i += 2) {
        const latitud = parseFloat(paresLatLon[i]);
        const longitud = parseFloat(paresLatLon[i + 1]);
        vectorDePares.push({ latitud, longitud });
    }    
    return(vectorDePares)    
}

module.exports = {
    convert
  }
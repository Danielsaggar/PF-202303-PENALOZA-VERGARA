// LocationWatcher.js

/* import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';


  const [location, setLocation] = useState(null);

  const startLocationUpdates = async () => {
    try {
      // Solicitar permisos para la ubicación en primer plano
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access foreground location was denied');
        return;
      }
      // Comenzar a escuchar cambios en la ubicación
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Actualizar cada 10 segundos
          distanceInterval: 10, // Actualizar cada 10 metros de cambio de distancia
        },
        location => {
          console.log('Nueva ubicación:', location);
          setLocation(location);
          // Aquí puedes llamar a la función writeUserData() o realizar cualquier otra acción con la nueva ubicación
        }
      );
      console.log('Escuchando cambios de ubicación en tiempo real');
    } catch (error) {
      console.error('Error al iniciar la escucha de cambios de ubicación:', error);
    }
  }; */

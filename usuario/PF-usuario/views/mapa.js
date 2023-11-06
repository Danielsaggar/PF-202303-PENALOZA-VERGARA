import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Button, Dimensions, AppState  } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useMapaLogic from "../Location/LocationComp";
import { getUserData, usuariosOnline } from "../firebase/Fire-realtime";
import { onChildChanged } from "firebase/database";

function MapScreen() {
  const { location } = useMapaLogic();    
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);  

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;   

  const handleCenterMapPress = () => {
    if (!location) return;
    mapRef.current.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922 / 10,
        longitudeDelta: 0.0421 / 10,
      },
      1000
    );
    console.log(markers)        
    console.log("Posición: ", location)
  };

  // Función para actualizar la posición de un marcador específico en el estado de markers
  const updateMarkerPosition = (Update) => {
    console.log("Id: ", Update.id)
    console.log(markers)  
    console.log("Markers: ", markers)
    // Encontrar el índice del marcador que se actualizará
    const markerIndex = markers.findIndex(marker => marker.id === Update.id);
    // Verificar si se encontró el marcador
    console.log("Markerindex: ", markerIndex)
    if (markerIndex !== -1) {
      console.log("Entre carajo")
      // Crear una copia del estado de markers utilizando la función de propagación de objetos
      const updatedMarkers = [...markers];
      // Actualizar la posición del marcador en la copia del estado
      updatedMarkers[markerIndex].location.latitude = Update.location.latitude;
      updatedMarkers[markerIndex].location.longitude = Update.location.longitude;
      // Actualizar el estado con la nueva copia del estado que contiene la posición actualizada del marcador
      setMarkers(updatedMarkers);
    }
    console.log("Función: ",Update)
  };

  function LookDatabase() {          
      onChildChanged(usuariosOnline, async (snapshot, previus) => {              
        const FirstMarkers = await getUserData();  
        setMarkers(FirstMarkers);  
      })
  };
  

  useEffect(async () => {        
    // Suscribirse a los cambios de estado de la aplicación
    AppState.addEventListener('change', handleAppStateChange);   

    const FirstMarkers = await getUserData();  
    setMarkers(FirstMarkers);
    LookDatabase();             
  }, []);  //Ejecutar solo una vefsaz al montar el compbgfcxvonentebnkmbnkmfdsgfsd 
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            : {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
        }
        zoomEnabled={true}
        showsZoomControls={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="Here I am"
            pinColor="blue"
          />
        )}

      {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.location.latitude,
              longitude: marker.location.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
              
      </MapView>
      <Button title="Center Map" onPress={handleCenterMapPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flexGrow: 1,
  },
});

export default MapScreen;
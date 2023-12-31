// Vista de la etiqueta
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as UpdateLocation from "expo-location";
import { getUserData, usuariosOnline, updateUserData, HistoricUser } from "../firebase/Fire-realtime";
import { onChildChanged } from "firebase/database";
import bottombg from "./../assets/fondo1.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import style from "../src/styles/Elements";
import BackGroundStyle from "./../src/styles/Background";


//Segundo plano
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

//Permisos 
import * as Permissions from 'expo-permissions';

const BACKGROUND_TASK_NAME = 'mi_tarea_en_segundo_plano';

// Definir la tarea en segundo plano
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    // Obtener la ubicación actual    
    const date = new Date();
    const location = await UpdateLocation.getCurrentPositionAsync(); 
    const Bdate = date.toLocaleDateString()+" "+date.toLocaleTimeString()
    // console.log('Ubicación en segundo plano:', location, "Fecha: ", Bdate);

    // Actualizar la base de datos de Firebase            
    updateUserData(location.coords.latitude, location.coords.longitude);    
    HistoricUser(location.coords.latitude, location.coords.longitude, location.coords.accuracy, Bdate)

    return null;
  } catch (error) {
    console.log('Error al ejecutar la tarea en segundo plano:', error);
    return null;
  }
});

// Registrar la tarea en segundo plano
BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
  minimumInterval: 0, // minutos
  stopOnTerminate: false,
  startOnBoot: true,
});

// Suscribirse a los cambios de ubicación
UpdateLocation.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
  accuracy: UpdateLocation.Accuracy.High,
  timeInterval: 2000, // milisegundos
  distanceInterval: 10, // metros
}); 

  // Función que se ejecuta cuando la aplicación cambia de estado
const handleAppStateChange = (nextAppState) => {
  if (nextAppState === 'background' || 'inactive' || 'unknown') {
    // La aplicación pasó a segundo plano
    // console.log('La aplicación pasó a segundo plano');
    UpdateLocation.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: UpdateLocation.Accuracy.Low,
      timeInterval: 5000, // milisegundos
      distanceInterval: 15, // metros
    }); 
    
    // Ejecutar conexión para actualizar la posición en la base de datos
    // ...
  }else{
    // console.log('La aplicación pasó a primer plano');
    // Suscribirse a los cambios de ubicación
    UpdateLocation.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
    accuracy: UpdateLocation.Accuracy.High,
    timeInterval: 2000, // milisegundos
    distanceInterval: 10, // metros
    }); 
  }
};

function TagViewScreen({ navigation }) {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);
        if (status === 'granted') {
          // console.log('Permiso concedido');
        } else {
          // console.log('Permiso denegado');
        }
  
        AppState.addEventListener('change', handleAppStateChange);
  
        const FirstMarkers = await getUserData();
        // setMarkers(FirstMarkers);
        // LookDatabase();
  
        await UpdateLocation.watchPositionAsync(
          {
            accuracy: UpdateLocation.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          location => {
            // console.log('Nueva ubicación:', location);
            updateUserData(location.coords.latitude, location.coords.longitude);
            HistoricUser(location.coords.latitude, location.coords.longitude, location.coords.accuracy, Bdate);
          }
        );
        // console.log('Escuchando cambios de ubicación en tiempo real');
      } catch (error) {
        console.error('Error en useEffect:', error);
      }
    };
  
    // Llama a fetchData inmediatamente
    fetchData();
  
    // Especificar las dependencias de useEffect si es necesario
  }, []);
  


const handleStoreData = async () => {
    navigation.navigate("Placa");    
  };

  return (
    <ImageBackground source={bottombg} style={BackGroundStyle.backGroundImg}>
      <SafeAreaView style={BackGroundStyle.safearea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Ruta Screen</Text>
            <Text>Aquí saldá la ruta asignada... creo</Text>            
            <TouchableOpacity style={style.button} onPress={handleStoreData}>
              <Text style={style.buttontext}>Regresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={handleStoreData}>
              <Text style={style.buttontext}>Panic button</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Importante siempre exportar como default
export default TagViewScreen;

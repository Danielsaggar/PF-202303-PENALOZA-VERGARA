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
  ActivityIndicator 
} from "react-native";
import * as Location from "expo-location";
import { writeUserData, readRutasData } from "./../firebase/Fire-realtime";
import bottombg from "./../assets/fondo1.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import style from "../src/styles/Elements";
import BackGroundStyle from "./../src/styles/Background";
import useMapaLogic from "../models/LocationComp";



function TagViewScreen({ navigation }) {
  const { location } = useMapaLogic();   
  
  //Variables de la base de datos
  const [Loc, setLoc] = useState("");
  const [Placa, setPlaca] = useState("");
  const [Conductor, setConductor] = useState("");
  const [datosFirestore, setDatosFirestore] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null); // Declarar selectedValue

  //Función para obtener posición actual
  // async function getLocationAsync() {
  //   // Primero, solicita permiso para acceder a la ubicación del usuario
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     console.log("Permiso para acceder a la ubicación denegado");
  //     return;
  //   }
  //   // Si se concede el permiso, obtén la ubicación actual del usuario
  //   let location = await Location.getCurrentPositionAsync({});
  //   return location;
  // }

  const handleStoreData = async () => {
    setLoc(location);    
    if (true) {
      // El usuario está autenticado, obtiene su UID           
      await writeUserData(Loc.coords.latitude, Loc.coords.longitude, Placa, Conductor);
      rutas = await readRutasData(Conductor);
      // console.log("Soy las rutas: ", rutas)
      setPlaca("");      
      setConductor("");            
      navigation.navigate("Seleccion", rutas);
    } else {
      // No hay usuario autenticado
      console.log("No hay usuario autenticado.");
    }
  };

  useEffect(() => {
    // Declarar la función asíncrona dentro de useEffect
    const fetchData = async () => {
      try {
        // Puedes poner tu lógica asíncrona aquí        
        setLoc(location);
      } catch (error) {
        // Manejar errores si es necesario
        console.error('Error en useEffect:', error);
      }
    };
  
    // Llamar a la función asíncrona inmediatamente
    fetchData();
  
    // Especificar las dependencias de useEffect si es necesario
  }, []); // O [] si el efecto no depende de props o estado
  

  return (
    <ImageBackground source={bottombg} style={BackGroundStyle.backGroundImg}>
      <SafeAreaView style={BackGroundStyle.safearea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={style.tittle}>BIENVENIDO</Text>
            <Text style={style.subtittle}>Ingresa tu placa:</Text>
            <View style={style.inputContainer} ><TextInput style={style.input} value={Placa} onChangeText={setPlaca} /></View>
            <Text style={style.subtittle}>Ingresa tu nombre:</Text>
            <View style={style.inputContainer} ><TextInput value={Conductor} onChangeText={setConductor} /></View>
            
            <TouchableOpacity style={style.buttonb} onPress={handleStoreData}>
              <Text style={style.buttontext}>Seguir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Importante siempre exportar como default
export default TagViewScreen;

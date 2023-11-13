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



function TagViewScreen({ navigation }) {
  
  //Variables de la base de datos
  const [Loc, setLoc] = useState("");
  const [Placa, setPlaca] = useState("");
  const [Conductor, setConductor] = useState("");
  const [datosFirestore, setDatosFirestore] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null); // Declarar selectedValue

  //Función para obtener posición actual
  async function getLocationAsync() {
    // Primero, solicita permiso para acceder a la ubicación del usuario
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permiso para acceder a la ubicación denegado");
      return;
    }
    // Si se concede el permiso, obtén la ubicación actual del usuario
    let location = await Location.getCurrentPositionAsync({});
    return location;
  }

  const handleStoreData = async () => {
    setLoc(await getLocationAsync());    
    if (true) {
      // El usuario está autenticado, obtiene su UID           
      await writeUserData(Loc.coords.latitude, Loc.coords.longitude, Placa, Conductor);
      rutas = await readRutasData(Conductor);
      console.log("Soy las rutas: ", rutas)
      setPlaca("");      
      setConductor("");            
      navigation.navigate("Seleccion", rutas);
    } else {
      // No hay usuario autenticado
      console.log("No hay usuario autenticado.");
    }
  };

  useEffect(async () => {
    setLoc(await getLocationAsync());    
  }, []); //Ejecutar solo una vez al montar el componente

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

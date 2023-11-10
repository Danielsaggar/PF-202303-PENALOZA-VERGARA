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
import { writeUserData } from "./../firebase/Fire-realtime";
import bottombg from "./../assets/fondo1.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import style from "../src/styles/Elements";
import BackGroundStyle from "./../src/styles/Background";
import { useRoute } from '@react-navigation/native';



function SeleccionScreen({ navigation }) {
    const route = useRoute();
    const parametros = route.params;
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
      navigation.navigate("Ruta"); 
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
            <Text>Escoge tu ruta CV</Text>                                    
            {Object.keys(parametros).map((item, index) => (
            <TouchableOpacity style={style.button} onPress={handleStoreData}>
              <Text style={style.buttontext}>{parametros[index]}</Text>
            </TouchableOpacity>
             ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Importante siempre exportar como default
export default SeleccionScreen;
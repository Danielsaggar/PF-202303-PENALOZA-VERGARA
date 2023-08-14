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
import * as Location from "expo-location";
// import { writeUserData } from "./../firebaseconnect/Fire-realtime";
import bottombg from "./../assets/flork.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import style from "../src/styles/Elements";
import BackGroundStyle from "./../src/styles/Background";

function TagViewScreen({ navigation }) {
  //Variables de la base de datos
  const [Loc, setLoc] = useState("");
  const [Tag, setTag] = useState("");

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
    console.log("Lat:",Loc.coords.latitude, "Lon: ",Loc.coords.longitude) 
    navigation.navigate("Ruta");    
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
            <Text>First Screen</Text>
            <Text>Tag:</Text>
            <TextInput value={Tag} onChangeText={setTag} />
            <TouchableOpacity style={style.button} onPress={handleStoreData}>
              <Text style={style.buttontext}>Comenzar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Importante siempre exportar como default
export default TagViewScreen;

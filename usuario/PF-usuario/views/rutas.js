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
import bottombg from "./../assets/fondo.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import style from "../src/styles/Elements";
import BackGroundStyle from "./../src/styles/Background";

function TagViewScreen({ navigation }) {
  //Variables de la base de datos
  const [Loc, setLoc] = useState("");
  const [Tag, setTag] = useState("");

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
            <Text>Soy la ruta:</Text>
            <TextInput value={Tag} onChangeText={setTag} />
            <TouchableOpacity style={style.button} onPress={handleStoreData}>
              <Text style={style.buttontext}>Regresar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Importante siempre exportar como default
export default TagViewScreen;

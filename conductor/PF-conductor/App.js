import "react-native-gesture-handler";
import React from "react";

//Importaciones para navegación
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

//Importaciones de vistas
import placa from "./views/placa"
import ruta from "./views/rutas"

//Conexión a Firebase
// import "./apiconfig/firebase-config";

//permisos
// import "./permisos/ExternalStorage";


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header:()=> null}}>
        <Stack.Screen name="Placa" component={placa} />
        <Stack.Screen name="Ruta" component={ruta} />
      </Stack.Navigator>          
    </NavigationContainer>
  );
}

export default App;

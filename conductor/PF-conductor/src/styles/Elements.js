import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../constans/color";

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: 'black', 
    borderBottomWidth: 1.5,
    width: 300,
    alignContent: "center",
    justifyContent: "center",
    flex:1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height:40,
  },

  logoImage: {
    height: 200,
    width: 200,
    marginTop: 100,
    marginLeft: 30,
    marginBottom: 20,
  },

  input: { color: colors.Letters ,
  
  },

  button: {
    backgroundColor: colors.buttom,
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 40,
  },
  buttonb: {
    backgroundColor: colors.buttom,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 20,
  },

  buttontext: {
    fontSize: 20,
    color: colors.whiteletters,
    
  },
  tittle: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 40,
    color: colors.Letters,        
    },
  subtittle: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20,
    color: colors.Letters,
    
    alignContent: "center"
    
  },
});

export default style;

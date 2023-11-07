import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../constans/color";

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },

  logoImage: {
    height: 200,
    width: 200,
    marginTop: 100,
    marginLeft: 30,
    marginBottom: 20,
  },

  input: { color: colors.redinput },

  button: {
    backgroundColor: colors.buttom,
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 50,
  },
  buttonb: {
    backgroundColor: colors.redButtom,
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 100,
  },

  buttontext: {
    fontSize: 17,
    color: colors.whiteletters,
  },
  tittle: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 50,
    color: colors.redLetters,
  },
});

export default style;

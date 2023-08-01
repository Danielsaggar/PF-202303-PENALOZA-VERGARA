import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "./../constans/color";

const BackGroundStyle = StyleSheet.create({
  backGroundImg: {
    height: null,
    resizeMode: "cover",
    overflow: "hidden",
    flex: 1,
  },

  safearea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default BackGroundStyle;

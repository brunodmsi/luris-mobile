import { StyleSheet, Dimensions } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  marker: {
    height: 2,
    width: 2
  },

  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },

  addBtn: {
    marginBottom: metrics.baseMargin * 2,
    marginRight: metrics.baseMargin * 2
  },

  addBtnContainer: {
    position: "absolute",
    bottom: 0,
    right: 0
    // marginBottom: metrics.baseMargin * 2,
    // marginRight: metrics.baseMargin * 3
  }
});

export default styles;

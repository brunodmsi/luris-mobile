import { StyleSheet, Dimensions } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  marker: {
    height: 4,
    width: 4
  },

  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },

  addBtn: {
    flex: 1
  },

  addBtnContainer: {
    position: "absolute",
    bottom: 0,
    right: 0
  },

  cancelBtnContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    right: 0
  },

  modalBtn: {},

  modalWrapper: {
    height: 150,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8
  },

  modalContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },

  modalText: {
    fontSize: 24
  }
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#0f0f1a",
  },
  background: {
    resizeMode: "contain",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
  },
  info: {
    marginTop: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    color: "#00BFFF",
    fontSize: 18,
    marginTop: 4,
  },
  empresa: {
    color: "#ffffffff",
    fontSize: 18,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: "center",
  },
});

export default styles;

import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (


    <ImageBackground
      source={require("@/assets/images/wallpaper_home_page.png")}
      style={styles.background}
    >
      {/* LETREIRO NUVIX */}
      <View style={styles.container}>
        <Text style={styles.title}>
          Nuvix
          <Text style={{ color: "#019EC2", fontSize: 50 }}>.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Desbloqueie novas aventuras, conquiste
        </Text>
        <Text style={styles.subtitle}>
          mundos e aproveite a liberdade de jogar sem limites.
        </Text>
      </View>

      {/* BOTÃO CADASTRAR */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("./cadastrar")}>
          <Text style={styles.buttonText}>Cadastrar</Text>
          <View style={styles.iconCircle}>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login")}>
      <Text style={styles.loginText}>
        Já tem uma conta? <Text style={styles.loginLink}>Log in.</Text>
      </Text>
    </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    position: "absolute",
    bottom: 215,
    right: -27,
    padding: 9,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingVertical: 10,  
    paddingHorizontal: 20,
    borderRadius: 40,
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 180,
    
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#019EC2",
    justifyContent: "center",
    alignItems: "center",
  }, 
  loginText: {
    fontSize: 15,
    color: "#fff",
  },
  loginLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#019EC2",
    
  },
});
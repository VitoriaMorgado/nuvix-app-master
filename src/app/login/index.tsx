import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  // Carregar email salvo ao abrir
  useEffect(() => {
    const carregarEmail = async () => {
      try {
        const emailSalvo = await AsyncStorage.getItem("email");
        if (emailSalvo) {
          setEmail(emailSalvo);
          setLembrar(true);
        }
      } catch (error) {
        console.log("Erro ao carregar email:", error);
      }
    };
    carregarEmail();
  }, []);

  const handleLogin = async () => {
    if (email === "usuario@usuario.com" && senha === "1234") {
      if (lembrar) {
        await AsyncStorage.setItem("email", email); // SALVA O EMAIL
      } else {
        await AsyncStorage.removeItem("email"); //REMOVE O EMAIL DO LEMBRAR
      }

      // ação ao logar (vai para home)
      router.push("./(tabs)/home");
    } else {
      Alert.alert("Erro", "Email ou senha incorretos!");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper_login.png")}
      style={styles.background}
    >
      {/* Letras */}
      <View style={styles.container}>
        <Text style={styles.title}>
          Nuvix
          <Text style={{ color: "#019EC2", fontSize: 60 }}>.</Text>
        </Text>
      </View>

      {/* Inputs*/}
      <View style={styles.form}>
        <Text style={styles.subscribe}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email@Email.com"
          placeholderTextColor="#ffffff59"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.subscribe2}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#ffffff59"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* Caixinha de lembrar */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setLembrar(!lembrar)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, lembrar && styles.checked]}>
            {lembrar && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>Lembrar-me</Text>
        </TouchableOpacity>

        {/* esquecer senha */}
        <TouchableOpacity onPress={() => router.push("/recuperar-senha")}>
          <Text style={styles.esqsenha}>Esqueci a Senha</Text>
        </TouchableOpacity>

        {/* BOTÃO ENTRAR */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{ borderRadius: 40, overflow: "hidden", marginTop: 10 }}
        >
          <LinearGradient
            colors={["#019EC2", "#45DCFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Iniciar Sessão</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.linha} />

        {/* TEXTO CADASTRO */}
        <TouchableOpacity onPress={() => router.push("./cadastrar")}>
          <Text style={styles.registerText}>
            Não tem uma conta?{" "}
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </Text>
          <Text style={styles.googleform}>Entrar de outra forma</Text>
        </TouchableOpacity>
      </View>

      {/* BOTOES SOCIAIS */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: "#019EC2" }]}
          onPress={() => Alert.alert("Login com Google")}
        >
          <FontAwesome name="google" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: "#019EC2" }]}
          onPress={() => Alert.alert("Login com Facebook")}
        >
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
  container: {
    position: "absolute",
    top: 320,
    alignSelf: "center",
    marginRight: 160,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subscribe: {
    fontSize: 15,
    marginTop: 100,
    marginLeft: 15,
    marginBottom: -14,
    color: "#019EC2",
  },
  subscribe2: {
    marginTop: -5,
    fontSize: 15,
    marginLeft: 15,
    marginBottom: -14,
    color: "#019EC2",
  },
  linha: {
    marginTop: 9,
    height: 0.7,
    width: 330,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 1,
  },
  esqsenha: {
    fontSize: 13,
    marginLeft: 230,
    marginTop: -29,
    color: "#ffffff91",
    textDecorationLine: "underline",
  },
  form: {
    marginHorizontal: 30,
    marginTop: 290,
    gap: 15,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 40,
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: -10,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  registerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#019EC2",
  },
  googleform: {
    marginTop: 2,
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "#043b47ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 8,
    marginBottom: -30,
  },
  checked: {
    backgroundColor: "#019EC2",
    borderColor: "#019EC2",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#1cd5ffff",
    marginLeft: -3,
    marginTop: 8,
    marginBottom: -30,
    textDecorationLine: "underline",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
    marginBottom: 3,
  },
  socialIconButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

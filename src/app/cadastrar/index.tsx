import React, { useEffect, useState } from "react";
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
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Input from "@/src/components/input";
import { makeCadastro } from "../../models/services/cadastro/post";

export default async function Cadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCadastro = async () => {
    if (!email || !senha || !nome || !confSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (senha !== confSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }
    setIsLoading(true);

    try {
      const data = await makeCadastro({ name: nome, email, password: senha });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.push("./login");
    } catch (error: any) {
      console.log("Erro no cadastro => ", error);
      const errorMessage =
        error?.response?.data?.message || // Caso use Axios
        error?.message || // Caso seja um erro simples
        "Erro ao cadastrar. Verifique os dados e tente novamente."; // Fallback

      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }

    useEffect(() => {
      if (!confSenha) return; // se o campo estiver vazio, não faz nada

      const timer = setTimeout(() => {
        if (senha !== confSenha) {
          Alert.alert("Erro", "As senhas não coincidem");
        }
      }, 1000); //esperar até que o usuário termine de digitar

      return () => clearTimeout(timer);
    }, [senha, confSenha]); // só roda quando password OU confirmPassword mudarem
  };

  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper_cadastro.png")}
      style={styles.background}
    >
      {/* Título */}
      <View style={styles.container}>
        <Text style={styles.title}>
          Criar Conta
          <Text style={{ color: "#019EC2", fontSize: 50 }}>.</Text>
        </Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <Input
          style={styles.input}
          placeholder="Seu Nome"
          placeholderTextColor="#ffffff59"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <Text style={styles.label}>Email</Text>
        <Input
          style={styles.input}
          placeholder="email@email.com"
          placeholderTextColor="#ffffff59"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <Input
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#ffffff59"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <Input
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#ffffff59"
          secureTextEntry
          value={confSenha}
          onChangeText={setConfSenha}
        />

        {/* BOTÃO CADASTRAR */}
        <TouchableOpacity
          onPress={handleCadastro}
          disabled={isLoading}
          style={{ borderRadius: 40, overflow: "hidden", marginTop: 10 }}
        >
          <LinearGradient
            colors={["#019EC2", "#45DCFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Carregando..." : "Criar Conta"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.linha} />

        {/* TEXTO VOLTAR AO LOGIN */}
        <Text style={styles.registerText}>
          Já tem uma conta?{" "}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.registerLink}>Entrar</Text>
          </TouchableOpacity>
        </Text>

        <Text style={styles.googleform}>Cadastrar de outra forma</Text>
      </View>

      {/* BOTÕES SOCIAIS */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: "#019EC2" }]}
        >
          <FontAwesome name="google" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialIconButton, { backgroundColor: "#019EC2" }]}
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
    top: 230,
    alignSelf: "center",
  },
  title: {
    fontSize: 39,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 100,
  },
  form: {
    marginHorizontal: 30,
    marginTop: 300,
    gap: 15,
  },
  label: {
    fontSize: 15,
    marginLeft: 15,
    marginBottom: -5,
    color: "#019EC2",
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
    marginTop: -12,
    marginBottom: 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
  registerText: {
    fontSize: 15,
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
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 4,
  },
  socialIconButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

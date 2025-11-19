import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Usuario() {
  // -----------------------------
  // PARTE DE ESTRUTURAR COM O BACKEND , BOA SORTE V
  // -----------------------------

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const router = useRouter();

  // -----------------------------
  // CARREGAMENTO DE DADOS LOCAIS
  // -----------------------------
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const emailSalvo = await AsyncStorage.getItem("email");

        // FAZ UMA SIMULAÇÃO DE BACKEND AQUI

        if (emailSalvo) {
          setEmail(emailSalvo);
          setUsername(emailSalvo.split("@")[0]);
          // setUserPhoto(dados.fotoPerfil);
        }
      } catch (error) {
        console.log("Erro ao carregar dados do usuário:", error);
      }
    };

    carregarUsuario();
  }, []);

  // -----------------------------
  // FUNÇAO DE DESLOGAR DO FIM DA PAGINA
  // -----------------------------
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("email");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      Alert.alert("Erro", "Não foi possível sair no momento.");
    }
  };

  // -----------------------------
  // LISTA DE ROTAS DO SUPORTE
  // -----------------------------
  const suporte = [
    { label: "Central de Denúncias e Violação", route: "/suporte" },
    { label: "Gerenciamento de Conta", route: "/conta" },
    { label: "Central de Ajuda", route: "/suporte" },
    { label: "Política de Privacidade", route: "/politica" },
    { label: "Sair" },
  ];

  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper-base.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        {/* Cabeçalho do usuário */}
        <View style={styles.header}>
          <Image
            source={{
              uri:
                userPhoto ||
                "https://i.pinimg.com/736x/36/65/62/3665625c333d601c5130563610333bb1.jpg",
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Seção: Minha Carteira */}
        <Text style={styles.sectionTitle}>
          MINHA CARTEIRA<Text style={styles.dot}>.</Text>
        </Text>

        <View style={styles.walletContainer}>
          <View style={styles.walletRow}>
            {/* NuvixPay */}
            <TouchableOpacity
              style={styles.walletItem}
              onPress={() => router.push("/")}
              activeOpacity={0.8}
            >
              <SimpleLineIcons name="wallet" size={24} color="white" />
              <Text style={styles.texticons}>NuvixPay</Text>
              <TouchableOpacity
                style={styles.bordaNuvixPay}
                onPress={() => router.push("/")}
                activeOpacity={0.8}
              >
                <Text style={styles.bordaNuvixPayText}>Ativar</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Vale Presente */}
            <TouchableOpacity
              style={styles.walletItem}
              onPress={() => router.push("/")}
              activeOpacity={0.8}
            >
              <Ionicons name="gift-outline" size={22} color="#fff" />
              <Text style={styles.texticons}>Vale Presente</Text>
              <Text style={styles.bordaLinkText}>Resgatar</Text>
            </TouchableOpacity>

            {/* Avaliações */}
            <TouchableOpacity
              style={styles.walletItem}
              onPress={() => router.push("/")}
              activeOpacity={0.8}
            >
              <Ionicons name="star-outline" size={22} color="#fff" />
              <Text style={styles.texticons}>Avaliações</Text>
              <Text style={styles.bordaLinkText}>Minhas Avaliações</Text>
            </TouchableOpacity>

            {/* Cupons */}
            <TouchableOpacity
              style={styles.walletItem}
              onPress={() => router.push("/")}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="ticket-percent"
                size={24}
                color="white"
              />
              <Text style={styles.texticons}>Cupons</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção: Atividades da Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ATIVIDADES DA CONTA<Text style={styles.dot}>.</Text>
          </Text>

          {/* Comprar Novamente */}
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/")}
            >
              <View style={styles.iconTextRow}>
                <Ionicons name="bag-handle-sharp" size={24} color="#fff" />
                <Text style={styles.gridText}>Comprar Novamente</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#aaa"
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>

            {/* Favoritos */}
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/")}
            >
              <View style={styles.iconTextRow}>
                <Ionicons name="heart-outline" size={23} color="#fff" />
                <Text style={styles.gridText}>Meus Favoritos</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#aaa"
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Pagamento */}
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/")}
            >
              <View style={styles.iconTextRow}>
                <Ionicons name="card-outline" size={22} color="#fff" />
                <Text style={styles.gridText}>Meus Pagamentos</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#aaa"
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>

            {/* Histórico de Compras */}
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/")}
            >
              <View style={styles.iconTextRow}>
                <MaterialCommunityIcons name="history" size={22} color="#fff" />
                <Text style={styles.gridText}>Histórico de Compras</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#aaa"
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção: Suporte da Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            SUPORTE DA CONTA<Text style={styles.dot}>.</Text>
          </Text>

          {suporte.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.supportItem}
              onPress={() => {
                if (item.label === "Sair") {
                  handleLogout();
                } else if (item.route) {
                  router.push(item.route as any);
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.supportText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#aaa" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// -----------------------------
// ESTILOS
// -----------------------------
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  // Header do usuário
  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    marginTop: 20,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#019EC2",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },

  // Seções gerais
  section: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#051E32",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  sectionTitle2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 15,
    textTransform: "uppercase",
  },
  dot: {
    color: "#019EC2",
    fontSize: 30,
  },

  //Setas
  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "103%",
  },

  gridText: {
    color: "#fff",
    fontSize: 11,
    flex: 1,
    marginLeft: 8,
  },

  arrowIcon: {
    marginLeft: "auto",
  },

  // Carteira
  walletContainer: {
    backgroundColor: "#051E32",
    marginVertical: 2,
  },
  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  walletItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  texticons: {
    color: "#ffffffb6",
    marginTop: 2,
    fontSize: 12,
  },
  bordaNuvixPay: {
    borderWidth: 1.5,
    borderColor: "#019EC2",
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginTop: 2,
  },
  bordaNuvixPayText: {
    color: "#019EC2",
    fontSize: 10,
    fontWeight: "bold",
  },
  bordaLinkText: {
    color: "#019EC2",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 1,
    textDecorationLine: "underline",
  },

  // Atividades
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  gridItem: {
    backgroundColor: "#000000c2",
    flex: 1,
    margin: 4,
    borderRadius: 8,
    padding: 10,
    alignItems: "flex-start",
    marginBottom: 10,
  },

  // Suporte
  supportItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000000c2",
    padding: 9,
    borderRadius: 8,
    marginVertical: 2,
  },
  supportText: {
    color: "#fff",
    fontSize: 13,
  },
});

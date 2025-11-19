import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  language: string;
  notifications: boolean;
  privacy: string;
  cards: string[];
  purchaseHistory: string[];
  activePlans: string[];
}

export default function Conta() {
  const router = useRouter();
  const [userData] = useState<UserData>({
    fullName: "João da Silva",
    email: "joao@example.com",
    phone: "+55 11 99999-9999",
    birthDate: "01/01/1990",
    language: "Português",
    notifications: true,
    privacy: "Todos",
    cards: ["Visa **** 1234", "Mastercard **** 5678"],
    purchaseHistory: ["Compra 1", "Compra 2"],
    activePlans: ["Plano Premium"],
  });

  type SectionItem = {
    label: string;
    value?: string;
  };

const sections: { title: string; items: SectionItem[] }[] = [
    {
        title: "Dados Pessoais",
        items: [
            { label: "Nome completo", value: userData.fullName },
            { label: "Email", value: userData.email },
            { label: "Número de telefone", value: userData.phone },
            { label: "Data de nascimento", value: userData.birthDate },
        ],
    },
    {
        title: "Segurança",
        items: [
            { label: "Alterar senha", value: undefined },
            { label: "Configurações de autenticação", value: undefined },
            { label: "Perguntas de segurança", value: undefined },
        ],
    },
    {
        title: "Preferências",
        items: [
            { label: "Idioma", value: userData.language },
            { label: "Notificações", value: userData.notifications ? "Ativas" : "Desativadas" },
            { label: "Privacidade", value: userData.privacy },
        ],
    },
    {
        title: "Assinaturas e Pagamentos",
        items: [
            { label: "Cartões cadastrados", value: userData.cards.join(", ") },
            { label: "Histórico de compras", value: userData.purchaseHistory.join(", ") },
            { label: "Planos ativos", value: userData.activePlans.join(", ") },
        ],
    },
    {
        title: "Opções de Gerenciamento",
        items: [
            { label: "Editar perfil", value: undefined },
            { label: "Desativar ou excluir conta", value: undefined },
            { label: "Conectar ou desconectar de redes sociais", value: undefined },
        ],
    },
];

// Adicione navegação nas opções que alteram a página
const handleSectionItemPress = (label: string) => {
    switch (label) {
        case "Alterar senha":
            router.push("/conta/alterar-senha" as any);
            break;
        case "Configurações de autenticação":
            router.push("/conta/autenticacao" as any);
            break;
        case "Perguntas de segurança":
            router.push("/conta/perguntas-seguranca" as any);
            break;
        case "Editar perfil":
            router.push("/conta/editar-perfil" as any);
            break;
        case "Desativar ou excluir conta":
            router.push("/conta/desativar-excluir" as any);
            break;
        case "Conectar ou desconectar de redes sociais":
            router.push("/conta/redes-sociais" as any);
            break;
        default:
            break;
    }
};

  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper-base.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <MaterialIcons name="person" size={30} color="white" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Informação de Conta</Text>
              <Text style={styles.subtitle}>
                Visualize e gerencie seus dados pessoais e preferências.
              </Text>
            </View>
          </View>
        </View>

        {/* Seções */}
        {sections.map((section, sIdx) => (
          <View key={sIdx} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {section.title}
              <Text style={styles.dot}>.</Text>
            </Text>
            {section.items.map((item, iIdx) => (
              <View key={iIdx} style={styles.option}>
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{item.label}</Text>
                  {item.value && <Text style={styles.description}>{item.value}</Text>}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  // Cabeçalho
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 65,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
    padding: 6,
    backgroundColor: "#019EC2",
    borderRadius: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTextContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#9EB3C2",
    fontSize: 11.5,
    marginTop: 1,
  },
  // Seções
  section: {
    backgroundColor: "#051E32",
    borderRadius: 5,
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  dot: {
    color: "#019EC2",
    fontSize: 22,
  },
  option: {
    backgroundColor: "#000000c2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: "#fff",
    fontSize: 14.5,
  },
  description: {
    color: "#9eb3c2bd",
    fontSize: 12,
    marginTop: 2,
  },
});

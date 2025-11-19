import React from "react";
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

export default function PoliticaPrivacidade() {
  const router = useRouter();

  const sections = [
    {
      title: "Coleta de Dados",
      content:
        "Coletamos informações pessoais como nome, e-mail, telefone e histórico de compras para fornecer nossos serviços e melhorar sua experiência.",
    },
    {
      title: "Uso das Informações",
      content:
        "As informações coletadas são utilizadas para gerenciar sua conta, processar pagamentos, enviar notificações relevantes e personalizar seu conteúdo.",
    },
    {
      title: "Compartilhamento de Dados",
      content:
        "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para cumprir a lei, proteger direitos ou oferecer serviços contratados por você.",
    },
    {
      title: "Segurança",
      content:
        "Adotamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.",
    },
    {
      title: "Direitos do Usuário",
      content:
        "Você pode acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Também é possível ajustar suas preferências de privacidade nas configurações da conta.",
    },
    {
      title: "Atualizações da Política",
      content:
        "Esta política pode ser atualizada periodicamente. Notificaremos os usuários sobre alterações significativas e recomendamos a revisão regular.",
    },
  ];

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
            <MaterialIcons name="privacy-tip" size={30} color="white" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Política de Privacidade</Text>
              <Text style={styles.subtitle}>
                Entenda como coletamos, usamos e protegemos suas informações.
              </Text>
            </View>
          </View>
        </View>

        {/* Seções */}
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {section.title}
              <Text style={styles.dot}>.</Text>
            </Text>
            <Text style={styles.description}>{section.content}</Text>
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
    backgroundColor: "#000000c0",
    borderRadius: 5,
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  dot: {
    color: "#019EC2",
    fontSize: 22,
  },
  description: {
    color: "#9eb3c2bd",
    fontSize: 13,
    lineHeight: 18,
  },
});

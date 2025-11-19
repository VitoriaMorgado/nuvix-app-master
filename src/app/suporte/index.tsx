import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Suporte() {
  const router = useRouter();

  const sections = [
    {
      title: "Ajuda Rápida",
      data: [
        {
          label: "Central de Ajuda",
          description: "Perguntas frequentes e suporte ao usuário.",
          icon: "help-circle-outline",
          route: "/suporte",
        },
        {
          label: "Fale Conosco",
          description: "Entre em contato direto com nossa equipe.",
          icon: "chatbubble-ellipses-outline",
          route: "/contato",
        },
      ],
    },
    {
      title: "Conta e Acesso",
      data: [
        {
          label: "Gerenciamento de Conta",
          description: "Atualize informações e preferências.",
          icon: "person-outline",
          route: "/alterarusuario",
        },
        {
          label: "Recuperar Senha",
          description: "Problemas para acessar sua conta?",
          icon: "key-outline",
          route: "/recuperar",
        },
      ],
    },
    {
      title: "Segurança e Privacidade",
      data: [
        {
          label: "Central de Denúncias e Violação",
          description: "Reporte atividades suspeitas ou abusos.",
          icon: "alert-circle-outline",
          route: "/denuncias",
        },
        {
          label: "Política de Privacidade",
          description: "Veja como tratamos seus dados pessoais.",
          icon: "document-text-outline",
          route: "/privacidade",
        },
      ],
    },
  ];

  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper-base.png")}
      style={styles.background}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
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
           <MaterialIcons name="support-agent" size={24} color="white" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Suporte e Ajuda</Text>
              <Text style={styles.subtitle}>
                Tire dúvidas, gerencie sua conta e mantenha tudo seguro.
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
            {section.data.map((item, iIdx) => (
              <TouchableOpacity
                key={iIdx}
                style={styles.option}
                activeOpacity={0.85}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon as any} size={22} color="#019EC2" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#aaa" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Precisa de mais ajuda? Nossa equipe está disponível 24h.
          </Text>
          <LinearGradient
                      colors={["#019EC2", "#45DCFF"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.footerButton}
                    >
            <Ionicons name="mail-outline" size={18} color="#fff" />
            <Text style={styles.footerButtonText}>Entrar em Contato</Text>
            </LinearGradient>
        </View>
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

  // Opções
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000c2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  iconContainer: {
    marginRight: 12,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 0,
    padding: 6,
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

  // Rodapé
  footer: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 40,
  },
  footerText: {
    color: "#9EB3C2",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

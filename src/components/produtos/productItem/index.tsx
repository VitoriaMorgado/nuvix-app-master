import { Game } from "@/src/models/data/game";
// Importação ESSENCIAL para navegação (Expo Router)
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Importando ícones para o Rating
import React from "react";

// Componente para a Tag (Ação, Estratégia, etc.)
const TagItem = ({ text }: { text: string }) => (
  <View style={styles.tagContainer}>
    <Text style={styles.tagText}>{text}</Text>
  </View>
);

export default function ProductItem({
  imagem,
  nome,
  preco,
  empresa,
  id,
  imagemcapa,
  categorias, // Agora usado para renderização
  avaliacao, // Adicionado para um toque final
}: Game) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const imageUrl = imagem || imagemcapa;

  const handlePress = () => {
    router.push(`/jogos/${id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {" "}
      <View style={styles.container}>
        {/* 1. IMAGEM */}{" "}
        {!imageError && imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            {" "}
            <Text style={styles.placeholderText}>
              Imagem não disponível
            </Text>{" "}
          </View>
        )}
        {/* 2. INFORMAÇÕES (Layout Vertical) */}{" "}
        <View style={styles.infoWrapper}>
          {/* BLOCO SUPERIOR: Nome, Empresa, Rating */}{" "}
          <View>
            <View>
              {" "}
              {/* Nome e Empresa (Empilhados) */}{" "}
              <Text style={styles.nomeJogo} numberOfLines={2}>
                {nome}{" "}
              </Text>{" "}
              <Text style={styles.desenvolvedorJogo}>
                {empresa || "Desenvolvedor Desconhecido"}{" "}
              </Text>
            </View>
            {/* Avaliação (Rating) */}
            {avaliacao && (
              <View style={styles.ratingContainer}>
                <FontAwesome5 name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{avaliacao}</Text>
              </View>
            )}{" "}
          </View>
          {/* BLOCO INFERIOR: Categorias e Preço */}{" "}
          <View style={styles.footerGroup}>
            {/* Categorias (Tags) */}
            <View style={styles.tagsContainer}>
              {categorias &&
                categorias
                  .slice(0, 2)
                  .map((cat, index) => <TagItem key={index} text={cat} />)}
            </View>
            {/* Preço */}{" "}
            <Text style={styles.precoJogo}>{preco || "Desconhecido"}</Text>{" "}
          </View>{" "}
        </View>{" "}
      </View>{" "}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 350, // Mantive 350px para ser o mesmo tamanho do seu código, mas '100%' seria mais responsivo
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#000000ff",
    borderRadius: 12,
    overflow: "hidden", // Sombra

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // ------------------------------------ // 2. ESTILOS DA IMAGEM // ------------------------------------

  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 15,
  },
  imagePlaceholder: {
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9ca3af",
    fontSize: 12,
    textAlign: "center",
  },

  // =========================================== // 3. GRUPOS DE TEXTO E ORGANIZAÇÃO VERTICAL // ===========================================

  infoWrapper: {
    flex: 1,
    flexDirection: "column", // <-- Mudei para 'column' para empilhar Nome/Empresa e Preço
    justifyContent: "space-between", // Empurra o Preço para baixo
    height: 80, // Mantém a altura da imagem
  },

  textGroup: {
    // Não precisa de estilos, apenas agrupa o Nome e a Empresa
    marginBottom: 4,
  },
  categorias: {
    flex: 1,
    flexDirection: "column", // <-- Mudei para 'column' para empilhar Nome/Empresa e Preço
    justifyContent: "space-between", // Empurra o Preço para baixo
    height: 80, // Mantém a altura da imagem
  },

  nomeJogo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff", // Removido flex: 1 e marginRight: 12 para dar espaço ao desenvolvedor abaixo
    marginBottom: 2,
  },

  desenvolvedorJogo: {
    fontSize: 14,
    color: "#a0a0a0", // Cinza mais claro para o texto da empresa
    fontStyle: "italic",
  },

  precoJogo: {
    fontSize: 18,
    fontWeight: "bold", // Adicionei negrito para destaque
    color: "#45DCFF",
    alignSelf: "flex-end", // Alinha o preço à direita, dentro do seu espaço
  },
  // ===========================================
  // 4. RATING
  // ===========================================
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#019EC2",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  ratingText: {
    marginLeft: 4,
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 12,
  },

  // ===========================================
  // 5. FOOTER (PREÇO E TAGS)
  // ===========================================
  footerGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "auto", // Garante que vá para o final do infoWrapper
  },

  // Tags (Categorias)
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagContainer: {
    backgroundColor: "#019EC2",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "500",
  },
});

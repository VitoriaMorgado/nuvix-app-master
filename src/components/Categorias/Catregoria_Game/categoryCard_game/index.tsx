import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

type Jogo = {
  id: string;
  imagem: string;
};

type GameCardProps = {
  jogo: Jogo;
  onPress?: () => void;
};

// Componente para renderizar cards de jogos
const GameCard = ({ jogo, onPress }: GameCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: jogo.imagem }} style={styles.imagemJogo} />
      <View style={styles.cardContent}></View>
    </TouchableOpacity>
  );
};

// Componente ProductCard original (se ainda necessário)
export default function ProductCard({
  image,
  onPress,
}: {
  image: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
        onError={() => console.log("Erro ao carregar imagem")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Estilos para GameCard
  card: {
    flex: 1,
  },
  imagemJogo: {
    width: 400,
    height: 180,
    backgroundColor: "#f0f0f0",
  },
  cardContent: {
    padding: 12,
  },

  // Estilos para ProductCard original
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
  },
});

export { GameCard, type Jogo };

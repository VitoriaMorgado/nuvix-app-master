import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Game, getGamesLocal } from "@/src/models/data/game"; // importa o arquivo unificado

export default function CatalogoJogos() {
  const router = useRouter();
  const [jogos, setJogos] = useState<Game[]>([]);

  // Carrega os jogos (pode futuramente trocar por syncGamesFromApi)
  useEffect(() => {
    getGamesLocal().then(setJogos);
  }, []);

  const renderItem = ({ item }: { item: Game }) => (
    <TouchableOpacity
      onPress={() => router.push(`../jogos/${item.id}`)} // corrige interpolação
      style={styles.card}
    >
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <Text style={styles.preco}>{item.preco}</Text>
      <Text style={styles.nome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={jogos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.linha}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00111A",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  linha: {
    justifyContent: "space-between",
  },
  card: {
    width: "49%",
    marginBottom: 10,
  },
  imagem: {
    width: "100%",
    height: 190,
    borderRadius: 6,
  },
  preco: {
    color: "#00BFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "left",
    marginTop: 5,
    marginLeft: 4,
  },
  nome: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
    marginLeft: 4,
  },
});

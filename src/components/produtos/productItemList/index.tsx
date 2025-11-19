import React, { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import ProductItem from "../productItem"; // Caminho corrigido para o ProductItem
// Ajuste o caminho abaixo conforme a localização real do arquivo 'game.ts'
import { getGamesLocal, Game } from "../../../models/data/game"; // Caminho corrigido para os dados

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        const gameList = await getGamesLocal(); // Puxa os dados simulados
        setGames(gameList);
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGames();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#45DCFF" />
        <Text>Carregando jogos...</Text>
      </View>
    );
  }

  // ERRO COMUM 1: Não há checagem se há jogos.
  if (games.length === 0) {
    return (
      <View>
        <Text>Nenhum jogo encontrado.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // ERRO COMUM 2: Não passar todas as props NECESSÁRIAS
          // A interface Game exige 'id' e 'imagemcapa'
          <ProductItem
            id={item.id} // Necessário para a interface
            nome={item.nome}
            preco={item.preco}
            empresa={item.empresa}
            categorias={item.categorias}
            imagem={item.imagem} // Imagem de catálogo
            imagemcapa={item.imagemcapa} // Necessário para a interface
            // ERRO COMUM 3: Esquecer de usar um Wrapper (como Pressable) se quiser que ProductItem seja clicável.
          />
        )}
      />
    </View>
  );
}

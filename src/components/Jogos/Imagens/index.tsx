import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  GameCard,
  type Jogo,
} from "../../Categorias/Catregoria_Game/categoryCard_game";

const jogos: Jogo[] = [
  {
    id: "1",
    imagem:
      "https://assetsio.gnwcdn.com/cultofthelamb_kHiKVNt.jpg?width=1200&height=600&fit=crop&enable=upscale&auto=webp",
  },
  {
    id: "2",
    imagem:
      "https://i.guim.co.uk/img/media/1fdafdfb3be9917c6b00f1b551fcc209ef9086b0/80_0_2400_1440/master/2400.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=dbf4556b7c6c4c3280d57c71f385f9c3",
  },
  {
    id: "3",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QYfhldIKhx1z-0ELiezSuu12KpaL5x323GKTmk9lQyuSjwqbTt9rFpj0dPRHwpR16qk&usqp=CAU",
  },
];

type GameListProps = {
  title?: string;
  onGamePress?: (jogo: Jogo) => void;
};

export default function GameList({ title, onGamePress }: GameListProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        data={jogos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            jogo={item}
            onPress={() => onGamePress && onGamePress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 16,
    color: "#f8f6f6ff",
  },
  listContent: {
    paddingHorizontal: 8,
  },
  separator: {
    width: 12,
  },
});

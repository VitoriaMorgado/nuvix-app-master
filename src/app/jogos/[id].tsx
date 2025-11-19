import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import Button from "@/src/components/Pre-Prontos/button/Button";
import GameCard from "@/src/components/Jogos/card-game/cardgame";
import styles from "./style";

export default function JogoDetalhes() {
  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper-base.png")}
      style={styles.background}
    >
      <ScrollView>
        <GameCard />
      </ScrollView>
    </ImageBackground>
  );
}

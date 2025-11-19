import { ImageBackground, ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import Promo from "@/src/components/Pre-Prontos/promo/index";
import CategoryList from "@/src/components/Categorias/Categoria_Home/categoryList_home";
import ProductItemList from "@/src/components/produtos/productItemList";
export default function Index() {
  return (
    <ImageBackground
          source={require("@/assets/images/wallpaper-base.png")}
          style={styles.background}
          resizeMode="cover"
        >
      <View style={styles.container}>
        <ScrollView style={{ paddingTop: 20 }}>
          <Promo urlImage="https://levelupnews.com.br/wp-content/uploads/2025/09/Hollow-Knight-Silksong-provocou-uma-re-revelar-na-noite-de-abertura.jpg.webp" />
          <CategoryList />
          <ProductItemList />
        </ScrollView>
      </View>
    </ImageBackground>
    
  );
}
const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CategoryItem from "@/src/components/Categorias/Categoria_Home/categoryItem_home";
import { getCategoriesLocal } from "@/src/models/data/categories";
import { styles } from "./style";

export default function CategoryList() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        //TA PUXANDO LA DO CATEGORIES.TS
        const data = await getCategoriesLocal();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AntDesign
        name="cloudo"
        size={24}
        color="#ffffff"
        style={styles.cloude}
      />
      <View style={styles.line} />
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => <CategoryItem name={item} />}
      />
    </View>
  );
}

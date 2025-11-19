import { colors } from "@/src/styles/colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

interface CategoryItemProps {
  name: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name }) => {
  const router = useRouter();
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.categoryText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.listContainer}
    >
      {categories.map((cat, index) => (
        <CategoryItem key={index} name={cat} />
      ))}
    </ScrollView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 12,
  },
  itemContainer: {
    marginRight: 10,
  },
  categoryText: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: "#00C8F6",
    color: "#ffffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});

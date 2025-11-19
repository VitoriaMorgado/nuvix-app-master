import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface CategoryProps {
  name: string;
}

const CategoryItem: React.FC<CategoryProps> = ({ name }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ borderRadius: 40, overflow: "hidden", marginTop: 10 }}
        onPress={() => router.push("/")}
      >
        <LinearGradient
          colors={["#019EC2", "#45DCFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.baseButton, styles.mediumButton]}
        >
          <Text style={[styles.baseButtonText, styles.mediumText]}>{name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryitem: {
    padding: 15,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#00C8F6",
    color: "#000000ff",
  },
  baseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 4,
  },
  baseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // TAMANHO PEQUENO
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignContent: "center",
  },
  smallText: {
    fontSize: 14,
  },

  // TAMANHO MEDIO
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignContent: "center",
    minWidth: 150,
  },
  mediumText: {
    fontSize: 18,
  },

  // TAMANHO GRANDIN
  largeButton: {
    width: "50%",
    paddingVertical: 14,
    paddingHorizontal: 25,
  },
  largeText: {
    fontSize: 20,
  },
});

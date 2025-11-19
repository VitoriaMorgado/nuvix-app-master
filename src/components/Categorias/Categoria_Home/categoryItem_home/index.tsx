import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./style";

interface CategoryItemProps {
  name: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name }) => {
  const router = useRouter();

  const handlePress = () => {
    //VAI MANDAR PRA PAGINA LA DO CATALOGO
    router.push({
      pathname: "/catalogo_geral",
      params: { categoria: name },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.categoryColumn} onPress={handlePress}>
        <Text style={styles.categoryText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;

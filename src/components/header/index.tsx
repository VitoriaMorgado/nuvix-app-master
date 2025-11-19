import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { colors } from "@/src/styles/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Defina corretamente o RootStackParamList conforme suas rotas
type RootStackParamList = {
  Carrinho: undefined;
  // Adicione outras rotas conforme necessário
};

export default function Header() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Menu Drawer */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <Feather name="menu" size={26} color={colors.white} />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>
        Nuvix
        <Text style={styles.ponto}>.</Text>
      </Text>

      {/* Carrinho */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Carrinho")}
        style={styles.iconButton}
        activeOpacity={0.7}
      >
        <AntDesign name="shoppingcart" size={26} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

// STYLE
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 14,
    paddingTop: 50,
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[700],
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    marginTop: -5,
  },
  ponto: {
    color: "#00BFFF",
    fontSize: 35,
    fontWeight: "bold",
    marginEnd: -5,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    // Remova paddingBottom negativo, não é suportado
    // paddingBottom: -5,
  },
});

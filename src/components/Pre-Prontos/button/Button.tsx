import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

// 1. Defina os tipos de tamanho que o botão pode ter
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  size?: ButtonSize;
}

const Button = ({
  title = "Iniciar Sessão",
  onPress,
  size = "medium",
}: ButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // CASO NAO FALAR QUAL A INFORMACAO, VAI PRO PADRÃO
      Alert.alert("Ação Padrão", "Botão pressionado!", [{ text: "OK" }]);
    }
  };

  const handleLogin = (event: GestureResponderEvent): void => {
    handlePress();
  };

  const getSizeStyles = (buttonSize: ButtonSize) => {
    switch (buttonSize) {
      case "small":
        return {
          // PEQUENO
          buttonStyle: styles.smallButton,
          textStyle: styles.smallText,
        };
      case "large":
        return {
          // GRANDE
          buttonStyle: styles.largeButton,
          textStyle: styles.largeText,
        };
      case "medium":
      default:
        return {
          //MEDIO
          buttonStyle: styles.mediumButton,
          textStyle: styles.mediumText,
        };
    }
  };

  const { buttonStyle, textStyle } = getSizeStyles(size);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLogin}
        style={{ borderRadius: 40, overflow: "hidden", marginTop: 10 }}
      >
        <LinearGradient
          colors={["#019EC2", "#45DCFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.baseButton, buttonStyle]}
        >
          <Text style={[styles.baseButtonText, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },

  //BASE
  baseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
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

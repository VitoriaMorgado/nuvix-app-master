import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageStyle,
  ActivityIndicator,
} from "react-native";

import { classificacoes, AgeRating } from "@/src/models/data/classificacao";

interface Props {
  classificacao?: AgeRating;
  //TAMANHO DOS ICONES
  tamanho?: "pequeno" | "normal";
}

export default function ClassificacaoEtaria({
  classificacao = "L",
  tamanho = "pequeno",
}: Props) {
  const ratingKey: AgeRating =
    classificacao && classificacoes[classificacao] ? classificacao : "L";

  const ratingData = classificacoes[ratingKey] as {
    icone: string | number;
    nome: string;
    texto: string;
  };

  //----| TAMANHO DO ÍCONE |----
  const iconSize: ImageStyle =
    tamanho === "pequeno"
      ? { width: 25, height: 30 }
      : { width: 40, height: 40 };

  if (!ratingData.icone) {
    return (
      <View style={styles.containerTexto}>
        <Text style={styles.textoDescritivoFallback}>
          {ratingData.texto} ({ratingKey})
        </Text>
      </View>
    );
  }

  const isUri = typeof ratingData.icone === "string";
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.containerPrincipal}>
      {/* ÍCONE (A IMAGEMZINHA) */}
      <View
        style={[
          { justifyContent: "center", alignItems: "center", marginRight: 8 },
          iconSize,
        ]}
      >
        <Image
          source={
            isUri
              ? { uri: String(ratingData.icone) }
              : (ratingData.icone as number)
          }
          style={[styles.icone, iconSize]}
          accessibilityLabel={`Classificação ${ratingData.nome}`}
          // Usamos onLoadStart/onLoadEnd para controlar um indicador de carregamento manualmente
          onLoadStart={() => isUri && setLoading(true)}
          onLoadEnd={() => isUri && setLoading(false)}
        />
        {isUri && loading && (
          <ActivityIndicator
            size="small"
            color="#FFF"
            style={{ position: "absolute" }}
          />
        )}
      </View>

      {/* TEXTO DESCRITIVO AO LADO */}
      <Text style={styles.textoDescritivo}>{ratingData.texto}</Text>
    </View>
  );
}

// --- Estilos ---

const styles = StyleSheet.create({
  containerPrincipal: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginRight: 8,
  },
  icone: {
    resizeMode: "contain",
  },
  textoDescritivo: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
    flexShrink: 1,
  },

  containerTexto: {
    alignSelf: "flex-start",
    padding: 4,
  },
  textoDescritivoFallback: {
    color: "#AAAAAA",
    fontSize: 14,
  },
});

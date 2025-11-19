import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Feature, Game, getGameByIdLocal } from "@/src/models/data/game";
import CategoryList from "../../Categorias/Catregoria_Game/categoryList_game";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { classificacoes } from "@/src/models/data/classificacao";

export default function Expansao() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [game, setGame] = useState<Game | undefined>(undefined);
  useEffect(() => {
    if (id) getGameByIdLocal(id).then((g) => setGame(g));
  }, [id]);

  if (!game) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "#fff" }}>Carregando informações do jogo...</Text>
      </View>
    );
  }

  const renderIcon = (feature: Feature) => {
    switch (feature.lib) {
      case "Fontisto":
        return <Fontisto name={feature.icon as any} size={16} color="#fff" />;
      case "Ionicons":
        return <Ionicons name={feature.icon as any} size={16} color="#fff" />;
      default:
        return null;
    }
  };

  const cor =
    classificacoes[game.classificacao as keyof typeof classificacoes]?.cor ||
    "#999";

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/imagens/walppaper-base.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View style={styles.conteudoCentralizado}>
          <ScrollView
            contentContainerStyle={styles.rolagemConteudo}
            showsVerticalScrollIndicator={false}
          >
            {/* IMAGEM E INFORMAÇÕES PRINCIPAIS */}
            <Image
              source={{
                uri: game.imagembanner || game.imagemcapa || game.imagem,
              }}
              style={styles.image}
            />

            <Text style={styles.gameTitle}>{game.nome || "Desconhecido"}</Text>
            <Text style={styles.empresa}>{game.empresa || "Desconhecido"}</Text>

            {/* CLASSIFICAÇÃO */}
            {game.classificacao && (
              <View style={styles.classificacaoContainer}>
                <View
                  style={{
                    backgroundColor: cor,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      color: game.classificacao === "18" ? "#fff" : "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {classificacoes[
                      game.classificacao as keyof typeof classificacoes
                    ]?.nome || game.classificacao}
                  </Text>
                </View>
              </View>
            )}

            {/* PREÇO */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{game.preco || "R$0,00"}</Text>
            </View>

            {/* CATEGORIAS */}
            <CategoryList categories={game.categorias ?? []} />

            {/* INFORMAÇÕES */}
            <View style={{ marginTop: 20 }}>
              {game.info?.map((feature, index) => (
                <View key={index} style={styles.featureText}>
                  {renderIcon(feature)}
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </View>

            {/* DESCRIÇÃO */}
            <View style={styles.secao}>
              <Text style={styles.tituloSesao}>Descrição</Text>
              <Text style={styles.descricao}>
                {game.descricao ||
                  "Crie seu próprio culto em uma terra de falsos profetas, aventurando-se por regiões misteriosas e diversas para criar uma comunidade fiel de Seguidores da floresta e para propagar sua Palavra e se tornar o único culto verdadeiro."}
              </Text>
            </View>

            {/* FAIXA PRETA - EXPANSÕES */}
            <View style={styles.faixapreta}>
              <View style={styles.containerTextoFaixa}>
                <Text style={styles.textofaixa}>Expansão</Text>
              </View>
            </View>

            {/* EXPANSÕES */}
            <View style={styles.secao}>
              {/* Exemplo de expansão - você pode mapear de game.expansoes se existir */}
              <View style={styles.cartaoExpansao}>
                <View style={styles.cabecalhoExpansao}>
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm5DZA2ft9QNMIXQd7FHHxrgRIbk7zOehp_LS679xQzAFP1DTYZ3o6NqxoDkRgrkkGZr8&usqp=CAU",
                    }}
                    style={styles.imagemExpansao}
                    resizeMode="cover"
                  />
                  <View style={styles.containerJogo}>
                    <Text style={styles.nomeExpansao}>
                      Cult of the Lamb: Sinful Pack
                    </Text>
                    <Text style={styles.desenvolvedorExpansao}>
                      Devolver Digital
                    </Text>
                    <Text style={styles.precoExpansao}>R$16,99</Text>
                  </View>
                </View>
              </View>

              {/* Adicione mais expansões conforme necessário */}
              {/* {game.expansoes?.map((expansao, index) => (
                <View key={index} style={styles.cartaoExpansao}>
                  <View style={styles.cabecalhoExpansao}>
                    <Image
                      source={{ uri: expansao.imagem }}
                      style={styles.imagemExpansao}
                      resizeMode="cover"
                    />
                    <View style={styles.containerJogo}>
                      <Text style={styles.nomeExpansao}>{expansao.nome}</Text>
                      <Text style={styles.desenvolvedorExpansao}>
                        {expansao.desenvolvedor}
                      </Text>
                      <Text style={styles.precoExpansao}>{expansao.preco}</Text>
                    </View>
                  </View>
                </View>
              ))} */}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  gameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 4,
  },

  empresa: {
    fontSize: 16,
    color: "#a0a0a0",
    textAlign: "center",
    marginBottom: 8,
  },

  classificacaoContainer: {
    alignItems: "flex-start",
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
  },

  priceContainer: {
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  price: {
    fontSize: 20,
    color: "#45DCFF",
    fontWeight: "bold",
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  // CONTAINER PRINCIPAL PARA CENTRALIZAR
  conteudoCentralizado: {
    flex: 1,
    justifyContent: "center",
  },

  rolagemConteudo: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },

  secao: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },

  // FAIXA QUE OCUPA LARGURA TOTAL
  faixapreta: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 18,
    marginBottom: 32,
  },

  // CONTAINER PARA ALINHAR O TEXTO COM A DESCRIÇÃO
  containerTextoFaixa: {
    paddingHorizontal: 16,
  },

  textofaixa: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  tituloSesao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },

  descricao: {
    fontSize: 16,
    color: "#e0e0e0",
    lineHeight: 22,
    textAlign: "justify",
  },
  //Card de expansão style

  cartaoExpansao: {
    backgroundColor: "#1b1a1ace",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cabecalhoExpansao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  nomeExpansao: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
    marginRight: 12,
  },

  precoExpansao: {
    fontSize: 18,
    color: "#45DCFF",
    alignSelf: "flex-end",
  },

  desenvolvedorExpansao: {
    fontSize: 14,
    color: "#a0a0a0",
    fontStyle: "italic",
  },

  containerJogo: {
    flex: 1,
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#2a2a2a",
  },

  imagemExpansao: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#2a2a2a",
  },

  featureText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
});

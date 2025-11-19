import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ActivityIndicator,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import { styles } from "./style"; // Assumindo que o estilo está no './style'
import { getGameByIdLocal, Game } from "@/src/models/data/game"; // Ajuste o caminho se necessário
import { useNavigation, useRoute } from "@react-navigation/native"; // Importe se estiver usando React Navigation
import { Ionicons } from "@expo/vector-icons";

// Defina a tipagem para os parâmetros da rota (se estiver usando React Navigation)
// Assumindo que você passa o 'gameId' como parâmetro.
interface RouteParams {
  gameId: string;
  // Opcional: Adicionar o preço pago se o fluxo for mais complexo
  precoPago?: number;
  descontoAplicado?: number;
}

// Interface simplificada da Compra para simular os dados dinâmicos
interface CompraDetalhe {
  jogo: Game;
  precoOriginal: number; // Preço em float
  desconto: number; // Desconto em porcentagem
  metodoPagamento: string;
  chave: string;
}

export default function ResgatePosCompra() {
  // ⬅️ Este hook DEVE estar no topo do componente
  const navigation = useNavigation();

  const route = useRoute();
  // ... (outros states e lógica)

  // FUNÇÃO VOLTAR
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  const {
    gameId,
    precoPago = 0,
    descontoAplicado = 0,
  } = route.params as RouteParams;

  const [compraDetalhe, setCompraDetalhe] = useState<CompraDetalhe | null>(
    null
  );
  const [chaveResgatada, setChaveResgatada] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 1. Carregamento dos Dados do Jogo ---
  useEffect(() => {
    async function loadGameDetails() {
      try {
        const game = await getGameByIdLocal(gameId);

        if (game) {
          // Extrai o preço da string, removendo 'R$' e vírgula
          // É altamente recomendado armazenar preços como number/float
          const precoOriginalStr =
            game.preco?.replace("R$", "").replace(",", ".") || "0";
          const precoOriginal = parseFloat(precoOriginalStr);

          // Simulação de detalhes da compra, já que a seed não tem esses dados
          const detalhes: CompraDetalhe = {
            jogo: game,
            precoOriginal: precoOriginal,
            desconto: 20, // Desconto fixo de exemplo (ou use 'descontoAplicado' da rota)
            metodoPagamento: "Pix", // Fixo de exemplo
            chave: game.codigo || "CHAVE-INDISPONIVEL", // Pega o código da seed
          };

          setCompraDetalhe(detalhes);
        } else {
          Alert.alert("Erro", "Jogo não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao carregar os detalhes do jogo:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes da compra.");
      } finally {
        setLoading(false);
      }
    }

    loadGameDetails();
  }, [gameId]); // Recarrega se o ID do jogo mudar

  // --- 2. Cálculos e Handlers ---

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do jogo...</Text>
      </View>
    );
  }

  if (!compraDetalhe) {
    // Caso o jogo não seja encontrado após o carregamento
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Detalhes da compra não disponíveis.</Text>
      </View>
    );
  }

  // Cálculo final do total (usando os dados simulados)
  const total = (
    compraDetalhe.precoOriginal *
    (1 - compraDetalhe.desconto / 100)
  ).toFixed(2);

  const handleResgatar = () => {
    setChaveResgatada(true);
    Alert.alert("Chave Resgatada!", `Sua chave: ${compraDetalhe.chave}`);
  };

  // Desestruturação para facilitar o uso no JSX
  const { jogo, precoOriginal, desconto, metodoPagamento, chave } =
    compraDetalhe;

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/images/wallpaper-base.png")}
    >
      {/* 1. BOTÃO VOLTAR (Fixo no topo) */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            name="arrow-back-circle"
            size={36}
            color="#fff"
            style={styles.iconShadow || styles.iconShadow}
          />
        </TouchableOpacity>
      </View>
      {/* 2. ScrollView ENVOLVENDO TODO O CONTEÚDO ROLÁVEL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* IMAGEM DO JOGO (usando a imagemcapa do Game) */}
        <View style={styles.containerImage}>
          <Image
            source={{
              uri: jogo.imagemcapa, // Usa a imagemcapa do objeto Game
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* NOME E DESCRIÇÃO */}
        <Text style={styles.title}>{jogo.nome}</Text>

        <Text style={styles.description}>
          {jogo.descricao || "Descrição não disponível."}
        </Text>

        {/* DETALHES DE PAGAMENTO */}
        <View style={styles.containerTotal}>
          <Text style={styles.subtitulo}>Detalhes da Compra</Text>

          <View style={styles.detalhes}>
            <Text style={styles.textoFade}>Preço original:</Text>
            <Text style={styles.textoNormal}>
              R$ {precoOriginal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.detalhes}>
            <Text style={styles.textoFade}>Desconto:</Text>
            <Text style={styles.textoDesconto}>{desconto}%</Text>
          </View>

          <View style={styles.detalhes}>
            <Text style={styles.textoFade}>Método de Pagamento:</Text>
            <Text style={styles.textoNormal}>{metodoPagamento}</Text>
          </View>

          <View style={styles.total}>
            <Text style={styles.textoBold}>Total Pago:</Text>
            <Text style={styles.textoPreco}>R$ {total}</Text>
          </View>
        </View>

        {/* BOTÃO DE RESGATAR */}
        <TouchableOpacity
          onPress={handleResgatar}
          style={styles.botaoResgate}
          disabled={chaveResgatada}
        >
          <Text style={styles.textoBotao}>
            {chaveResgatada ? "Chave Resgatada" : "Resgatar Chave"}
          </Text>
        </TouchableOpacity>

        {/* 🔑 EXIBE CHAVE QUANDO RESGATADA (Precisa de rolagem) */}
        {chaveResgatada && (
          <View style={styles.containerChave}>
            <Text style={styles.textoChave}>Sua chave:</Text>
            <Text selectable style={styles.chave}>
              {chave}
            </Text>
          </View>
        )}
      </ScrollView>{" "}
      {/* ⬅️ Fechamento do ScrollView */}
    </ImageBackground>
  );
}

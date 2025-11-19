import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import {
  Feature,
  Game,
  getGameByIdLocal,
  Expansion,
} from "@/src/models/data/game";
import CategoryList from "../../Categorias/Catregoria_Game/categoryList_game";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import ClassificacaoEtaria from "@/src/components/classify-age";
import Button from "../../Pre-Prontos/button/Button";

//CONST DE CORES E DO BOTÃO QUE MUDA DE ABA
const BANNER_HEIGHT = Dimensions.get("window").height * 0.45;
const PRIMARY_COLOR = "#45DCFF";
const BACKGROUND_COLOR = "#1A1A2E";
const TABS = {
  ABOUT: "Sobre",
  EXPANSIONS: "Expansões",
} as const;

// --- COMPONENTE: ITEM DA LISTA DE EXPANSÕES ---
const ExpansionItem: React.FC<{ expansion: Expansion }> = ({ expansion }) => (
  <View style={expansionStyles.itemContainer}>
    <Image
      source={{ uri: expansion.imagem }}
      style={expansionStyles.image}
      onError={(e) =>
        console.log("ERRO NO CARREGAMENTO DA IMAGEM:", e.nativeEvent.error)
      }
    />
    <View style={expansionStyles.details}>
      <Text style={expansionStyles.title}>{expansion.nome}</Text>
      <Text style={expansionStyles.company}>{expansion.empresa}</Text>
    </View>
    <Text style={expansionStyles.price}>{expansion.preco}</Text>
  </View>
);

const ExpansionList: React.FC<{ expansions: Expansion[] }> = ({
  expansions,
}) => {
  if (!expansions || expansions.length === 0) {
    return (
      <View style={expansionStyles.emptyContainer}>
        <Text style={expansionStyles.emptyText}>
          Não há expansões disponíveis para este jogo no momento.
        </Text>
      </View>
    );
  }

  //INICIO RETURN

  //EXPANSÃOES
  return (
    <View>
      <Text style={styles.sectionHeader}>Expansões Disponíveis</Text>
      {expansions.map((exp) => (
        <ExpansionItem key={exp.id} expansion={exp} />
      ))}
    </View>
  );
};

export default function GameCard() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [game, setGame] = useState<Game | undefined>(undefined);

  const [activeTab, setActiveTab] = useState<
    typeof TABS.ABOUT | typeof TABS.EXPANSIONS
  >(TABS.ABOUT);

  useEffect(() => {
    if (id) getGameByIdLocal(id).then((g) => setGame(g));
  }, [id]);

  if (!game) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: BACKGROUND_COLOR }]}
      >
        <Text style={styles.loadingText}>
          Carregando informações do jogo...
        </Text>
      </View>
    );
  }

  //FUNÇOES DE ACAO, EM CIMA DA PAGINA LA O VOLTAR E COMPARTILHAR

  // FUNÇÃO VOLTAR
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback para a tela inicial se não houver histórico
      router.replace("/");
    }
  };

  // FUNÇÃO COMPARTILHAR
  const handleShare = async () => {
    try {
      const imageUrl = game.imagemcapa || game.imagem;
      const gameLink = `https://seusite.com/jogo/${game?.id}`; // Use a URL real do seu app/site
      const message = `Dá uma olhada no jogo ${
        game?.nome || "esse jogo incrível"
      }!`;

      await Share.share({
        message: message,
        url: gameLink,
        title: `Compartilhar: ${game?.nome || "Jogo"}`,
        // Note: A maioria das plataformas não suporta compartilhamento direto de imagens via URL
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      alert("Erro ao tentar compartilhar o conteúdo.");
    }
  };

  // FUNÇÃO PARA REDIRECIONAR PARA A TELA DE RESGATE
  const handleResgate = () => {
    // 1. Verifica se o ID do jogo está disponível
    if (game?.id) {
      // 2. Usa o router.push() do Expo Router para navegar
      // A rota deve apontar para o seu componente ResgatePosCompra.
      router.push({
        // ⚠️ Ajuste este caminho (pathname) para o que você configurou no seu projeto.
        // Assumindo a estrutura: app/resgate/[gameId].tsx
        pathname: "/resgate",
        params: {
          gameId: game.id,
          // Você pode adicionar mais parâmetros aqui, como o preço, se precisar que
          // o ResgatePosCompra receba o preço exato pago, e não o preço da seed.
        },
      });
    } else {
      // Caso de segurança se o ID não for encontrado
      alert("Erro: ID do jogo não encontrado para o resgate.");
    }
  };
  const renderIcon = (feature: Feature) => {
    const IconComponent = feature.lib === "Fontisto" ? Fontisto : Ionicons;
    return (
      <IconComponent
        name={feature.icon as any}
        size={20}
        color={PRIMARY_COLOR}
      />
    );
  };

  // ABA SOBRE
  const renderAboutContent = () => (
    <>
      {/* DESCRIÇÃO DO JOGO*/}
      {game.descricao && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionHeader}>Descrição</Text>
          <Text style={styles.descriptionText}>{game.descricao}</Text>
        </View>
      )}

      {/* ---| IMMAGENS |--- */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionHeader}>Galeria</Text>
        <ScrollView horizontal style={styles.galleryScroll}>
          {game.imagemexemplo1 && (
            <Image
              source={{
                uri: game.imagemexemplo1,
              }}
              style={styles.screenshotImage}
            />
          )}

          {/* IMAGEM EXEMPLO2 QUE TA PUXANDO LA DO TS */}
          {game.imagemexemplo2 && (
            <Image
              source={{
                uri: game.imagemexemplo2,
              }}
              style={styles.screenshotImage}
            />
          )}

          {/* IMAGEM3 == */}
          {game.imagemexemplo3 && (
            <Image
              source={{
                uri: game.imagemexemplo3,
              }}
              style={styles.screenshotImage}
            />
          )}
        </ScrollView>
      </View>
      <View style={styles.separator} />

      {/* ---| DESTAQUES |--- */}
      <View style={styles.featuresList}>
        {game.info?.map((feature, index) => (
          <View key={`${feature.text}-${index}`} style={styles.featureItem}>
            {renderIcon(feature)}
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>
    </>
  );

  // BAGUI QUE VAI RENDERIZAR A ABA DAS EXPANSOES
  // AGORA PUXA AS EXPANSÕES DIRETAMENTE DO OBJETO 'game'
  const renderExpansionContent = () => (
    <ExpansionList expansions={game.expansoes || []} />
  );

  // BOTÕES DOS BAGUI QUE MUDA
  const renderNavButtons = () => (
    <View style={styles.navButtonsContainer}>
      {/* SOBRE */}
      <TouchableOpacity
        style={[
          styles.navButton,
          activeTab === TABS.ABOUT && styles.navButtonActive,
        ]}
        onPress={() => setActiveTab(TABS.ABOUT)}
      >
        <Text
          style={
            activeTab === TABS.ABOUT
              ? styles.navButtonTextActive
              : styles.navButtonText
          }
        >
          {TABS.ABOUT}
        </Text>
      </TouchableOpacity>

      {/* EXPANSÕES */}
      <TouchableOpacity
        style={[
          styles.navButton,
          activeTab === TABS.EXPANSIONS && styles.navButtonActive,
        ]}
        onPress={() => setActiveTab(TABS.EXPANSIONS)}
      >
        <Text
          style={
            activeTab === TABS.EXPANSIONS
              ? styles.navButtonTextActive
              : styles.navButtonText
          }
        >
          {TABS.EXPANSIONS}
        </Text>
      </TouchableOpacity>

      {/* PREÇO */}
      <View style={styles.priceContainerRight}>
        <Text style={styles.priceRight}>{game.preco || "R$0,00"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      {/* IMAGEM DE FUNDO */}
      <Image
        source={{
          uri: game.imagembanner || game.imagemcapa || game.imagem,
        }}
        style={styles.bannerImage}
      />
      {/* BOTÕES DE TOPO: VOLTAR E COMPARTILHAR */}
      <View style={styles.topBar}>
        {/* BOTÃO VOLTAR */}
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            name="arrow-back-circle"
            size={36}
            color="#fff"
            style={styles.iconShadow}
          />
        </TouchableOpacity>

        {/* BOTÃO COMPARTILHAR */}
        <TouchableOpacity onPress={handleShare}>
          <Ionicons
            name="share-social"
            size={30}
            color="#fff"
            style={styles.iconShadow}
          />
        </TouchableOpacity>
      </View>

      {/* 2. Conteúdo ROLÁVEL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ height: BANNER_HEIGHT }} />

        {/* 3. Wrapper do Conteúdo (com fundo escuro) */}
        <View style={styles.contentWrapper}>
          <View style={styles.container}>
            {/* Título, Empresa e Classificação */}
            <View style={styles.headerInfo}>
              <View style={styles.mainDetails}>
                <Text style={styles.gameTitle}>
                  {game.nome || "Título Desconhecido"}
                </Text>
                <Text style={styles.empresa}>
                  {game.empresa || "Estúdio Desconhecido"}
                </Text>

                {/* Classificação Etária e Descrição da Classificação */}
                {game.classificacao && (
                  <View style={styles.classificacaoRow}>
                    <ClassificacaoEtaria
                      classificacao={game.classificacao}
                      tamanho="pequeno"
                    />
                  </View>
                )}
              </View>
            </View>

            {/* BOTÃO DE NAVEGAÇÃO */}
            {renderNavButtons()}

            <View style={styles.sectionMargin}>
              <CategoryList categories={game.categorias ?? []} />
            </View>

            {/* RENDERIZAÇÃO CONDICIONAL */}
            {activeTab === TABS.ABOUT
              ? renderAboutContent()
              : renderExpansionContent()}
          </View>
          {/* BOTÃO FIXO INFERIOR DE AÇÃO */}
          <View style={styles.navButtonsContainerresgate}>
            <Button
              title="Resgatar Jogo"
              size="large"
              onPress={handleResgate} // <-- A aplicação é aqui!
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// --- ESTILOS PRINCIPAIS ---
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    color: "#1A1A2E",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  bannerImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: BANNER_HEIGHT,
    resizeMode: "cover",
  },
  botao: {
    marginLeft: "50%",
  },
  topBar: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  contentWrapper: {
    backgroundColor: BACKGROUND_COLOR,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
  // HEADER
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  mainDetails: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
  },
  empresa: {
    fontSize: 16,
    color: "#B0B0C0",
    fontWeight: "400",
    marginBottom: 10,
  },
  classificacaoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  classificacaoText: {
    fontSize: 12,
    color: "#B0B0C0",
    marginLeft: 8,
  },
  // BOTÃO DE NAVEGAÇÃO SOBRE/EXPANSÕES
  navButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  navButtonsContainerresgate: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    position: "absolute",
    bottom: -60,
    left: 0,
    right: 0,
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  navButtonActive: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  navButtonTextActive: {
    color: BACKGROUND_COLOR,
    fontWeight: "700",
  },
  priceContainerRight: {
    marginLeft: "auto",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  priceRight: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    marginLeft: 10,
  },
  // ABA DE SEÇOES
  sectionMargin: {
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#3A3A5A",
    marginVertical: 15,
  },
  sectionHeader: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 10,
  },
  // ABINHA DE SOBRE
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingRight: 15,
    width: "50%",
  },
  featureText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
    flexShrink: 1,
  },
  // --- Galeria de Imagens (Aba Sobre) ---
  galleryScroll: {
    marginVertical: 10,
  },
  screenshotImage: {
    width: 350,
    height: 200,
    borderRadius: 3,
    marginRight: 5,
    resizeMode: "cover",
  },
  // --- Descrição (Aba Sobre) ---
  descriptionContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  descriptionText: {
    color: "#E0E0E0",
    fontSize: 15,
    lineHeight: 22,
  },
  // --- Botão de Ação Fixo Inferior ---
  bottomActionButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    alignItems: "center",
  },
  bottomActionButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: 18,
    fontWeight: "bold",
  },
});

// --- ESTILOS DE EXPANSÕES (Novo) ---
const expansionStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    // Alterado para um fundo mais escuro que o background geral para destaque
    backgroundColor: BACKGROUND_COLOR,
    borderBottomColor: "#3A3A5A",
    marginVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 50,
    backgroundColor: "red",
    borderRadius: 4,
    marginRight: 15,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  company: {
    fontSize: 13,
    color: "#B0B0C0",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginLeft: 10,
  },
  emptyContainer: {
    paddingVertical: "40%",
    alignItems: "center",
    backgroundColor: "#1A1A2E", // Para garantir que fique no fundo
  },
  emptyText: {
    color: "#B0B0C0",
    fontSize: 16,
    textAlign: "center",
  },
});

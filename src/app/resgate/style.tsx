import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2241ff",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  containerImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#222", // fallback background
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  topBar: {
    // Posiciona o elemento de forma ABSOLUTA
    position: "absolute",
    top: 50, // Distância do topo (ajuste para SafeAreaView se necessário)
    left: 20, // Distância da esquerda
    zIndex: 10, // Garante que fique acima da ImageBackground e da Imagem do jogo
    // Pode adicionar padding, mas 'top' e 'left' são o principal.
  },
  // Incluindo seu estilo 'iconShadow' aqui caso ele não esteja no seu styles.ts
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scrollContent: {
    // Garante que haja um espaço extra no final para que o último item não encoste no rodapé
    paddingBottom: 40,
    // Garante que o ScrollView comece abaixo da barra fixa se você não usar o View para a imagem.
    paddingTop: 80,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    color: "#ccc",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 25,
  },
  containerTotal: {
    width: "100%",
    backgroundColor: "#1d1d1dff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  subtitulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  detalhes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  textoNormal: {
    color: "#fff",
  },
  textoFade: {
    color: "#dfdfdfff",
  },
  textoDesconto: {
    color: "#019EC2",
  },
  textoBold: {
    color: "#fff",
    fontWeight: "bold",
  },
  textoPreco: {
    color: "#019EC2",
    fontWeight: "bold",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#00618A",
    paddingTop: 10,
  },
  botaoResgate: {
    width: "100%",
    backgroundColor: "#019EC2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  containerChave: {
    backgroundColor: "#2a2f55",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  textoChave: {
    color: "#bbb",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
  chave: {
    color: "#019EC2",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

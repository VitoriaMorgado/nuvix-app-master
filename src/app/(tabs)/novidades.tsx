import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/src/styles/colors";

// Dados simulados
const noticiasPrincipais = [
  {
    id: 1,
    titulo: "Cult of the Lamb: Woolhaven chegou à Nuvix",
    descricao: "Explore a nova ilha Woolhaven, enfrente novos inimigos e chefes, e descubra segredos ocultos nesta expansão repleta de aventuras.",
    imagem: "https://i.ytimg.com/vi/EehS0AGcLkc/maxresdefault.jpg",
    data: "25 Mai 2025",
    categoria: "Atualização"
  },
  {
    id: 2,
    titulo: "Cult of the Lamb: Unholy Alliance Chega com Estilo",
    descricao: "A nova atualização Unholy Alliance adiciona modo cooperativo local, ataques corrompidos e uma nova forma de liderar seu culto ao lado de um aliado profano.",
    imagem: "https://images.ctfassets.net/i9kiyzrddw2a/3LeiPyKvm2STiscg2moHkh/90b7210f3b85288a6663b754559d7e2c/COTL_LOGO_BG_.gif",
    data: "24 Mai 2025",
    categoria: "Lançamento"
  }
];

const outrasNoticias = [
  {
    id: 3,
    titulo: "Stardew Valley – Pacote Jardim Encantado",
    descricao: "Adicione novas plantações, animais mágicos e atividades relaxantes para tornar sua fazenda ainda mais especial.",
    imagem: "https://via.placeholder.com/400x200.png?text=Stardew+Valley",
    data: "23 Mai 2025",
    categoria: "DLC"
  },
  {
    id: 4,
    titulo: "Resident Evil 4: Sobrevivência Reimaginada",
    descricao: "O clássico retorna com visuais modernos, combates refinados e atmosfera ainda mais aterradora.",
    imagem: "https://via.placeholder.com/400x200.png?text=Resident+Evil+4",
    data: "21 Mai 2025",
    categoria: "Remake"
  }
];

// Função para cores das categorias
const getCategoriaColor = (categoria: string) => {
  switch (categoria) {
    case "Lançamento":
      return typeof colors.blue[600] === 'string' ? colors.blue[600] : '#2563EB';
    case "Atualização":
      return colors.red[600] === 'string' ? colors.red[600] : '#DC2626';
    case "DLC":
      return colors.green[600] === 'string' ? colors.green[600] : '#16A34A';
    case "Evento":
      return colors.purple[600] === 'string' ? colors.purple[600] : '#A855F7';
    case "Anúncio":
      return colors.blue[500] === 'string' ? colors.blue[500] : '#15aaafff';
    default:
      return colors.gray[600];
  }
};

export default function NovidadesScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper-base.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
    <ScrollView style={styles.container}>
      {/* Título */}
      <Text style={styles.mainTitle}>Novidades Nuvix
        <Text style={styles.ponto}>.</Text>
      </Text>

      {/* Notícias principais */}
      <View style={styles.section}>
        {noticiasPrincipais.map((noticia) => (
          <TouchableOpacity
            key={noticia.id}
            style={styles.cardPrincipal}
            onPress={() => router.push("/catalogo" as any)}
          >
            <Image source={{ uri: noticia.imagem }} style={styles.imagePrincipal} />
            <View style={styles.info}>
              <Text style={[styles.categoria, { backgroundColor: getCategoriaColor(noticia.categoria) }]}>{noticia.categoria}</Text>
              <Text style={styles.titulo}>{noticia.titulo}</Text>
              <Text style={styles.descricao}>{noticia.descricao}</Text>
              <Text style={styles.botao}>Ir para o catálogo →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Outras notícias */}
      <View style={styles.section}>
        {outrasNoticias.map((noticia) => (
          <TouchableOpacity
            key={noticia.id}
            style={styles.cardOutras}
            onPress={() => router.push("/catalogo" as any)}
          >
            <Image source={{ uri: noticia.imagem }} style={styles.imageOutras} />
            <View style={styles.info}>
              <Text style={[styles.categoria, { backgroundColor: getCategoriaColor(noticia.categoria) }]}>{noticia.categoria}</Text>
              <Text style={styles.titulo}>{noticia.titulo}</Text>
              <Text style={styles.descricao}>{noticia.descricao}</Text>
              <Text style={styles.botao}>Ver no catálogo →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  mainTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    marginLeft:10,
  },
  section: {
    marginBottom: 24,
  },
  cardPrincipal: {
    backgroundColor: colors.gray[800],
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardOutras: {
    backgroundColor: colors.gray[800],
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },
  imagePrincipal: {
    width: "100%",
    height: 180,
  },
  imageOutras: {
    width: "100%",
    height: 140,
  },
  info: {
    padding: 10,
  },
  categoria: {
    color: colors.white,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 4,
    
  },

  titulo: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft:5,
  },
  descricao: {
    color: colors.gray[300],
    fontSize: 14,
    marginBottom: 6,
    marginLeft:5,
  },
  botao: {
    color:"#1E90FF",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft:5,
  },
   ponto: {
    color: "#00BFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginEnd: -5,
  }
});

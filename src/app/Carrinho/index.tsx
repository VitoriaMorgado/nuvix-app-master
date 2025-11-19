import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import axios from "axios"; // ✅ Descomente se for usar axios

export default function Carrinho() {
  const router = useRouter();

  type Item = {
    id: number;
    nome: string;
    empresa: string;
    preco: number;
    quantidade: number;
    imagem: { uri: string };
    selecionado: boolean;
  };

  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [cupom, setCupom] = useState("");

  // ✅ Exemplo de integração com backend
  useEffect(() => {
    async function carregarCarrinho() {
      try {
        // Exemplo com fetch
        // const response = await fetch("https://seu-backend.com/api/carrinho");
        // const data = await response.json();
        // setItens(data.itens);

        // Exemplo local temporário (mock)
        setItens([
          {
            id: 1,
            nome: "Lies of P",
            empresa: "NEOWIZ",
            preco: 249.9,
            quantidade: 1,
            imagem: {
              uri: "https://xboxwire.thesourcemediaassets.com/sites/8/2025/03/Lies-of-P-Overture-Key-Art-Wide-38540e3a23c761616681.jpg",
            },
            selecionado: false,
          },
          {
            id: 2,
            nome: "Cult of the Lamb",
            empresa: "Devolver",
            preco: 64.95,
            quantidade: 1,
            imagem: {
              uri: "https://metagalaxia.com.br/wp-content/uploads/2022/08/gamereview-cultofthelamb-switch-0.jpg",
            },
            selecionado: false,
          },
        ]);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar o carrinho.");
      } finally {
        setLoading(false);
      }
    }

    carregarCarrinho();
  }, []);

  const alterarQuantidade = (id: number, tipo: string) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade:
                tipo === "mais"
                  ? item.quantidade + 1
                  : item.quantidade > 1
                  ? item.quantidade - 1
                  : 1,
            }
          : item
      )
    );
  };

  const aplicarCupom = async () => {
    if (!cupom.trim()) return;
    try {
      // const response = await fetch("https://seu-backend.com/api/cupom", { method: "POST", body: JSON.stringify({ codigo: cupom }) });
      // const data = await response.json();
      Alert.alert("Cupom aplicado!", "Cupom de exemplo foi aplicado com sucesso!");
    } catch {
      Alert.alert("Erro", "Não foi possível validar o cupom.");
    }
  };

  const finalizarCompra = async () => {
    const selecionados = itens.filter((item) => item.selecionado);
    if (selecionados.length === 0)
      return Alert.alert("Aviso", "Selecione ao menos um item.");

    try {
      // const response = await fetch("https://seu-backend.com/api/checkout", { method: "POST", body: JSON.stringify({ itens: selecionados }) });
      // const data = await response.json();
      Alert.alert("Sucesso!", "Compra realizada com sucesso!");
      router.push("/");
    } catch {
      Alert.alert("Erro", "Não foi possível finalizar a compra.");
    }
  };

  const total = itens
    .filter((item) => item.selecionado)
    .reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00AEEF" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/wallpaper-base.png")}
      style={styles.background}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Carrinho</Text>
          <Text style={styles.count}>({itens.length})</Text>
        </View>

        {/* Itens */}
        {itens.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() =>
                setItens((prev) =>
                  prev.map((i) =>
                    i.id === item.id ? { ...i, selecionado: !i.selecionado } : i
                  )
                )
              }
            >
              <View
                style={[
                  styles.circle,
                  item.selecionado && styles.circleSelected,
                ]}
              />
            </TouchableOpacity>

            <Image source={item.imagem} style={styles.itemImage} />

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.nome}</Text>
              <Text style={styles.itemCompany}>{item.empresa}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.itemPrice}>
                  R$ {item.preco.toFixed(2).replace(".", ",")}
                </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => alterarQuantidade(item.id, "menos")}
                  >
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantidade}</Text>
                  <TouchableOpacity
                    onPress={() => alterarQuantidade(item.id, "mais")}
                  >
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <View style={styles.couponRow}>
          <MaterialIcons name="percent" size={20} color="#fff" />
          <Text style={styles.couponLabel}>Cupom Nuvix</Text>
          <TextInput
            placeholder="Insira o código"
            placeholderTextColor="#999"
            style={styles.couponInput}
            value={cupom}
            onChangeText={setCupom}
            onSubmitEditing={aplicarCupom}
          />
        </View>

        <View style={styles.totalRow}>
          <TouchableOpacity
            style={styles.checkboxFooter}
            onPress={() =>
              setItens((prev) =>
                prev.map((i) => ({ ...i, selecionado: !i.selecionado }))
              )
            }
          >
            <View style={styles.circle} />
          </TouchableOpacity>
          <Text style={styles.totalLabel}>Tudo</Text>
          <Text style={styles.totalPrice}>
            R$ {total.toFixed(2).replace(".", ",")}
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={finalizarCompra}
          >
            <Text style={styles.continueText}>
              Continuar ({itens.filter((i) => i.selecionado).length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 60,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 6,
    backgroundColor: "#019EC2",
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  count: {
    color: "#9EB3C2",
    fontSize: 13,
    marginLeft: 4,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    borderRadius: 10,
    marginBottom: 14,
    padding: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#019EC2",
  },
  circleSelected: {
    backgroundColor: "#019EC2",
  },
  itemImage: {
    width: 80,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  itemCompany: {
    color: "#9EB3C2",
    fontSize: 12,
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemPrice: {
    color: "#00AEEF",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityButton: {
    color: "#00AEEF",
    fontSize: 18,
    marginHorizontal: 4,
  },
  quantityText: {
    color: "#fff",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0A0A0A",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  couponLabel: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 13,
  },
  couponInput: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 2,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxFooter: {
    marginRight: 6,
  },
  totalLabel: {
    color: "#fff",
    fontSize: 13,
  },
  totalPrice: {
    color: "#00AEEF",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  continueButton: {
    backgroundColor: "#00AEEF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});

import { Stack } from "expo-router";
// ... suas importações de fontes
import React from "react"; // Adicione useCallback
import { AuthProvider } from "./context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      {/* backgroundColor no StatusBar ajuda a pintar o topo.
            translucent={false} garante que ele ocupe o espaço e pinte o fundo
        */}

      {/* contentStyle aqui garante que o container da Stack também seja preto
            evitando piscadas brancas na transição
        */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </AuthProvider>
  );
}

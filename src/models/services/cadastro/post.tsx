import { AUTH_TOKEN, BASE_URL } from "../../../app/config/api";

export async function makeCadastro({
  nome,
  email,
  senha,
}: {
  nome: string;
  email: string;
  senha: string;
}) {
  try {
    const res = await fetch(`${BASE_URL}/cadastro/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || data?.message || "Erro no cadastro");
    }

    return data; // ✅ já retorna o JSON processado
  } catch (error) {
    console.error("Erro no makeCadastro:", error);
    throw error;
  }
}

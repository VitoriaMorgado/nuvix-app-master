import { AUTH_TOKEN, BASE_URL } from "../../../app/config/api";

export async function makeLogin({
  email,
  senha,
}: {
  email: string;
  senha: string;
}) {
  try {
    const res = await fetch(`${BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || data?.message || "Erro no login");
    } else {
    }

    return data; // ✅ já retorna o JSON processado
  } catch (error) {
    throw error;
  }
}

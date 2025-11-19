// CLASSIFICAÇÕES ETÁRIAS BRASILEIRAS (com URLs de Ícones Padrão - Autoclassificação)
export const classificacoes = {
  L: {
    nome: "Livre",
    cor: "#00A859", // Verde
    icone:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/l_borda.png/@@images/image",
    texto: "LIVRE PARA TODOS OS PÚBLICOS",
  },
  6: {
    nome: "6 anos",
    cor: "#e00095ff", // Rosa
    icone:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/6_borda.png/@@images/image",
    texto: "NÃO RECOMENDADO PARA MENORES DE 6 ANOS",
  },
  10: {
    nome: "10 anos",
    cor: "#F7C600", // Amarelo
    icone:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/10_borda.png/@@images/image",
    texto: "NÃO RECOMENDADO PARA MENORES DE 10 ANOS",
  },
  12: {
    nome: "12 anos",
    cor: "#F28C00", // Laranja
    icone:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/12_borda.png/@@images/image",
    texto: "NÃO RECOMENDADO PARA MENORES DE 12 ANOS",
  },
  14: {
    nome: "14 anos",
    cor: "#E67800", // Laranja Escuro
    icone:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/14_borda.png/@@images/image",
    texto: "NÃO RECOMENDADO PARA MENORES DE 14 ANOS",
  },
  16: {
    nome: "16 anos",
    cor: "#E30000", // Vermelho
    icone:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/16_borda.png/@@images/image",
    texto: "NÃO RECOMENDADO PARA MENORES DE 16 ANOS",
  },
  18: {
    nome: "18 anos",
    cor: "#000000", // Preto
    icone:
      "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/18_borda.png/@@images/image",
    texto: "NÃO RECOMENDADO PARA MENORES DE 18 ANOS",
  },
} as const;

export type AgeRating = keyof typeof classificacoes;

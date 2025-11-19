export type IconLib = "Fontisto" | "Ionicons" | "MaterialIcons" | "Entypo";

export interface Feature {
  icon: string;
  lib?: IconLib;
  text: string;
}

export type Platform =
  | "PS4"
  | "PS5"
  | "Xbox"
  | "Switch"
  | "PC"
  | "Mobile"
  | string;

export type AgeRating = "L" | "10" | "12" | "14" | "16" | "18" | any; // PARA ACEITAR OUTROS TIPOS DE CLASSIFICAÇÃO

// --- NOVO: INTERFACE PARA EXPANSÕES ---
export interface Expansion {
  id: string;
  nome: string;
  empresa: string;
  preco: string;
  imagem: string; // URL da imagem da capa da expansão
}
// -------------------------------------

export interface Game {
  id: string;
  nome: string;
  descricao?: string;
  preco?: string;
  empresa?: string; // NOME DO FORNECEDOR DO JOGO , EMPRESA , DESENVOLVEDORA QUALQUER COISA
  codigo?: string; // CÓDIGO DE RESGATE, FAZER UM CODIGINHO
  imagem?: string; // //IMAGEM QUADRADINHA DO CATALOGO
  imagemcapa: string; // CAPA DP JOGO , AQUELA MAIS CUMPRIDINHA
  imagembanner?: string; // BANNER DO JOGO , O QUE VAI PRO FINDO LA NA PG DE DETALHE
  imagemexemplo1?: string; // IMAGENS DEMO 1
  imagemexemplo2?: string; // IMAGENS DEMO 2
  imagemexemplo3?: string; // IMAGENS DEMO 3
  categorias?: string[]; // CATEGORIAS
  classificacao?: AgeRating; // CLASSIFICAÇÃO DE IDADE
  info?: Feature[]; // INFORMAÇÕES ADICIONAIS, TIPO JOGADORES ETC, EH DA PÁGINA DE ID_JOGO
  avaliacao?: string; // AVALIAÇÃO DO JOGO TIPO 4.5
  expansoes?: Expansion[];
  // -----------------------------
}

export const seedGames: Game[] = [
  // ---| JOGOS//EXPANSÕES |---

  //CULT OF THE LAMB
  {
    id: "1",
    nome: "Cult of the Lamb",
    descricao:
      "Crie seu próprio culto em uma terra de falsos profetas, aventurando-se por regiões misteriosas e diversas para criar uma comunidade fiel de Seguidores da floresta e para propagar sua Palavra e se tornar o único culto verdadeiro.",
    preco: "R$64,95",
    empresa: "Devolver Digital",
    codigo: "CULT12345",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTrsnUTD9XNANFMBbn3q4LXldQQ73D2RSc_06PTvjDp5mkgkpBX3VlE9SDM3ryJpuCoDw&usqp=CAU",
    imagemcapa:
      "https://cdn.ome.lt/9A67V-ziKTfCpQ_BCK4gY-s-h90=/200x0/smart/extras/capas/cult_of_the_lamb_box_art.jpg",
    imagembanner: "https://i.ytimg.com/vi/tY1EYzn_5qY/maxresdefault.jpg",
    imagemexemplo1:
      "https://uploads.jovemnerd.com.br/wp-content/uploads/2022/08/cult_of_the_lamb_review_1__5vu672n.jpg",
    imagemexemplo2:
      "https://uploads.jovemnerd.com.br/wp-content/uploads/2022/08/cultofthelamb_review_3__54801fcw2.jpg",
    imagemexemplo3:
      "https://uploads.jovemnerd.com.br/wp-content/uploads/2022/08/cultofthelamb_review_6__xwc8gy.jpg",
    categorias: ["Estratégia", "Aventura", "Ação", "Casual"],
    classificacao: "12",
    avaliacao: "4.5",
    info: [
      { icon: "world-o", lib: "Fontisto", text: "Jogo offline habilitado" },
      { icon: "people-sharp", lib: "Ionicons", text: "2 jogadores" },
    ],

    expansoes: [
      {
        id: "1",
        nome: "Cult of the Lamb: Sinful Pack",
        empresa: "Devolver Digital",
        preco: "R$ 16,99",
        imagem:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgTX1i0w1Ux05uPOsPLMjCiUwLE7d13b8V7Q&s",
      },
      {
        id: "2",
        nome: "Cult of the Lamb: Woolhaven Pack",
        empresa: "Devolver Digital",
        preco: "R$ 24,99",
        imagem: "https://i.ytimg.com/vi/EehS0AGcLkc/maxresdefault.jpg",
      },
    ],
    // ---------------------------------------------

    //LIES OF P
  },
  {
    id: "2",
    nome: "Lies of P",
    descricao:
      "Lies of P é um jogo de ação e RPG ambientado em uma versão sombria e distorcida do conto clássico de Pinóquio. Os jogadores assumem o papel de Pinóquio, um autômato que busca se tornar humano em uma cidade decadente cheia de perigos, monstros e segredos. Com um sistema de combate desafiador e uma narrativa envolvente, Lies of P oferece uma experiência única para os fãs de jogos de ação e aventura.",
    preco: "R$249,90",
    empresa: "NEOWIZ",
    codigo: "LIES12345",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGYeEJwD3FIwVxbOouIugjzLryJ4GPPxTQ2Juvii0kFI0BOHOYkRR60kntuVTFmrfE2w&usqp=CAU",
    imagemcapa:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGYeEJwD3FIwVxbOouIugjzLryJ4GPPxTQ2Juvii0kFI0BOHOYkRR60kntuVTFmrfE2w&usqp=CAU",
    imagembanner:
      "https://www.adrenaline.com.br/wp-content/uploads/2024/03/lies-of-p-912x569.jpg",
    imagemexemplo1:
      "https://www.adrenaline.com.br/wp-content/uploads/2023/09/Lies-of-P-traz-bug-que-pode-quebrar-a-progressao-de-seu-Capitulo-2-912x569.jpg",
    imagemexemplo2:
      "https://cdn.ome.lt/Inl2v_YpNhKZWSCzOMFIZ5tYPcY=/770x0/smart/uploads/conteudo/fotos/lies-of-p-paisagem-sombria.jpg",
    imagemexemplo3: "https://i.ytimg.com/vi/jhQsYonkG8Q/maxresdefault.jpg",
    categorias: ["Ação", "Aventura", "RPG"],
    classificacao: "14",
    avaliacao: "4.7",
    info: [
      { icon: "game-controller", lib: "Ionicons", text: "Suporte a controle" },
      { icon: "world-o", lib: "Fontisto", text: "Campanha extensa" },
    ],
    expansoes: [], // Exemplo de jogo sem expansões
  },

  //ELDEN RING
  {
    id: "3",
    nome: "Hollow Knight: Silksong",
    descricao:
      "Silk Song é a sequência do jogo de ação e aventura metroidvania Hollow Knight, onde o jogador controla a protagonista Hornet. Ela é levada ao reino desconhecido de Pharloom e precisa escalar o mundo, desvendando segredos sobre sua natureza e seu passado enquanto enfrenta inimigos desafiadores.",
    preco: "R$ 59,99",
    empresa: "Team Cherry",
    codigo: "HOLLOW12345",
    imagem:
      "https://www.adrenaline.com.br/wp-content/uploads/2023/07/hollow-knight-silksong-capa-310x310.jpg",
    imagemcapa:
      "https://levelupnews.com.br/wp-content/uploads/2025/09/168b4281-d594-41cc-942d-9b3b54227dcb.jpg",
    imagembanner:
      "https://levelupnews.com.br/wp-content/uploads/2025/09/Hollow-Knight-Silksong-provocou-uma-re-revelar-na-noite-de-abertura.jpg.webp",
    imagemexemplo1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnNY_kfS9BQhhSt_JP1hE02Sk7EMt1_3hjdNjcY7arKH76Sxvg9axz7F-Cx4JhgOf1cU&usqp=CAU",
    imagemexemplo2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkUmgEq6PGQBf4rzKlnnrk5Kx9j_Yi6EAO-gQQjL7dxsjbGNJ0679zuvnsAT_Spjau7i4&usqp=CAU",
    imagemexemplo3:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-O-CrL_LtePmmU9u4eru8Fh-LLBwmxCZHL048_W6I0m0v2x9gg-AsLPhScEpQqCLoobw&usqp=CAU",

    categorias: ["Ação", "Aventura", "Indie"],
    classificacao: "16",
    avaliacao: "4.9",
    info: [
      { icon: "game-controller", lib: "Ionicons", text: "Suporte a controle" },
      { icon: "world-o", lib: "Fontisto", text: "Mundo expansivo" },
    ],
    expansoes: [
      {
        id: "exp1",
        nome: "Hollow Knight",
        empresa: "Team Cherry",
        preco: "R$ 39,99",
        imagem:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhXZYcIviKrpVYH1Wn6AsApBv4DHwROjVe5n_feQfHrLxrTweyPg4b8R-OBVeaeU5vHdw&usqp=CAU",
      },
    ],
  },
];

//RETURN DOS JOGOS SIMULADOS
export function getGamesLocal(): Promise<Game[]> {
  return Promise.resolve(seedGames);
}

//RETORNO DO JOGO POR ID
export function getGameByIdLocal(id: string): Promise<Game | undefined> {
  const found = seedGames.find((g) => g.id === id);
  return Promise.resolve(found);
}

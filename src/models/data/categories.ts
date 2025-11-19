import { getGamesLocal, Game } from "./game";

export async function getCategoriesLocal(): Promise<string[]> {
  const games: Game[] = await getGamesLocal();

  // EXTRAIR CATEGORIAS ÚNICAS
  const uniqueCategories = Array.from(
    new Set(
      games.flatMap((game) => game.categorias || [])
    )
  );

  //ADD CATEGORIA PADRÃO
  return ["Novidades Nuvix.", ...uniqueCategories];
}

//FILTRAR CATEGORIAS
export async function getGamesByCategory(category: string): Promise<Game[]> {
  const games: Game[] = await getGamesLocal();

  if (category === "Novidades Nuvix.") {
    return games;
  }

  return games.filter((game) =>
    game.categorias?.includes(category)
  );
}

export type PokemonItem = {
  title: string;
  category: "Card" | "etb" | "loose_pack" | "display";
  image: string;
  price: number;
  releaseYear: number;
  series: string;
  rarity?: string; 
};

export type Course = {
  title: string;
  category: string; 
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  image: string;
  duration: number; 
};
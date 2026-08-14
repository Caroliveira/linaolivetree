export const GARDEN_CATEGORIES: string[] = ['leituras', 'estudos', 'galeria', 'planos'] as const;

export type GardenCategory = typeof GARDEN_CATEGORIES[number];

export interface GardenNode {
  id: string;
  title: string;
  date: string;
  category: GardenCategory;
  excerpt: string;
  image?: string;
  content: string;
  slug: string;
  tags?: string[];
  externalUrl?: string;
}

export const CATEGORY_LABELS: Record<GardenCategory, string> = {
  leituras: 'Leituras & Anotações',
  estudos: 'Estudos Práticos',
  galeria: 'Galeria',
  planos: 'Planos',
};

export const getCategoryLabel = (category: string): string => {
  return CATEGORY_LABELS[category] || category;
};

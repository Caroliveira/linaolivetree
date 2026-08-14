export interface GardenNode {
  id: string;
  title: string;
  date: string;
  category: 'leituras' | 'estudos' | 'galeria' | 'planos';
  excerpt: string;
  image?: string;
  content: string;
  slug: string;
  tags?: string[];
  externalUrl?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  leituras: '📚 Leituras & Anotações',
  estudos: '📐 Estudos Práticos',
  galeria: '🖼️ Galeria',
  planos: '📋 Planos',
};

export const getCategoryLabel = (category: string): string => {
  return CATEGORY_LABELS[category] || category;
};

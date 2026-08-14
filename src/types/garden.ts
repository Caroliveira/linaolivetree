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

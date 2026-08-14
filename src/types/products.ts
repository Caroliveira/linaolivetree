export const PRODUCT_CATEGORIES = [
  'Coloring Book',
  'Ebook',
  'Children Book',
  'Digital Image',
  'Print on Demand',
] as const;

export const ALL_PRODUCTS_CATEGORY = 'All' as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  details?: string;
  features?: string[];
  amazonUrl?: string;
  etsyUrl?: string;
}

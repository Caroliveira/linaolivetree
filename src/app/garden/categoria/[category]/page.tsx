import type { Metadata } from 'next';
import { CategoryContent } from '../../../../components/garden/CategoryContent';
import { getAllGardenNodes } from '../../../../lib/garden';
import { notFound } from 'next/navigation';
import { CATEGORY_LABELS, GARDEN_CATEGORIES } from '../../../../types/garden';


export function generateStaticParams() {
  return GARDEN_CATEGORIES.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;

  if (!GARDEN_CATEGORIES.includes(category)) {
    return { title: 'Categoria Não Encontrada' };
  }

  return {
    title: `${CATEGORY_LABELS[category] || category} | Jardim Digital`,
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  if (!GARDEN_CATEGORIES.includes(category)) {
    notFound();
  }

  const allNodes = getAllGardenNodes();
  const categoryNodes = allNodes.filter(node => node.category === category);

  return <CategoryContent category={category} initialNodes={categoryNodes} />;
}

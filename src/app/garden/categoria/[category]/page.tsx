import type { Metadata } from 'next';
import { CategoryContent } from '../../../../components/garden/CategoryContent';
import { getAllGardenNodes } from '../../../../lib/garden';
import { notFound } from 'next/navigation';

const validCategories = ['leituras', 'estudos', 'galeria', 'planos'];

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  
  if (!validCategories.includes(category)) {
    return { title: 'Categoria Não Encontrada' };
  }

  const titles: Record<string, string> = {
    leituras: 'Leituras & Anotações',
    estudos: 'Estudos Práticos',
    galeria: 'Galeria & Croquis',
    planos: 'Planos',
  };

  return {
    title: `${titles[category] || category} | Jardim Digital`,
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  if (!validCategories.includes(category)) {
    notFound();
  }

  const allNodes = getAllGardenNodes();
  const categoryNodes = allNodes.filter(node => node.category === category);
  
  return <CategoryContent category={category} initialNodes={categoryNodes} />;
}

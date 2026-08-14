import type { Metadata } from 'next';
import { GardenDetailContent } from '../../../components/garden/GardenDetailContent';
import { getGardenNodeBySlug } from '../../../lib/garden';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const node = getGardenNodeBySlug(slug);
  
  if (!node) return { title: 'Note Not Found' };
  
  return {
    title: `${node.title} | Lina Olivetree`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = getGardenNodeBySlug(slug);
  
  if (!node) {
    notFound();
  }
  
  return <GardenDetailContent node={node} />;
}

import type { Metadata } from 'next';
import { HomeContent } from '../components/home/HomeContent';
import { getAllGardenNodes } from '../lib/garden';

export const metadata: Metadata = {
  title: 'Lina Olivetree | Jardim Digital',
  description: 'Diário de bordo de estudos, repertório e referências de Lina Olivetree.',
};

export default function Page() {
  const nodes = getAllGardenNodes();
  return <HomeContent initialNodes={nodes} />;
}

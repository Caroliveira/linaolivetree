import type { Metadata } from 'next';
import { DocsContent } from '../../components/docs/DocsContent';

export const metadata: Metadata = {
  title: 'Guia de Conteúdo | Lina Olivetree',
  description: 'Instruções e diretrizes de inserção de conteúdo para o Jardim Digital.',
};

export default function Page() {
  return <DocsContent />;
}

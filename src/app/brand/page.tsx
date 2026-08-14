import type { Metadata } from 'next';
import { BrandContent } from '../../components/brand/BrandContent';

export const metadata: Metadata = {
  title: 'The Brand | Lina Olivetree',
};

export default function Page() {
  return <BrandContent />;
}

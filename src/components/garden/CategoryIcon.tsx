import React from 'react';
import { BookOpen, Ruler, Image, ClipboardList, type LucideProps } from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  category: string;
}

export const CategoryIcon = ({ category, ...props }: CategoryIconProps) => {
  switch (category) {
    case 'leituras':
      return <BookOpen {...props} />;
    case 'estudos':
      return <Ruler {...props} />;
    case 'galeria':
      return <Image {...props} />;
    case 'planos':
      return <ClipboardList {...props} />;
    default:
      return null;
  }
};

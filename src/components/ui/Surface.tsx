import { ReactNode } from 'react';

interface SurfaceProps {
  children: ReactNode;
  variant?: 'white' | 'cream' | 'olive';
  decoration?: 'grid' | 'lined' | 'none';
  hasBorder?: boolean;
  hasWashiTape?: boolean;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Surface = ({
  children,
  variant = 'white',
  decoration = 'none',
  hasBorder = true,
  hasWashiTape = false,
  className = '',
  padding = 'md',
}: SurfaceProps) => {
  const bgStyles = {
    white: 'bg-white',
    cream: 'bg-cream',
    olive: 'bg-olive text-cream',
  };

  const decorationStyles = {
    grid: 'grid-paper',
    lined: 'lined-paper',
    none: '',
  };

  const pStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12 md:p-16',
  };

  return (
    <div
      className={`
        relative shadow-xl transition-all duration-300
        ${bgStyles[variant]}
        ${decorationStyles[decoration]}
        ${hasBorder ? 'hand-drawn-border' : ''}
        ${hasWashiTape ? 'washi-tape' : ''}
        ${pStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

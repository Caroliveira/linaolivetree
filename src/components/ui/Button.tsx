import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  color?: 'olive' | 'terracotta';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  variant = 'primary',
  color = 'olive',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs uppercase tracking-widest',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const colorStyles = {
    olive: {
      primary: 'bg-olive text-cream hover:bg-olive-light shadow-lg hover:shadow-olive/20 disabled:hover:bg-olive disabled:hover:shadow-lg',
      secondary: 'bg-cream text-olive hover:bg-white disabled:hover:bg-cream',
      outline: 'border-2 border-olive text-olive hover:bg-olive hover:text-cream disabled:hover:bg-transparent disabled:hover:text-olive',
      ghost: 'text-olive hover:bg-olive/10 disabled:hover:bg-transparent',
    },
    terracotta: {
      primary: 'bg-terracotta text-cream hover:bg-terracotta-light shadow-lg hover:shadow-terracotta/20 disabled:hover:bg-terracotta disabled:hover:shadow-lg',
      secondary: 'bg-terracotta/10 text-terracotta hover:bg-terracotta/20 disabled:hover:bg-terracotta/10',
      outline: 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-cream disabled:hover:bg-transparent disabled:hover:text-terracotta',
      ghost: 'text-terracotta hover:bg-terracotta/10 disabled:hover:bg-transparent',
    },
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${colorStyles[color][variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  );
};

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

import { usePathname } from 'next/navigation';

interface LogoProps {
  logoOnly?: boolean;
}

export const Logo = ({ logoOnly }: LogoProps) => {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex items-center gap-3 group cursor-pointer no-underline"
    >
      <motion.div
        whileHover={{ rotate: 8, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="relative shrink-0"
      >
        <Image
          src="/logo.png"
          alt="Lina Olivetree logo"
          width={44}
          height={44}
          className="h-11 w-11 drop-shadow-sm shrink-0"
          priority
        />
      </motion.div>
      {!logoOnly && (
        <span className="font-serif text-2xl font-bold tracking-tight text-olive">Lina Olivetree</span>
      )}
    </Link>
  )
};

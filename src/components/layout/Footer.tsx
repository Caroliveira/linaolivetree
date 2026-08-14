"use client";

import { Instagram, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer = () => {
  return (
    <footer className="bg-olive text-cream pb-8 pt-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <Logo logoOnly />
          <p className="text-cream/60 max-w-sm text-sm border-t md:border-t-0 md:border-l border-cream/10 pt-4 md:pt-0 md:pl-6 mt-1">
            Lina Olivetree é um diário de bordo digital de estudos, repertório e referências visuais de design e arquitetura.
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/linaolivetree/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Siga Lina Olivetree no Instagram"
            className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="mailto:hello@linaolivetree.com"
            className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
            aria-label="Email Lina Olivetree"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-cream/10 flex justify-center items-center text-sm text-cream/40">
        <p>© 2026 linaolivetree.</p>
      </div>
    </footer>
  );
};

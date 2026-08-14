"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Logo } from '../common/Logo';
import { SearchOverlay } from '../common/SearchOverlay';

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-cream/80 backdrop-blur-md shadow-sm py-3 border-b border-olive/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo />

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-olive/10 rounded-full transition-colors cursor-pointer text-olive"
            aria-label="Buscar no Jardim"
          >
            <Search size={20} />
          </button>
        </div>
      </nav>
    </>
  );
};

"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getCategoryLabel, GARDEN_CATEGORIES } from '../../types/garden';
import { CategoryIcon } from '../garden/CategoryIcon';

interface SearchNode {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  tags?: string[];
  externalUrl?: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [nodes, setNodes] = useState<SearchNode[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const usedTags = useMemo(() => {
    const counts = new Map<string, number>();
    const casing = new Map<string, string>();

    for (const tag of nodes.flatMap((n) => n.tags || [])) {
      const trimmed = tag.trim();
      if (!trimmed) continue;

      const normalized = trimmed.toLowerCase();
      counts.set(normalized, (counts.get(normalized) || 0) + 1);

      if (!casing.has(normalized) || (trimmed[0] === trimmed[0].toUpperCase() && casing.get(normalized)![0] !== trimmed[0])) {
        casing.set(normalized, trimmed);
      }
    }

    return Array.from(counts.keys())
      .sort((a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b))
      .map((normalized) => casing.get(normalized)!)
      .slice(0, 10);
  }, [nodes]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';

      setLoading(true);
      fetch('/api/garden')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setNodes(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching garden search index:', err);
          setLoading(false);
        });
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filteredNodes = nodes.filter((node) => {
    const q = query.toLowerCase();
    return (
      node.title.toLowerCase().includes(q) ||
      node.excerpt.toLowerCase().includes(q) ||
      (node.tags && node.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-cream/98 flex flex-col grid-paper"
        >
          <div className="max-w-4xl mx-auto w-full px-6 pt-24">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif italic text-olive font-bold">Buscar</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-olive/10 rounded-full transition-colors text-olive cursor-pointer"
                aria-label="Fechar busca"
              >
                <X size={32} />
              </button>
            </div>

            <div className="relative mb-10">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-olive/40" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Explorar o jardim..."
                aria-label="Buscar conteúdo"
                className="w-full bg-white px-16 py-5 text-xl font-sans focus:outline-none focus:border-terracotta/40 transition-colors shadow-md border border-olive/10"
              />
            </div>

            <div className="overflow-y-auto max-h-[60vh] pb-12 pr-4 custom-scrollbar space-y-10">
              {loading ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-olive/40 italic font-sans animate-pulse">Carregando notas do ateliê...</p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                    {['w-20', 'w-24', 'w-16', 'w-28', 'w-20', 'w-24'].map((widthClass, i) => (
                      <div
                        key={i}
                        className={`h-7 ${widthClass} bg-olive/10 animate-pulse border border-olive/5`}
                      />
                    ))}
                  </div>
                </div>
              ) : query.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-10">
                  {GARDEN_CATEGORIES.map((cat) => {
                    const catNodes = filteredNodes.filter((node) => node.category === cat);
                    if (catNodes.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-olive/40 border-b border-olive/10 pb-2 flex items-center gap-1.5">
                          <CategoryIcon category={cat} size={14} className="text-terracotta/70 shrink-0" />
                          {getCategoryLabel(cat)}
                        </h3>
                        <div className="space-y-3">
                          {catNodes.map((node) => {
                            const isExternal = !!node.externalUrl;
                            return (
                              <div
                                key={node.id}
                                className="p-3 bg-white hover:bg-white/80 border border-olive/5 hover:border-olive/10 shadow-sm transition-all group relative"
                              >
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-terracotta/45" />
                                {isExternal ? (
                                  <a
                                    href={node.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={onClose}
                                    className="flex items-center justify-between text-base font-serif font-bold text-olive group-hover:text-terracotta transition-colors pl-2"
                                  >
                                    <span className="flex items-center gap-1">
                                      {node.title}
                                      <ExternalLink size={12} className="opacity-65" />
                                    </span>
                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                  </a>
                                ) : (
                                  <Link
                                    href={`/garden/${node.slug}`}
                                    onClick={onClose}
                                    className="flex items-center justify-between text-base font-serif font-bold text-olive group-hover:text-terracotta transition-colors pl-2"
                                  >
                                    <span>{node.title}</span>
                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                  </Link>
                                )}
                                <p className="text-xs text-olive/60 mt-1 font-sans pl-2 line-clamp-1">
                                  {node.excerpt}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {filteredNodes.length === 0 && (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-olive/40 italic font-sans">Nenhuma anotação encontrada para sua busca.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <p className="text-olive/40 italic font-sans">Comece a digitar para ver os resultados...</p>
                  {usedTags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                      {usedTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 bg-white border border-olive/10 hover:border-olive/20 text-xs text-olive transition-colors cursor-pointer hover:bg-cream/40"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

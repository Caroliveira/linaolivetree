"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Calendar, Tag, ExternalLink } from 'lucide-react';
import { getCategoryLabel } from '../../types/garden';
import type { GardenNode } from '../../types/garden';

interface CategoryContentProps {
  category: string;
  initialNodes: GardenNode[];
}

export const CategoryContent = ({ category, initialNodes }: CategoryContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(initialNodes.flatMap((node) => node.tags || []))
  );

  const filteredNodes = initialNodes.filter((node) => {
    const matchesSearch =
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (node.tags && node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesTag = selectedTag ? node.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  } as const;

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6 relative">
      <div className="absolute inset-0 grid-paper opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-olive/60 hover:text-terracotta transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Voltar ao Jardim
          </Link>
        </div>

        <header className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-olive italic">
            {getCategoryLabel(category)}
          </h1>
          <p className="text-sm font-mono text-olive/50 uppercase tracking-[0.18em]">
            Histórico completo • {initialNodes.length} {initialNodes.length === 1 ? 'item' : 'itens'}
          </p>
        </header>

        <section className="bg-white border border-olive/10 p-6 shadow-sm space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-olive/40">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder={`Filtrar ${getCategoryLabel(category).split(' ').slice(1).join(' ')} por título ou tag...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-cream/35 border border-olive/10 focus:border-terracotta/40 focus:outline-none text-sm text-olive font-sans placeholder:text-olive/35 transition-colors"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-olive/40 mr-2">Tags:</span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-[11px] px-2.5 py-1 border transition-all ${!selectedTag
                    ? 'bg-olive border-olive text-cream font-medium'
                    : 'bg-transparent border-olive/10 text-olive/70 hover:border-olive/20'
                  }`}
              >
                Tudo
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`text-[11px] px-2.5 py-1 border transition-all ${tag === selectedTag
                      ? 'bg-terracotta border-terracotta text-cream font-medium'
                      : 'bg-transparent border-olive/10 text-olive/70 hover:border-olive/20'
                    }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </section>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {filteredNodes.length === 0 ? (
            <div className="text-center py-16 bg-white/40 border border-dashed border-olive/10">
              <p className="text-sm italic text-olive/40 font-sans">Nenhuma anotação corresponde aos filtros de busca.</p>
            </div>
          ) : (
            filteredNodes.map((node) => {
              const isExternal = !!node.externalUrl;
              return (
                <motion.article
                  key={node.id}
                  variants={itemVariants}
                  className="bg-white border border-olive/10 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-terracotta/40" />

                  <div className="space-y-3 pl-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-olive/40 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {node.date}
                      </span>
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-olive">
                      {isExternal ? (
                        <a
                          href={node.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-terracotta transition-colors inline-flex items-center gap-1.5 underline decoration-olive/10 hover:decoration-terracotta underline-offset-4"
                        >
                          {node.title}
                          <ExternalLink size={14} className="opacity-65 shrink-0" />
                        </a>
                      ) : (
                        <Link
                          href={`/garden/${node.slug}`}
                          className="hover:text-terracotta transition-colors underline decoration-olive/10 hover:decoration-terracotta underline-offset-4"
                        >
                          {node.title}
                        </Link>
                      )}
                    </h2>

                    <p className="text-sm md:text-base text-olive/75 leading-relaxed font-sans">
                      {node.excerpt}
                    </p>

                    {node.tags && node.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {node.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider bg-olive/5 text-olive/60 px-2 py-0.5 rounded border border-olive/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
};

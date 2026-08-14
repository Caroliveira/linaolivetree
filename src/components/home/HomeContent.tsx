"use client";

import { motion } from 'motion/react';
import Link from 'next/link';
import { ExternalLink, Calendar, Tag, Sprout } from 'lucide-react';
import type { GardenNode } from '../../types/garden';

interface HomeContentProps {
  initialNodes: GardenNode[];
}

export const HomeContent = ({ initialNodes }: HomeContentProps) => {
  // Group nodes by category
  const categories = [
    { id: 'leituras', title: '📚 Leituras & Anotações' },
    { id: 'estudos', title: '📐 Estudos Práticos' },
    { id: 'galeria', title: '🖼️ Galeria / Croquis' },
    { id: 'planos', title: '📋 Planos' },
  ] as const;

  const getNodesByCategory = (catId: string) => {
    return initialNodes.filter((node) => node.category === catId);
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
  } as const;

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden pt-28 pb-24 px-6">
      {/* Background visual cues */}
      <div className="absolute inset-0 grid-paper opacity-25 pointer-events-none" />
      <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-olive/5 blur-3xl pointer-events-none" />
      <div className="absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-terracotta/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header Section */}
        <header className="text-center space-y-6 max-w-3xl mx-auto pt-8">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-olive/20" />
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-olive/50">Jardim Digital</span>
            <span className="w-8 h-[1px] bg-olive/20" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-olive leading-tight max-w-2xl mx-auto">
            Um <span className="italic text-terracotta">espaço vivo</span> de planos, leituras, registros e <span className="italic text-terracotta">estudos</span>.
          </h1>
          <div className="w-16 h-[1px] bg-olive/15 mx-auto" />
        </header>

        {/* Digital Garden Grid (4 Category Cards) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8"
        >
          {categories.map((cat, index) => {
            const allCatNodes = getNodesByCategory(cat.id);
            const topNodes = allCatNodes.slice(0, 2); // Display only top 2 recent items

            // Dynamic rotation values to make it look like stacked sketchbooks on a table
            const rotations = ['rotate-[-0.5deg]', 'rotate-[0.5deg]', 'rotate-[0.8deg]', 'rotate-[-0.8deg]'];
            const rotClass = rotations[index % rotations.length];

            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                className={`washi-tape group ${rotClass} transition-transform duration-300 hover:rotate-0`}
              >
                <div className="bg-white border border-olive/10 shadow-md p-6 md:p-8 min-h-[360px] flex flex-col justify-between relative overflow-hidden">
                  {/* Internal grid paper design token for paper feeling */}
                  <div className="absolute inset-0 grid-paper opacity-[0.06] pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-olive border-b border-olive/10 pb-3.5 flex items-center justify-between">
                      <span>{cat.title}</span>
                      <span className="text-xs font-mono bg-olive/5 text-olive/60 px-2 py-0.5 rounded border border-olive/5">
                        {allCatNodes.length} {allCatNodes.length === 1 ? 'item' : 'itens'}
                      </span>
                    </h2>

                    {topNodes.length === 0 ? (
                      <p className="text-sm italic text-olive/40 py-8 text-center font-sans">
                        Nenhum registro encontrado...
                      </p>
                    ) : (
                      <ul className="space-y-5">
                        {topNodes.map((node) => {
                          const isExternal = !!node.externalUrl;

                          return (
                            <li key={node.id} className="space-y-1">
                              <div className="flex items-start justify-between gap-4">
                                {isExternal ? (
                                  <a
                                    href={node.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base md:text-lg font-serif font-semibold hover:text-terracotta leading-snug transition-colors flex items-center gap-1.5 underline underline-offset-4 decoration-olive/10 hover:decoration-terracotta"
                                  >
                                    {node.title}
                                    <ExternalLink size={13} className="opacity-65 shrink-0" />
                                  </a>
                                ) : (
                                  <Link
                                    href={`/garden/${node.slug}`}
                                    className="text-base md:text-lg font-serif font-semibold hover:text-terracotta leading-snug transition-colors underline underline-offset-4 decoration-olive/10 hover:decoration-terracotta"
                                  >
                                    {node.title}
                                  </Link>
                                )}
                              </div>
                              <p className="text-xs md:text-sm text-olive/65 font-sans leading-relaxed line-clamp-2">
                                {node.excerpt}
                              </p>

                              {/* Meta information: Date & Tags */}
                              <div className="flex items-center gap-3 pt-0.5 text-[10px] font-mono text-olive/40 uppercase tracking-wider">
                                <span className="flex items-center gap-1">
                                  <Calendar size={10} /> {node.date}
                                </span>
                                {node.tags && node.tags.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <Tag size={10} /> {node.tags.slice(0, 2).map(t => `#${t}`).join(' ')}
                                    </span>
                                  </>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* Histórico link & plot name */}
                  <div className="pt-5 border-t border-olive/10 flex justify-between items-center mt-6 relative z-10">
                    <Link
                      href={`/garden/categoria/${cat.id}`}
                      className="text-[11px] font-mono uppercase tracking-[0.16em] text-terracotta hover:text-olive hover:underline transition-colors"
                    >
                      Histórico completo →
                    </Link>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-olive/25">
                      🌿 {cat.id} plot
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { GardenNode } from '../../types/garden';

interface GardenDetailContentProps {
  node: GardenNode;
}

export const GardenDetailContent = ({ node }: GardenDetailContentProps) => {
  const renderContent = () => {
    // Split content by paragraphs/lines
    const lines = node.content.split('\n').map(l => l.trim()).filter(l => l !== '');
    const processedChunks: any[] = [];
    let currentImageGroup: any[] = [];

    lines.forEach((line) => {
      // Image detection: ![alt](src)
      if (line.startsWith('![')) {
        const match = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          currentImageGroup.push({ alt: match[1], src: match[2] });
          return;
        }
      }

      // Flush images if we hit text
      if (currentImageGroup.length > 0) {
        processedChunks.push({ type: 'images', items: currentImageGroup });
        currentImageGroup = [];
      }

      processedChunks.push({ type: 'text', content: line });
    });

    // Final flush
    if (currentImageGroup.length > 0) {
      processedChunks.push({ type: 'images', items: currentImageGroup });
    }

    return (
      <div className="space-y-8">
        {processedChunks.map((chunk, i) => {
          if (chunk.type === 'images') {
            return (
              <div key={i} className={`grid ${chunk.items.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-6 my-12`}>
                {chunk.items.map((img: any, idx: number) => (
                  <div
                    key={idx}
                    className={`aspect-video overflow-hidden hand-drawn-border p-3 bg-white shadow-lg relative ${
                      idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
                    }`}
                  >
                    <Image fill src={img.src} alt={img.alt} className="object-cover p-1" />
                  </div>
                ))}
              </div>
            );
          }

          const p = chunk.content;

          // Markdown Extension: Literary Quote
          if (p.startsWith('|')) {
            return (
              <blockquote
                key={i}
                className="border-l-4 border-terracotta pl-6 italic text-2xl text-olive my-12 font-serif leading-relaxed"
              >
                {p.replace('|', '').trim()}
              </blockquote>
            );
          }

          // Markdown Extension: Studio Note (Post-it)
          if (p.startsWith('>')) {
            return (
              <div key={i} className="washi-tape my-12 mx-auto w-fit max-w-[90%] md:max-w-md">
                <div className="post-it rotate-1 text-center py-6 px-10">
                  <p className="text-xl font-hand text-olive/80 leading-relaxed">
                    {p.replace('>', '').trim()}
                  </p>
                </div>
              </div>
            );
          }

          // Regular paragraph (first paragraph gets drop cap for styling)
          const isFirst = i === 0;
          return (
            <p
              key={i}
              className={`text-lg md:text-xl leading-loose text-olive/80 font-sans ${
                isFirst
                  ? 'first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-terracotta first-letter:leading-[0.85]'
                  : ''
              }`}
            >
              {p}
            </p>
          );
        })}
      </div>
    );
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'leituras':
        return '📚 Leituras & Anotações';
      case 'estudos':
        return '📐 Estudos Práticos';
      case 'galeria':
        return '🖼️ Galeria / Croquis';
      case 'links':
        return '🔗 Links Úteis';
      default:
        return category;
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 overflow-hidden min-h-screen bg-cream">
      <article className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', damping: 20 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-olive/60 hover:text-terracotta transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Voltar ao Jardim
          </Link>

          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.18em] text-olive/50">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> {node.date}
              </span>
              <span className="w-1.5 h-1.5 bg-olive/20 rounded-full" />
              <span className="flex items-center gap-1.5 text-terracotta font-medium">
                <Tag size={13} /> {getCategoryLabel(node.category)}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] text-olive italic">
              {node.title}
            </h1>
            
            {node.tags && node.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {node.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-widest bg-olive/5 border border-olive/10 text-olive px-2.5 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {node.image && (
            <div className="relative aspect-video overflow-hidden mb-12 hand-drawn-border bg-white p-3 shadow-xl rotate-0.5">
              <Image
                src={node.image}
                alt={node.title}
                fill
                className="object-cover p-1"
                priority
              />
            </div>
          )}

          <div className="lined-paper p-8 md:p-14 border border-olive/10 bg-white shadow-sm mb-16 relative">
            <div className="absolute top-0 left-8 bottom-0 w-[1px] bg-red-200/50" /> {/* Margem do caderno */}
            <div className="prose prose-olive max-w-none pl-8">
              {renderContent()}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

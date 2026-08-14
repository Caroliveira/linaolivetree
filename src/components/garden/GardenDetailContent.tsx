"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { preprocessMarkdown } from './markdown.utils';
import { customComponents } from './MarkdownComponents';
import { getCategoryLabel } from '../../types/garden';
import type { GardenNode } from '../../types/garden';

interface GardenDetailContentProps {
  node: GardenNode;
}

export const GardenDetailContent = ({ node }: GardenDetailContentProps) => {
  const preprocessedContent = useMemo(() => {
    return preprocessMarkdown(node.content);
  }, [node.content]);

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
                sizes="(max-w-768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="lined-paper p-[2rem] md:p-[4rem] pt-[2.2rem] md:pt-[4.2rem] border border-olive/10 bg-white shadow-sm mb-16 relative">
            <div className="absolute top-0 left-8 bottom-0 w-[1px] bg-red-200/50" />

            <div className="pl-8 text-olive [&>p:first-of-type]:first-letter:text-[4rem] [&>p:first-of-type]:first-letter:leading-[3.5rem] [&>p:first-of-type]:first-letter:h-[4rem] [&>p:first-of-type]:first-letter:mt-[0.25rem] [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:text-terracotta">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={customComponents}
              >
                {preprocessedContent}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

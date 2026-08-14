"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { GardenNode } from '../../types/garden';

interface GardenDetailContentProps {
  node: GardenNode;
}

export const GardenDetailContent = ({ node }: GardenDetailContentProps) => {
  // Helper to extract text from nested React nodes
  const getReactText = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getReactText).join('');
    if (node.props) {
      if (node.props.children) return getReactText(node.props.children);
    }
    return '';
  };

  // Helper to recursively remove a string prefix from the first text node in a React tree
  const removePrefixFromReactNodes = (nodes: any, prefix: string): any => {
    if (!nodes) return null;

    if (typeof nodes === 'string') {
      if (nodes.includes(prefix)) {
        const stripped = nodes.replace(prefix, '');
        // Clean leading space if any
        return stripped.trimStart();
      }
      return nodes;
    }

    if (Array.isArray(nodes)) {
      return nodes.map(node => removePrefixFromReactNodes(node, prefix));
    }

    if (nodes.props && nodes.props.children) {
      const updatedChildren = removePrefixFromReactNodes(nodes.props.children, prefix);
      return React.cloneElement(nodes, { ...nodes.props, children: updatedChildren });
    }

    return nodes;
  };

  // Preprocessor to convert custom styling syntax to blockquote markers
  const preprocessMarkdown = (content: string) => {
    let inQuote = false;
    let inPostit = false;

    return content
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();

        // Exclude table lines (they contain multiple pipes) from being parsed as quotes
        const countOr = (line.match(/\|/g) || []).length;
        if (countOr > 1) {
          inQuote = false;
          inPostit = false;
          return line;
        }

        if (trimmed.startsWith('|')) {
          inPostit = false;
          if (!inQuote) {
            inQuote = true;
            return `> [QUOTE] ${trimmed.substring(1).trim()}`;
          }
          return `> ${trimmed.substring(1).trim()}`;
        }

        if (trimmed.startsWith('>')) {
          inQuote = false;
          if (!inPostit) {
            inPostit = true;
            return `> [POSTIT] ${trimmed.substring(1).trim()}`;
          }
          return `> ${trimmed.substring(1).trim()}`;
        }

        // Reset context state on empty lines or standard text
        if (trimmed === '') {
          inQuote = false;
          inPostit = false;
        }
        return line;
      })
      .join('\n');
  };

  const customComponents = {
    // Custom blockquote component for Quotes and Post-its
    blockquote: ({ children }: any) => {
      const rawText = getReactText(children);

      if (rawText.trimStart().startsWith('[QUOTE]')) {
        const cleanChildren = removePrefixFromReactNodes(children, '[QUOTE]');
        return (
          <blockquote className="border-l-4 border-terracotta pl-6 italic text-xl md:text-2xl text-olive my-[2rem] font-serif leading-[2rem]">
            {cleanChildren}
          </blockquote>
        );
      }

      if (rawText.trimStart().startsWith('[POSTIT]')) {
        const cleanChildren = removePrefixFromReactNodes(children, '[POSTIT]');
        return (
          <div className="washi-tape my-[2rem] mx-auto w-fit max-w-[95%] md:max-w-md">
            <div className="post-it rotate-1 text-center py-6 px-10">
              <div className="text-lg md:text-xl font-hand text-olive/80 leading-relaxed">
                {cleanChildren}
              </div>
            </div>
          </div>
        );
      }

      // Default blockquote styling fallback aligned to baseline
      return (
        <blockquote className="border-l-4 border-olive/20 pl-6 italic text-olive/70 my-[2rem] leading-[2rem]">
          {children}
        </blockquote>
      );
    },

    // Styled paragraphs mathematically aligned to the 2rem notebook lines
    p: ({ children }: any) => {
      // Avoid wrapping images in paragraphs to maintain styling control
      const hasImage = React.Children.toArray(children).some(
        (child: any) => child?.type === 'img' || child?.props?.src
      );

      if (hasImage) {
        return <>{children}</>;
      }

      return (
        <p className="text-base md:text-lg leading-[2rem] text-olive/85 mb-[2rem] align-baseline">
          {children}
        </p>
      );
    },

    // Custom headers and dividers mapped to baseline grid without skipping lines below them
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-olive mt-[2rem] mb-0 leading-[2rem] border-b border-olive/10 pb-[2px]">
        {children}
      </h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="text-lg md:text-xl font-serif font-bold text-olive mt-[2rem] mb-0 leading-[2rem]">
        {children}
      </h3>
    ),

    // Beautiful stationery style list elements aligned to grid
    ul: ({ children }: any) => (
      <ul className="list-disc space-y-0 mb-[2rem] pl-6 text-olive/85 font-sans text-base md:text-lg marker:text-terracotta leading-[2rem]">
        {children}
      </ul>
    ),

    ol: ({ children }: any) => (
      <ol className="list-decimal space-y-0 mb-[2rem] pl-6 text-olive/85 font-sans text-base md:text-lg marker:text-terracotta leading-[2rem]">
        {children}
      </ol>
    ),

    li: ({ children }: any) => (
      <li className="leading-[2rem]">
        {children}
      </li>
    ),

    // Polaroid picture frame layout aligned to baseline
    img: ({ src, alt }: any) => (
      <div className="relative w-full aspect-video overflow-hidden my-[2rem] hand-drawn-border bg-white p-3 shadow-xl rotate-0.5">
        <Image
          src={src || ''}
          alt={alt || ''}
          fill
          className="object-cover p-1"
          sizes="(max-w-768px) 100vw, 800px"
        />
      </div>
    ),

    // Styled tables (highly requested to support logs and index sheets) aligned to baseline
    table: ({ children }: any) => (
      <div className="overflow-x-auto w-full my-[2rem]">
        <table className="w-full border-collapse border border-olive/15 text-left text-sm md:text-base bg-white/40 leading-[2rem]">
          {children}
        </table>
      </div>
    ),

    thead: ({ children }: any) => (
      <thead className="bg-cream/40 border-b border-olive/15 leading-[2rem]">
        {children}
      </thead>
    ),

    th: ({ children }: any) => (
      <th className="border border-olive/15 p-3.5 font-serif font-bold text-olive leading-[2rem]">
        {children}
      </th>
    ),

    td: ({ children }: any) => (
      <td className="border border-olive/15 p-3 text-olive/80 font-sans leading-[2rem]">
        {children}
      </td>
    ),

    tr: ({ children }: any) => (
      <tr className="hover:bg-cream/15 transition-colors leading-[2rem]">
        {children}
      </tr>
    ),

    // Inlined and block code snippet overrides aligned to baseline
    pre: ({ children }: any) => (
      <pre className="bg-cream/30 border border-olive/15 p-5 overflow-x-auto my-[2rem] text-xs md:text-sm font-mono text-olive/85 rounded-sm leading-[2rem]">
        {children}
      </pre>
    ),

    code: ({ children }: any) => (
      <code className="bg-olive/5 px-1.5 py-0.5 rounded-sm text-xs font-mono text-terracotta font-semibold">
        {children}
      </code>
    ),
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'leituras':
        return '📚 Leituras & Anotações';
      case 'estudos':
        return '📐 Estudos Práticos';
      case 'galeria':
        return '🖼️ Galeria / Croquis';
      case 'planos':
        return '📋 Planos';
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
                sizes="(max-w-768px) 100vw, 800px"
              />
            </div>
          )}

          {/* Lined paper container: mathematically padded to align baseline grid */}
          <div className="lined-paper p-[2rem] md:p-[4rem] pt-[2.2rem] md:pt-[4.2rem] border border-olive/10 bg-white shadow-sm mb-16 relative">
            <div className="absolute top-0 left-8 bottom-0 w-[1px] bg-red-200/50" /> {/* Margem do caderno */}

            {/* Pure CSS Dropcap rule applied to the first paragraph child of the markdown body */}
            <div className="pl-8 text-olive [&>p:first-of-type]:first-letter:text-[4rem] [&>p:first-of-type]:first-letter:leading-[3.5rem] [&>p:first-of-type]:first-letter:h-[4rem] [&>p:first-of-type]:first-letter:mt-[0.25rem] [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:text-terracotta">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={customComponents as any}
              >
                {preprocessMarkdown(node.content)}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

import React from 'react';
import Image from 'next/image';
import type { Components } from 'react-markdown';
import { getReactText, removePrefixFromReactNodes } from './markdown.utils';

export const customComponents: Components = {
  blockquote: ({ children }) => {
    const rawText = getReactText(children);
    
    if (rawText.trimStart().startsWith('[QUOTE]')) {
      const cleanChildren = removePrefixFromReactNodes(children, '[QUOTE]');
      return (
        <blockquote className="border-l-4 border-terracotta pl-6 italic text-xl md:text-2xl text-olive my-8 font-serif leading-[2rem]">
          {cleanChildren}
        </blockquote>
      );
    }
    
    if (rawText.trimStart().startsWith('[POSTIT]')) {
      const cleanChildren = removePrefixFromReactNodes(children, '[POSTIT]');
      return (
        <div className="washi-tape my-10 mx-auto w-fit max-w-[95%] md:max-w-md">
          <div className="post-it rotate-1 text-center py-6 px-10">
            <div className="text-lg md:text-xl font-hand text-olive/80 leading-relaxed">
              {cleanChildren}
            </div>
          </div>
        </div>
      );
    }

    return (
      <blockquote className="border-l-4 border-olive/20 pl-6 italic text-olive/70 my-8 leading-[2rem]">
        {children}
      </blockquote>
    );
  },

  p: ({ children }) => {
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

  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-serif font-bold text-olive mt-[2rem] mb-0 leading-[2rem] border-b border-olive/10 pb-[2px]">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-serif font-bold text-olive mt-[2rem] mb-0 leading-[2rem]">
      {children}
    </h3>
  ),

  ul: ({ children }) => (
    <ul className="list-disc space-y-0 mb-[2rem] pl-6 text-olive/85 font-sans text-base md:text-lg marker:text-terracotta leading-[2rem]">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal space-y-0 mb-[2rem] pl-6 text-olive/85 font-sans text-base md:text-lg marker:text-terracotta leading-[2rem]">
      {children}
    </ol>
  ),

  img: ({ src, alt }) => (
    <div className="relative w-full aspect-video overflow-hidden my-10 hand-drawn-border bg-white p-3 shadow-xl rotate-0.5">
      <Image
        src={(src as string) || ''}
        alt={alt || ''}
        fill
        className="object-cover p-1"
        sizes="(max-w-768px) 100vw, 800px"
      />
    </div>
  ),

  table: ({ children }) => (
    <div className="overflow-x-auto w-full my-8">
      <table className="w-full border-collapse border border-olive/15 text-left text-sm md:text-base bg-white/40 leading-[2rem]">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-cream/40 border-b border-olive/15 leading-[2rem]">
      {children}
    </thead>
  ),

  th: ({ children }) => (
    <th className="border border-olive/15 p-3.5 font-serif font-bold text-olive leading-[2rem]">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="border border-olive/15 p-3 text-olive/80 font-sans leading-[2rem]">
      {children}
    </td>
  ),

  tr: ({ children }) => (
    <tr className="hover:bg-cream/15 transition-colors leading-[2rem]">
      {children}
    </tr>
  ),

  pre: ({ children }) => (
    <pre className="bg-cream/30 border border-olive/15 p-5 overflow-x-auto my-6 text-xs md:text-sm font-mono text-olive/85 rounded-sm leading-[2rem]">
      {children}
    </pre>
  ),

  code: ({ children }) => (
    <code className="bg-olive/5 px-1.5 py-0.5 rounded-sm text-xs font-mono text-terracotta font-semibold">
      {children}
    </code>
  ),
};

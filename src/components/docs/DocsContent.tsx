"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clipboard, Check, FileCode, Edit3, Bookmark, HelpCircle } from 'lucide-react';

export const DocsContent = () => {
  const [copied, setCopied] = useState(false);

  const templateText = `---
title: "Título Curto da Nota"
date: "2026-08-14"
category: "planos"
tags: ["Projetos", "Estúdio"]
excerpt: "Uma linha descritiva para o card principal."
image: "/images/journal/lived-in-character.png" # opcional
externalUrl: "" # opcional
---

Insira o corpo do seu texto aqui...
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(templateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Banner Section */}
        <section className="relative overflow-hidden border border-olive/10 bg-white px-8 py-12 shadow-md md:px-14 md:py-16">
          <div className="absolute inset-0 grid-paper opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex rounded bg-terracotta/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
              Guia do Estúdio
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-olive leading-none">
                Como alimentar <span className="italic text-terracotta">o Jardim.</span>
              </h1>
              <h2 className="max-w-2xl text-lg leading-relaxed text-olive/75">
                Manual prático de inserção de notas, fichamentos e planos no seu Diário de Bordo. Este guia visual demonstra a estrutura de pastas, metadados e elementos de estilo exclusivos.
              </h2>
            </div>
          </div>
        </section>

        {/* Two Column details: Folders & Categories */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="bg-white border border-olive/10 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-olive border-b border-olive/10 pb-4">
              <FileCode size={24} className="text-terracotta" />
              <h2 className="text-2xl font-serif font-bold">1. Pasta & Arquivo</h2>
            </div>
            <p className="text-sm leading-relaxed text-olive/80">
              Todas as publicações do seu jardim são criadas a partir de arquivos individuais com extensão <code className="bg-olive/5 px-1.5 py-0.5 rounded text-xs font-mono">.md</code>.
            </p>
            <div className="bg-cream/50 p-4 border border-olive/15 rounded font-mono text-xs text-olive space-y-2">
              <p className="text-olive/50 font-bold uppercase text-[9px] tracking-wider">Caminho da Pasta:</p>
              <p className="font-semibold">src/content/garden/</p>
              <p className="text-olive/50 font-bold uppercase text-[9px] tracking-wider pt-2">Nome de Exemplo:</p>
              <p>meu-novo-projeto.md</p>
            </div>
          </div>

          <div className="bg-white border border-olive/10 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-olive border-b border-olive/10 pb-4">
              <Bookmark size={24} className="text-terracotta" />
              <h2 className="text-2xl font-serif font-bold">2. Classificação</h2>
            </div>
            <p className="text-sm leading-relaxed text-olive/80">
              O sistema distribui automaticamente suas notas de acordo com a variável <code className="bg-olive/5 px-1.5 py-0.5 rounded text-xs font-mono">category</code> inserida no topo:
            </p>
            <ul className="grid grid-cols-2 gap-3 text-xs">
              <li className="p-2.5 bg-cream/40 border border-olive/10 font-mono"><strong className="text-olive">"planos"</strong> ➔ 📋 Planos</li>
              <li className="p-2.5 bg-cream/40 border border-olive/10 font-mono"><strong className="text-olive">"leituras"</strong> ➔ 📚 Leituras</li>
              <li className="p-2.5 bg-cream/40 border border-olive/10 font-mono"><strong className="text-olive">"estudos"</strong> ➔ 📐 Estudos</li>
              <li className="p-2.5 bg-cream/40 border border-olive/10 font-mono"><strong className="text-olive">"galeria"</strong> ➔ 🖼️ Galeria</li>
            </ul>
          </div>
        </section>

        {/* Copyable Template Box */}
        <section className="bg-white border border-olive/10 p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-olive/10 pb-4">
            <div className="flex items-center gap-3">
              <Edit3 size={24} className="text-terracotta" />
              <h2 className="text-2xl font-serif font-bold">3. Template Inicial (Frontmatter)</h2>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-mono uppercase bg-olive text-cream hover:bg-terracotta transition-colors px-3 py-1.5 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="check" className="flex items-center gap-1">
                    <Check size={14} /> Copiado!
                  </motion.span>
                ) : (
                  <motion.span key="clip" className="flex items-center gap-1">
                    <Clipboard size={14} /> Copiar
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          
          <p className="text-sm leading-relaxed text-olive/80">
            Copie o cabeçalho abaixo e cole no topo do seu novo arquivo de notas. Ele define os metadados necessários para renderizar o card corretamente:
          </p>

          <pre className="bg-cream/40 border border-olive/15 p-6 overflow-x-auto text-xs font-mono text-olive/80 leading-loose">
            {templateText}
          </pre>
        </section>

        {/* Markdown Extensions Preview */}
        <section className="bg-white border border-olive/10 p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-olive/10 pb-4">
            <HelpCircle size={24} className="text-terracotta" />
            <h2 className="text-2xl font-serif font-bold">4. Formatação & Estilos de Bloco</h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Literary Quote */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive/40 block mb-1">Como Escrever no Markdown:</span>
                <code className="bg-olive/5 px-2 py-1 rounded text-xs font-mono text-terracotta block w-fit">
                  | "Minha citação poética." — Nome
                </code>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive/40 block mb-3">Resultado Visual na Nota:</span>
                <blockquote className="border-l-4 border-terracotta pl-4 italic text-lg text-olive font-serif leading-relaxed">
                  "A floresta é uma longa história escrita na linguagem das folhas e da luz."
                </blockquote>
              </div>
            </div>

            {/* Post-it Note */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive/40 block mb-1">Como Escrever no Markdown:</span>
                <code className="bg-olive/5 px-2 py-1 rounded text-xs font-mono text-terracotta block w-fit">
                  &gt; Meu bilhete manuscrito rápido.
                </code>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive/40 block mb-2">Resultado Visual na Nota:</span>
                <div className="washi-tape mx-auto w-fit">
                  <div className="post-it rotate-1 py-4 px-6 text-center">
                    <p className="text-sm font-hand text-olive/80">
                      Lembrar de colher sementes de alecrim na horta amanhã cedo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

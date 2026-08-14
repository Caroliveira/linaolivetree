# Diretrizes de Inserção de Conteúdo — Lina Olivetree

Este guia serve como referência prática para a criação e formatação de novas anotações, croquis e planos no Jardim Digital.

---

## 📂 Organização dos Arquivos
Todas as notas do Jardim Digital são carregadas a partir de arquivos Markdown na pasta:
`src/content/garden/`

*Recomendação:* Use letras minúsculas separadas por hífen para nomear os arquivos (ex: `estuda-de-cores.md`).

---

## 🎨 Metadados Obrigatórios (Frontmatter)
Todo arquivo `.md` deve iniciar com o bloco de configuração abaixo:

```yaml
---
title: "Título Curto e Direto da Nota"
date: "2026-08-14"
category: "planos"
tags: ["Projetos", "Estúdio"]
excerpt: "Uma frase resumida de até 120 caracteres para o card principal."
image: "/images/journal/lived-in-character.png" # opcional
externalUrl: "https://instagram.com/..." # opcional (leva o usuário direto ao link externo)
---
```

### Valores válidos para `category`:
- `planos` ➔ 📋 Planos (metas, reformas, cronogramas)
- `leituras` ➔ 📚 Leituras & Anotações (resumos, citações de livros)
- `estudos` ➔ 📐 Estudos Práticos (desenhos técnicos, exercícios de luz/render)
- `galeria` ➔ 🖼️ Galeria (fotos de cadernos de traços, desenhos botânicos)

---

## ✍️ Formatações Especiais da Marca
O leitor suporta extensões de formatação para simular um sketchbook real:

### 1. Citação Literária
Adicione `|` no início da linha para gerar uma citação destacada em itálico e com borda Terracota:
```markdown
| "A simplicidade é o último grau da sofisticação." — Leonardo da Vinci
```

### 2. Post-It Amarelo
Adicione `>` no início da linha para renderizar uma nota manuscrita com fita washi tape:
```markdown
> Lembrar de comprar papel Canson Moulin du Roy antes do final do mês.
```

### 3. Moldura de Desenho / Polaroid
Ao inserir imagens com o formato padrão do markdown, elas recebem molduras táteis de papel:
```markdown
![Texto Alternativo da Imagem](/images/journal/unhurried-moments.png)
```

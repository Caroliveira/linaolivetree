import React from 'react';

export const getReactText = (node: React.ReactNode): string => {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getReactText).join('');

  if (React.isValidElement(node) && node.props) {
    const children = (node.props as { children?: React.ReactNode }).children;
    if (children) {
      return getReactText(children);
    }
  }
  return '';
};

export const removePrefixFromReactNodes = (nodes: React.ReactNode, prefix: string): React.ReactNode => {
  if (!nodes) return null;

  if (typeof nodes === 'string') {
    if (nodes.includes(prefix)) {
      const stripped = nodes.replace(prefix, '');
      return stripped.trimStart();
    }
    return nodes;
  }

  if (Array.isArray(nodes)) {
    return nodes.map(node => removePrefixFromReactNodes(node, prefix));
  }

  if (React.isValidElement(nodes) && nodes.props) {
    const children = (nodes.props as { children?: React.ReactNode }).children;
    if (children) {
      const updatedChildren = removePrefixFromReactNodes(children, prefix);
      return React.cloneElement(nodes, { children: updatedChildren } as any);
    }
  }

  return nodes;
};

export const preprocessMarkdown = (content: string): string => {
  let inQuote = false;
  let inPostit = false;

  return content
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
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
        const contentAfterArrow = trimmed.substring(1).trim();
        // Remove GitHub-style blockquote alerts (e.g. [!NOTE], [!TIP])
        const cleanedText = contentAfterArrow.replace(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');

        if (!inPostit) {
          inPostit = true;
          return `> [POSTIT] ${cleanedText}`;
        }
        return `> ${cleanedText}`;
      }

      if (trimmed === '') {
        inQuote = false;
        inPostit = false;
      }
      return line;
    })
    .join('\n');
};

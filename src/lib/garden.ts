import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { GardenNode } from '../types/garden';

const gardenDirectory = path.join(process.cwd(), 'src/content/garden');

export function getAllGardenNodes(): GardenNode[] {
  if (!fs.existsSync(gardenDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(gardenDirectory);

  const nodes = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(gardenDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = filename.replace(/\.md$/, '');

      return {
        id: data.id || slug,
        title: data.title || '',
        date: data.date || '',
        category: data.category || 'leituras',
        excerpt: data.excerpt || '',
        image: data.image || '',
        content: content,
        slug,
        tags: data.tags || [],
        externalUrl: data.externalUrl || '',
      } as GardenNode;
    });

  return nodes.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getGardenNodeBySlug(slug: string): GardenNode | null {
  try {
    const filePath = path.join(gardenDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: data.id || slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || 'leituras',
      excerpt: data.excerpt || '',
      image: data.image || '',
      content: content,
      slug,
      tags: data.tags || [],
      externalUrl: data.externalUrl || '',
    } as GardenNode;
  } catch (error) {
    console.error(`Error loading garden node ${slug}:`, error);
    return null;
  }
}

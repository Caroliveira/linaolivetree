import { NextResponse } from 'next/server';
import { getAllGardenNodes } from '../../../lib/garden';

export async function GET() {
  try {
    const nodes = getAllGardenNodes();
    // Return lightweight payload for client-side searching
    const searchPayload = nodes.map(({ id, title, slug, category, excerpt, tags, externalUrl }) => ({
      id,
      title,
      slug,
      category,
      excerpt,
      tags,
      externalUrl,
    }));
    return NextResponse.json(searchPayload, { status: 200 });
  } catch (error) {
    console.error('Error fetching search nodes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

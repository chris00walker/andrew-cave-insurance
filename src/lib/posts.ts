import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'content/blog');

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  
  return fs.readdirSync(postsDir)
    .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx?$/, '');
      const file = fs.readFileSync(path.join(postsDir, filename), 'utf8');
      const { data } = matter(file);
      return { 
        slug, 
        title: (data as any).title || 'Untitled',
        date: (data as any).date || new Date().toISOString().split('T')[0]
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  try {
    const file = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(file);
    const processed = await remark().use(html).process(content);
    
    return { 
      data: {
        title: (data as any).title || 'Untitled',
        date: (data as any).date || new Date().toISOString().split('T')[0]
      }, 
      content: processed.toString() 
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    throw new Error(`Failed to read post: ${slug}`);
  }
}

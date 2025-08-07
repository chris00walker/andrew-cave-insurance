import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data, content } = await getPostBySlug(params.slug);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center text-brand hover:text-brand-light font-medium transition-colors duration-200 mb-6"
            >
              ← Back to Blog
            </Link>
          </div>
          
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{data.title}</h1>
              <p className="text-gray-500">{data.date}</p>
            </header>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-brand hover:prose-a:text-brand-light prose-strong:text-gray-800 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          </article>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-brand to-brand-light rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
              <p className="mb-4">Contact Andrew Cave Insurance for personalized advice and competitive quotes.</p>
              <Link 
                href="/#contact"
                className="inline-block bg-white text-brand px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                📅 Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Blog post images mapping
const blogImages: { [key: string]: { src: string; alt: string; hasImage: boolean } } = {
  '2025-08-06-succession-planning-101': {
    src: '/images/succession_planning.png',
    alt: 'Business succession planning meeting',
    hasImage: true
  },
  '2025-08-05-small-business-insurance-guide': {
    src: '/images/small_business_insurance.png',
    alt: 'Small business owner reviewing insurance documents',
    hasImage: true
  },
  '2025-08-04-life-insurance-myths': {
    src: '/images/life_insurance_myths.png',
    alt: 'Family protection and life insurance concept',
    hasImage: true
  }
};

const getExcerpt = (slug: string) => {
  const excerpts: { [key: string]: string } = {
    '2025-08-06-succession-planning-101': 'Learn how to protect your business legacy with comprehensive succession planning strategies. Essential insights for Barbadian business owners.',
    '2025-08-05-small-business-insurance-guide': 'Discover the essential insurance coverage every small business needs to protect against unexpected risks and liabilities.',
    '2025-08-04-life-insurance-myths': 'Separate fact from fiction with our comprehensive guide to life insurance myths that could be costing you and your family.'
  };
  return excerpts[slug] || 'Expert insurance advice and insights to help protect what matters most to you.';
};

export default async function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand to-brand-light pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Insurance Insights & Tips
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Stay informed with the latest insurance news, expert advice, and practical tips from Andrew Cave
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <main className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(p => {
              const imageData = blogImages[p.slug] || {
                src: '/images/blog/default-insurance.jpg',
                alt: 'Insurance advice and tips',
                hasImage: false
              };
              
              return (
                <article key={p.slug} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-neutral-warm to-gray-100">
                    {imageData.hasImage ? (
                      <Image
                        src={imageData.src}
                        alt={imageData.alt}
                        fill
                        className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-light opacity-80"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center p-4">
                            <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h3 className="font-semibold text-sm">{imageData.alt}</h3>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {new Date(p.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand transition-colors duration-200">
                      <Link href={`/blog/${p.slug}`}>
                        {p.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {getExcerpt(p.slug)}
                    </p>
                    
                    <Link 
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center text-brand hover:text-brand-light font-semibold transition-colors duration-200 group"
                    >
                      Read Full Article
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          
          {/* Lead Magnet CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-brand to-brand-light rounded-xl shadow-lg p-8 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Get Your Free Insurance Review</h3>
              <p className="text-xl text-white/90 mb-6">
                Discover potential gaps in your coverage and save money with a complimentary insurance assessment from Andrew Cave.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/#contact"
                  className="bg-white text-brand px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  📅 Schedule Free Review
                </Link>
                <Link 
                  href="/#contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand transition-all duration-200"
                >
                  Get Quick Quote
                </Link>
              </div>
              <p className="text-sm text-white/80 mt-4">
                ✓ No obligation • ✓ Expert advice • ✓ Personalized recommendations
              </p>
            </div>
          </div>
          
          {/* Newsletter Signup Alternative */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Stay Informed</h3>
                <p className="text-gray-600 mb-4">
                  Join hundreds of Barbadian business owners and families who receive our monthly insurance insights.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-brand mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Monthly insurance tips & updates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-brand mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Industry news & regulatory changes
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-brand mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Exclusive client resources
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Ready to Connect?</h4>
                  <div className="space-y-3">
                    <Link 
                      href="/#contact"
                      className="block bg-gradient-to-r from-brand to-brand-light text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Request Information
                    </Link>
                    <Link 
                      href="tel:+1246"
                      className="block border-2 border-brand text-brand px-6 py-3 rounded-lg font-semibold hover:bg-brand hover:text-white transition-all duration-200"
                    >
                      Call for Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

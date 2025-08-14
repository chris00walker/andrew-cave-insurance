import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getImagePath } from '@/lib/image-path';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';

// Blog post images mapping
const blogImages: { [key: string]: { src: string; alt: string; hasImage: boolean } } = {
  '2025-08-06-succession-planning-101': {
    src: '/images/blog/succession_planning.png',
    alt: 'Business succession planning meeting',
    hasImage: true
  },
  '2025-08-05-small-business-insurance-guide': {
    src: '/images/blog/small_business_insurance.png',
    alt: 'Small business owner reviewing insurance documents',
    hasImage: true
  },
  '2025-08-04-life-insurance-myths': {
    src: '/images/blog/life_insurance_myths.png',
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
          <Badge variant="secondary" className="mb-6">
            Expert Insurance Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Insurance Insights & Tips
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Stay informed with the latest insurance news, expert advice, and practical tips from Andrew Cave
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Badge variant="outline" className="text-white border-white/30 bg-white/10">
              <CheckCircle className="w-3 h-3 mr-1" />
              Expert Analysis
            </Badge>
            <Badge variant="outline" className="text-white border-white/30 bg-white/10">
              <CheckCircle className="w-3 h-3 mr-1" />
              Local Insights
            </Badge>
            <Badge variant="outline" className="text-white border-white/30 bg-white/10">
              <CheckCircle className="w-3 h-3 mr-1" />
              Practical Tips
            </Badge>
          </div>
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
                <Card key={p.slug} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-neutral-warm to-gray-100">
                    {imageData.hasImage ? (
                      <Image
                        src={getImagePath(imageData.src.startsWith('/') ? imageData.src.slice(1) : imageData.src)}
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
                              <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-sm">{imageData.alt}</h3>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(p.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-brand transition-colors duration-200">
                      <Link href={`/blog/${p.slug}`}>
                        {p.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="leading-relaxed">
                      {getExcerpt(p.slug)}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="ghost" asChild className="group p-0 h-auto font-semibold text-brand hover:text-brand-light">
                      <Link href={`/blog/${p.slug}`} className="flex items-center">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {/* Lead Magnet CTA Section */}
          <Card className="mt-16 bg-gradient-to-r from-brand to-brand-light border-0 text-white">
            <CardContent className="p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <Badge variant="secondary" className="mb-4">
                  Free Consultation
                </Badge>
                <h3 className="text-3xl font-bold mb-4">Get Your Free Insurance Review</h3>
                <p className="text-xl text-white/90 mb-6">
                  Discover potential gaps in your coverage and save money with a complimentary insurance assessment from Andrew Cave.
                </p>
                <div className="flex justify-center items-center mb-6">
                  <Button asChild size="lg" className="bg-white text-brand hover:bg-gray-100">
                    <Link href="/#contact" className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Get Quick Quote
                    </Link>
                  </Button>
                </div>
                <Separator className="bg-white/20 mb-4" />
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    No obligation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Expert advice
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Personalized recommendations
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Newsletter Signup Alternative */}
          <Card className="mt-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl">Stay Informed</CardTitle>
                    <CardDescription className="text-base">
                      Join hundreds of Barbadian business owners and families who receive our monthly insurance insights.
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-brand mr-2" />
                      Monthly insurance tips & updates
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-brand mr-2" />
                      Industry news & regulatory changes
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-brand mr-2" />
                      Exclusive client resources
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Card className="bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Ready to Connect?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button asChild className="w-full bg-gradient-to-r from-brand to-brand-light">
                        <Link href="/#contact" className="flex items-center justify-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Request Information
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full border-brand text-brand hover:bg-brand hover:text-white">
                        <Link href="tel:+1246" className="flex items-center justify-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Call for Consultation
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Phone, Mail } from 'lucide-react';

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data, content } = await getPostBySlug(resolvedParams.slug);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <Button variant="ghost" asChild className="mt-4 p-0 h-auto font-medium text-brand hover:text-brand-light">
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
          
          <article className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardHeader className="pb-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Insurance Insights
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(data.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    5 min read
                  </Badge>
                </div>
                <CardTitle className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  {data.title}
                </CardTitle>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/images/andrew-cave-professional.jpg" alt="Andrew Cave" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-800">Andrew Cave</p>
                      <p className="text-sm text-gray-500">Licensed Insurance Broker</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>
            </Card>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-brand hover:prose-a:text-brand-light prose-strong:text-gray-800 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          </article>
          
          <Separator className="my-12" />
          
          {/* Author Bio Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/images/andrew-cave-professional.jpg" alt="Andrew Cave" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">About Andrew Cave</h3>
                  <p className="text-gray-600 mb-4">
                    Andrew Cave is a licensed independent insurance broker with over 15 years of experience helping individuals and businesses in Barbados find the right insurance coverage. He specializes in life insurance, health insurance, and business protection strategies.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Licensed Broker</Badge>
                    <Badge variant="secondary">15+ Years Experience</Badge>
                    <Badge variant="secondary">Local Expert</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-brand to-brand-light border-0 text-white">
            <CardContent className="p-8 text-center">
              <Badge variant="secondary" className="mb-4">
                Free Consultation
              </Badge>
              <h3 className="text-2xl font-semibold mb-3">Ready to Get Started?</h3>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Contact Andrew Cave Insurance for personalized advice and competitive quotes tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button asChild size="lg" className="bg-white text-brand hover:bg-gray-100">
                  <Link href="/#contact" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand">
                  <Link href="/#contact" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@andrewcaveinsurance.com
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +1 (246) XXX-XXXX
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Articles Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Related Articles
              </CardTitle>
              <CardDescription>
                Continue reading more insurance insights and tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Small Business Insurance Guide</h4>
                  <p className="text-sm text-gray-600 mb-3">Essential coverage every small business needs to protect against risks.</p>
                  <Button variant="ghost" asChild className="p-0 h-auto text-brand">
                    <Link href="/blog/2025-08-05-small-business-insurance-guide">
                      Read Article →
                    </Link>
                  </Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-2">Life Insurance Myths Debunked</h4>
                  <p className="text-sm text-gray-600 mb-3">Separate fact from fiction with our comprehensive guide to life insurance.</p>
                  <Button variant="ghost" asChild className="p-0 h-auto text-brand">
                    <Link href="/blog/2025-08-04-life-insurance-myths">
                      Read Article →
                    </Link>
                  </Button>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="text-center">
                <Button asChild variant="outline">
                  <Link href="/blog">
                    View All Articles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

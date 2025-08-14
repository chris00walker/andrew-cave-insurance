import Link from 'next/link';
import { Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImagePath } from '@/lib/image-path';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white pt-20">
      <div className="text-center px-6 max-w-5xl mx-auto">
        {/* Trust Badge */}
        <Badge variant="secondary" className="inline-flex items-center bg-white/10 backdrop-blur-sm text-neutral-warm font-professional border-white/20 mt-8 mb-8">
          <div className="w-2 h-2 bg-caribbean-teal rounded-full mr-2 animate-pulse"></div>
          Licensed Insurance Agent • Barbados
        </Badge>
        
        {/* Main Headline - Clean and Impactful */}
        <h1 className="font-authority text-4xl md:text-5xl lg:text-6xl font-bold animate-fadeInUp mb-8 text-white leading-tight">
          Your Family&apos;s
          <span className="block text-caribbean-teal mt-3 relative">
            Financial Security
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-wealth-gold rounded-full"></div>
          </span>
        </h1>
        
        {/* Clean Value Proposition */}
        <p className="font-professional text-body-large md:text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed text-neutral-warm">
          <span className="text-white font-semibold">20+ years</span> protecting Barbadian families with comprehensive insurance solutions.
        </p>
        


        {/* Service Categories - Simplified */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="text-caribbean-teal border-caribbean-teal/50 bg-white/5">
            Life Insurance
          </Badge>
          <Badge variant="outline" className="text-caribbean-teal border-caribbean-teal/50 bg-white/5">
            Health Insurance
          </Badge>
          <Badge variant="outline" className="text-caribbean-teal border-caribbean-teal/50 bg-white/5">
            Business Insurance
          </Badge>
          <Badge variant="outline" className="text-caribbean-teal border-caribbean-teal/50 bg-white/5">
            Retirement Planning
          </Badge>
        </div>
        
        {/* Trust-Building CTA */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center md:items-center">
          <Button asChild size="lg" className="bg-wealth-gold hover:bg-wealth-gold/90 text-brand font-professional font-semibold text-body-large">
            <Link href="#contact">
              <Shield className="mr-2 h-5 w-5" />
              Get Your Free Consultation
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent hover:bg-white/10 text-white font-professional border-white/30 hover:border-caribbean-teal">
            <Link href="#about">
              Learn About Andrew
            </Link>
          </Button>
        </div>
        
        {/* Trust Indicators with Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-caribbean-teal font-authority text-subsection font-bold mb-2">20+</div>
              <div className="text-neutral-warm font-professional text-fine">Years Experience</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-caribbean-teal font-authority text-subsection font-bold mb-2">500+</div>
              <div className="text-neutral-warm font-professional text-fine">Families Protected</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-caribbean-teal font-authority text-subsection font-bold mb-2">100%</div>
              <div className="text-neutral-warm font-professional text-fine">Barbadian Owned</div>
            </CardContent>
          </Card>
        </div>


      </div>
    </section>
  );
}

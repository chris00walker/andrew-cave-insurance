import Image from 'next/image';
import { CheckCircle, Award, Users, Shield, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getImagePath } from '@/lib/image-path';

export default function AboutSection() {
  return (
    <section id="about" className="pt-20 pb-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Compact Trust-Building Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            About Your Agent
          </Badge>
          <h2 className="font-authority text-3xl md:text-4xl font-bold text-brand mb-2">
            Meet Andrew Cave
          </h2>
          <p className="font-professional text-lg text-professional-gray">
            Licensed Insurance Agent • 21+ Years Protecting Barbadian Families
          </p>
          <Separator className="w-20 mx-auto mt-4" />
        </div>
        
        {/* Trust-Focused Layout - Maximum Information Density */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          {/* Professional Image - Optimized Size */}
          <div className="lg:col-span-1 flex flex-col">
            <Card className="relative overflow-visible">
              <CardContent className="p-6">
                <div className="relative mx-auto w-full max-w-64">
                  <Avatar className="w-full h-80 rounded-xl">
                    <AvatarImage 
                      src={getImagePath('images/andrew-cave-professional.jpg')}
                      alt="Andrew Cave - Licensed Insurance Agent"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-brand text-white text-4xl font-bold rounded-xl">
                      AC
                    </AvatarFallback>
                  </Avatar>

                </div>
              </CardContent>
            </Card>
            
            {/* Professional Credentials - Under Image */}
            <Card className="mt-6 flex-grow">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-sm flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-brand" />
                  Professional Credentials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-caribbean-teal flex-shrink-0" />
                  <span className="text-authority-black font-medium text-sm">Licensed Independent Agent</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-caribbean-teal flex-shrink-0" />
                  <span className="text-authority-black font-medium text-sm">Professional Insurance Associations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-caribbean-teal flex-shrink-0" />
                  <span className="text-authority-black font-medium text-sm">Extensive Provider Network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-caribbean-teal flex-shrink-0" />
                  <span className="text-authority-black font-medium text-sm">Continuing Education Certified</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - Trust Messaging */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {/* Value Proposition */}
            <Card className="bg-gradient-to-r from-brand/5 to-caribbean-teal/5">
              <CardHeader>
                <CardTitle className="text-xl text-brand flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Your Independent Insurance Advocate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-professional text-authority-black leading-relaxed">
                  Andrew Cave works exclusively for <strong>you</strong> - not insurance companies. With over 21 years of experience, he provides unbiased advice to help Barbadian families find the right protection at the best value.
                </p>
              </CardContent>
            </Card>
            
            {/* Core Differentiators - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-professional font-bold text-authority-black mb-2">Independent & Unbiased</h4>
                      <p className="text-professional-gray text-sm leading-relaxed">Compare all major insurers to find your best option</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-professional font-bold text-authority-black mb-2">Local Barbadian Expert</h4>
                      <p className="text-professional-gray text-sm leading-relaxed">Deep knowledge of local regulations and needs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-professional font-bold text-authority-black mb-2">Personal Relationship</h4>
                      <p className="text-professional-gray text-sm leading-relaxed">Direct access - no call centers or middlemen</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-professional font-bold text-authority-black mb-2">Claims Advocacy</h4>
                      <p className="text-professional-gray text-sm leading-relaxed">Support you through the entire claims process</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact CTA */}
            <Card className="bg-brand/5 border-brand/20">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold text-brand mb-2">Ready to Get Started?</h4>
                <p className="text-sm text-gray-600 mb-4">Schedule a free consultation to discuss your insurance needs.</p>
                <Button asChild className="bg-brand hover:bg-brand/90">
                  <a href="#contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Andrew
                  </a>
                </Button>
              </CardContent>
            </Card>

          </div>
          
          {/* Trust Indicators & Stats */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            {/* Key Stats */}
            <Card className="bg-gradient-to-br from-caribbean-teal/10 to-brand/10 text-center">
              <CardHeader>
                <CardTitle className="text-lg text-brand flex items-center justify-center gap-2">
                  <Award className="w-5 h-5" />
                  Track Record
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-caribbean-teal">15+</div>
                  <div className="text-professional-gray text-sm font-medium">Years Experience</div>
                </div>
                <Separator className="my-2" />
                <div>
                  <div className="text-3xl font-bold text-caribbean-teal">500+</div>
                  <div className="text-professional-gray text-sm font-medium">Families Protected</div>
                </div>
                <Separator className="my-2" />
                <div>
                  <div className="text-3xl font-bold text-caribbean-teal">100%</div>
                  <div className="text-professional-gray text-sm font-medium">Independent</div>
                </div>
              </CardContent>
            </Card>
            
            {/* Trust Signals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-brand text-center flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Why Families Trust Andrew
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-wealth-gold flex-shrink-0" />
                  <span className="text-authority-black text-sm">No pressure sales tactics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-wealth-gold flex-shrink-0" />
                  <span className="text-authority-black text-sm">Transparent fee structure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-wealth-gold flex-shrink-0" />
                  <span className="text-authority-black text-sm">Ongoing policy reviews</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-wealth-gold flex-shrink-0" />
                  <span className="text-authority-black text-sm">Claims support included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-wealth-gold flex-shrink-0" />
                  <span className="text-authority-black text-sm">Local Barbadian service</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

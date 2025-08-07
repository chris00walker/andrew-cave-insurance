import Image from 'next/image';
import { getImagePath } from '@/lib/image-path';

export default function AboutSection() {
  return (
    <section id="about" className="pt-20 pb-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Compact Trust-Building Header */}
        <div className="text-center mb-8">
          <h2 className="font-authority text-3xl md:text-4xl font-bold text-brand mb-2">
            Meet Andrew Cave
          </h2>
          <p className="font-professional text-lg text-professional-gray">
            Licensed Independent Insurance Broker • 15+ Years Protecting Barbadian Families
          </p>
        </div>
        
        {/* Trust-Focused Layout - Maximum Information Density */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          {/* Professional Image - Optimized Size */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="relative mx-auto w-64 h-80">
              <div className="absolute -inset-2 bg-gradient-to-br from-caribbean-teal/15 to-brand/15 rounded-2xl transform rotate-1"></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-white border-2 border-white">
                <Image
                  src={getImagePath('images/andrew-cave-professional.jpg')}
                  alt="Andrew Cave - Licensed Insurance Broker"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Trust Badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-caribbean-teal text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Licensed Broker
                </div>
              </div>
            </div>
            
            {/* Professional Credentials - Under Image */}
            <div className="mt-8 bg-gradient-to-br from-caribbean-teal/15 to-brand/15 rounded-lg p-4 flex-grow border border-caribbean-teal/20">
              <h4 className="font-authority text-sm font-bold text-brand mb-3 text-center">Professional Credentials</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-caribbean-teal rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-authority-black font-medium">Licensed Independent Broker</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-caribbean-teal rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-authority-black font-medium">Professional Insurance Associations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-caribbean-teal rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-authority-black font-medium">Extensive Provider Network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-caribbean-teal rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-authority-black font-medium">Continuing Education Certified</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content - Trust Messaging */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-brand/5 to-caribbean-teal/5 rounded-xl p-6 border border-neutral-warm/20">
              <h3 className="font-authority text-xl font-bold text-brand mb-3">
                Your Independent Insurance Advocate
              </h3>
              <p className="font-professional text-authority-black leading-relaxed">
                Andrew Cave works exclusively for <strong>you</strong> - not insurance companies. With over 15 years of experience, he provides unbiased advice to help Barbadian families find the right protection at the best value.
              </p>
            </div>
            
            {/* Core Differentiators - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-neutral-warm/20 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-professional font-bold text-authority-black mb-2">Independent & Unbiased</h4>
                    <p className="text-professional-gray text-sm leading-relaxed">Compare all major insurers to find your best option</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-warm/20 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-professional font-bold text-authority-black mb-2">Local Barbadian Expert</h4>
                    <p className="text-professional-gray text-sm leading-relaxed">Deep knowledge of local regulations and needs</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-warm/20 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-professional font-bold text-authority-black mb-2">Personal Relationship</h4>
                    <p className="text-professional-gray text-sm leading-relaxed">Direct access - no call centers or middlemen</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-warm/20 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-caribbean-teal rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-professional font-bold text-authority-black mb-2">Claims Advocacy</h4>
                    <p className="text-professional-gray text-sm leading-relaxed">Support you through the entire claims process</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Spacer for alignment */}
            <div className="flex-grow"></div>
            

          </div>
          
          {/* Trust Indicators & Stats */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            {/* Key Stats */}
            <div className="bg-gradient-to-br from-caribbean-teal/10 to-brand/10 rounded-xl p-6 text-center">
              <h3 className="font-authority text-lg font-bold text-brand mb-4">Track Record</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-caribbean-teal">15+</div>
                  <div className="text-professional-gray text-sm font-medium">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-caribbean-teal">500+</div>
                  <div className="text-professional-gray text-sm font-medium">Families Protected</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-caribbean-teal">100%</div>
                  <div className="text-professional-gray text-sm font-medium">Independent</div>
                </div>
              </div>
            </div>
            
            {/* Trust Signals */}
            <div className="bg-white rounded-xl p-6 border border-neutral-warm/20 shadow-sm">
              <h4 className="font-authority text-lg font-bold text-brand mb-4 text-center">Why Families Trust Andrew</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-wealth-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-authority-black">No pressure sales tactics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-wealth-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-authority-black">Transparent fee structure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-wealth-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-authority-black">Ongoing policy reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-wealth-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-authority-black">Claims support included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-wealth-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-authority-black">Local Barbadian service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

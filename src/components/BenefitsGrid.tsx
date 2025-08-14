'use client';

import { User, Target, Zap, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function Benefits() {
  const benefits = [
    {
      icon: User,
      title: "Personalized Service",
      description: "Tailored insurance solutions that fit your unique needs and circumstances.",
      badge: "Personal",
      details: "Every client receives a customized insurance portfolio based on their specific life situation, financial goals, and risk tolerance."
    },
    {
      icon: Target,
      title: "Expert, Independent Advice",
      description: "Unbiased guidance from a trusted professional with extensive industry experience.",
      badge: "Expert",
      details: "As an independent agent, I work for you, not the insurance companies. This means I can recommend the best coverage from multiple providers."
    },
    {
      icon: Zap,
      title: "Seamless Claims Processing",
      description: "Efficient support when you need it most, making claims simple and stress-free.",
      badge: "Fast",
      details: "I personally guide you through the entire claims process, ensuring quick resolution and maximum coverage benefits."
    },
    {
      icon: Shield,
      title: "Tailored Coverage Options",
      description: "Comprehensive protection designed specifically for your lifestyle and budget.",
      badge: "Comprehensive",
      details: "From basic coverage to premium protection plans, I offer flexible options that grow and adapt with your changing needs."
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Why Choose Andrew Cave Insurance
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Trusted Insurance Partner
          </h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the difference of working with a dedicated professional who puts your interests first.
          </p>
        </div>

        {/* Benefits Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          role="region"
          aria-label="Insurance benefits overview"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-brand/20">
                    <CardHeader className="text-center pb-4">
                      <div 
                        className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors"
                        aria-hidden="true"
                      >
                        <IconComponent className="w-8 h-8 text-brand" />
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CardTitle className="text-lg font-bold text-gray-800">
                          {benefit.title}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          aria-label={`Category: ${benefit.badge}`}
                        >
                          {benefit.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p 
                        id={`benefit-desc-${index}`}
                        className="text-gray-600 leading-relaxed"
                      >
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent 
                  className="w-80"
                  role="tooltip"
                  aria-label={`Detailed information about ${benefit.title}`}
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.details}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to experience personalized insurance service?
          </p>
          <Badge variant="secondary" className="bg-brand text-white">
            Contact Andrew Today
          </Badge>
        </div>
      </div>
    </section>
  );
}

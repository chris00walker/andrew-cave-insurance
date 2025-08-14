'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Andrew's professionalism and care transformed our insurance experience. We felt supported at every step.",
      author: "Mark and Alicia P.",
      initials: "MA",
      rating: 5,
      service: "Life Insurance",
      location: "St. Michael"
    },
    {
      quote: "Fast, clear advice, and genuine care—Andrew is simply the best insurance agent in Barbados.",
      author: "Samuel R.",
      initials: "SR",
      rating: 5,
      service: "Business Insurance",
      location: "Christ Church"
    },
    {
      quote: "Choosing Andrew was the best decision for my family's insurance needs. He took the complexity out of insurance.",
      author: "Carla T.",
      initials: "CT",
      rating: 5,
      service: "Health Insurance",
      location: "St. James"
    },
    {
      quote: "Professional, knowledgeable, and always available when we needed him. Andrew made insurance simple to understand.",
      author: "David and Jennifer M.",
      initials: "DJ",
      rating: 5,
      service: "Home Insurance",
      location: "St. Philip"
    },
    {
      quote: "Andrew's independent approach helped us save money while getting better coverage. Highly recommend!",
      author: "Patricia W.",
      initials: "PW",
      rating: 5,
      service: "Auto Insurance",
      location: "St. Thomas"
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Clients Say
          </h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with Andrew Cave Insurance.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative" role="region" aria-label="Client testimonials carousel">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            aria-label="Client testimonials"
          >
            <CarouselContent 
              className="-ml-2 md:-ml-4"
              role="group"
              aria-live="polite"
              aria-atomic="false"
            >
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                >
                  <article>
                    <Card 
                      className="h-full hover:shadow-xl transition-shadow duration-300 focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2"
                      tabIndex={0}
                      aria-labelledby={`testimonial-author-${index}`}
                      aria-describedby={`testimonial-content-${index}`}
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Quote Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="p-2 bg-brand/10 rounded-full" aria-hidden="true">
                            <Quote className="w-6 h-6 text-brand" />
                          </div>
                        </div>
                        
                        {/* Rating Stars */}
                        <div 
                          className="flex justify-center mb-4" 
                          role="img" 
                          aria-label={`${testimonial.rating} out of 5 stars rating`}
                        >
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                          ))}
                        </div>
                        
                        {/* Testimonial Quote */}
                        <blockquote 
                          id={`testimonial-content-${index}`}
                          className="text-gray-700 italic mb-6 leading-relaxed flex-grow text-center"
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                        
                        <Separator className="mb-4" aria-hidden="true" />
                        
                        {/* Author Info */}
                        <div className="flex items-center justify-center space-x-4">
                          <Avatar className="w-12 h-12" aria-hidden="true">
                            <AvatarFallback className="bg-brand text-white font-semibold">
                              {testimonial.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <div 
                              id={`testimonial-author-${index}`}
                              className="font-semibold text-brand"
                            >
                              {testimonial.author}
                            </div>
                            <div className="text-sm text-gray-500">
                              {testimonial.service} • {testimonial.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              className="hidden md:flex" 
              aria-label="Previous testimonial"
            />
            <CarouselNext 
              className="hidden md:flex" 
              aria-label="Next testimonial"
            />
          </Carousel>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-brand mb-2">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-brand mb-2">5.0</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-brand mb-2">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

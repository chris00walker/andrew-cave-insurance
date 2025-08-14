import Link from 'next/link';
import { Heart, Shield, Home, Building, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function Services() {
  const serviceCategories = [
    {
      id: "personal",
      title: "Personal Insurance",
      icon: Heart,
      badge: "Individual & Family",
      services: [
        {
          title: "Life Insurance",
          description: "Protect your loved ones with comprehensive life insurance coverage.",
          features: [
            "Term Life Insurance",
            "Whole Life Insurance", 
            "Investment-linked Policies",
            "Group Life Coverage"
          ],
          popular: true
        },
        {
          title: "Health & Medical Insurance",
          description: "Ensure your health and wellbeing with the right medical coverage.",
          features: [
            "Individual Health Plans",
            "Family Health Plans",
            "Critical Illness Coverage",
            "Dental & Vision Plans"
          ]
        }
      ]
    },
    {
      id: "property",
      title: "Property Insurance",
      icon: Home,
      badge: "Home & Auto",
      services: [
        {
          title: "Homeowners Insurance",
          description: "Comprehensive protection for your home and personal belongings.",
          features: [
            "Dwelling Coverage",
            "Personal Property Protection",
            "Liability Coverage",
            "Additional Living Expenses"
          ]
        },
        {
          title: "Automobile Insurance",
          description: "Complete auto coverage for peace of mind on the road.",
          features: [
            "Collision Coverage",
            "Comprehensive Coverage",
            "Liability Protection",
            "Uninsured Motorist Coverage"
          ]
        }
      ]
    },
    {
      id: "business",
      title: "Business Insurance",
      icon: Building,
      badge: "Commercial",
      services: [
        {
          title: "General Liability",
          description: "Essential protection for your business operations and activities.",
          features: [
            "Professional Liability",
            "Product Liability",
            "Commercial Property",
            "Workers' Compensation"
          ]
        },
        {
          title: "Business Interruption",
          description: "Protect your business income and ongoing expenses.",
          features: [
            "Lost Income Coverage",
            "Extra Expense Coverage",
            "Extended Period Coverage",
            "Contingent Coverage"
          ]
        }
      ]
    }
  ];

  return (
    <section id="services" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Insurance Solutions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Protection Plans
          </h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Andrew provides carefully tailored insurance solutions to meet each client's unique needs and circumstances.
          </p>
        </div>
        
        {/* Services Tabs */}
        <Tabs defaultValue="personal" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {serviceCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-brand/10 rounded-full">
                        <IconComponent className="h-8 w-8 text-brand" />
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit mx-auto mb-2">
                      {category.badge}
                    </Badge>
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                    <CardDescription>
                      Specialized coverage options designed for your specific needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.services.map((service, index) => (
                        <Card key={index} className="relative">
                          {service.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-brand text-white">
                              Popular
                            </Badge>
                          )}
                          <CardHeader>
                            <CardTitle className="text-lg">{service.title}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="features" className="border-none">
                                <AccordionTrigger className="text-sm font-medium">
                                  Coverage Details
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2">
                                    {service.features.map((feature, featureIndex) => (
                                      <li key={featureIndex} className="text-sm text-gray-700 flex items-center">
                                        <CheckCircle className="h-4 w-4 text-brand mr-2 flex-shrink-0" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
        
        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ready to Protect What Matters Most?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get a personalized insurance quote tailored to your specific needs and budget. 
            Andrew will help you find the perfect coverage combination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand hover:bg-brand/90">
              <Link href="#contact">
                <Shield className="mr-2 h-5 w-5" />
                Get Free Quote
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#about">
                Learn More About Andrew
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

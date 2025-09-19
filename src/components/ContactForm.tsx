'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast-provider';
import { BusinessHoursPopover, ContactInfoPopover, InsuranceBadgeWithTooltip } from '@/components/ui/enhanced-tooltips';
import { CheckCircle2, AlertCircle, Phone, MessageSquare, Clock, MapPin, Zap, Loader2, HelpCircle } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  suffix: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  contactMethod: z.enum(["email", "phone", "either"]),
  insuranceType: z.string().min(1, {
    message: "Please select an insurance type.",
  }),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export default function ContactForm() {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      suffix: 'none',
      email: '',
      phone: '',
      contactMethod: 'email',
      insuranceType: '',
      preferredDate: '',
      preferredTime: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Enhanced error logging
    const logError = (stage: string, error: any) => {
      console.error(`Contact Form Error [${stage}]:`, {
        error: error.message || error,
        stack: error.stack,
        values: { ...values, email: values.email ? '[REDACTED]' : 'missing' },
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        url: typeof window !== 'undefined' ? window.location.href : 'unknown'
      });
    };
    
    try {
      // Pre-flight checks
      if (typeof window === 'undefined') {
        throw new Error('Form submission not available during server-side rendering');
      }

      // Validate environment variables
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        logError('Environment', new Error('Supabase configuration missing'));
        throw new Error('Service configuration error. Please try again later.');
      }

      console.log('Starting form submission...', { timestamp: new Date().toISOString() });

      // Import Supabase services with timeout
      let clientService, communicationService;
      try {
        const importPromise = import('@/lib/supabase');
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Import timeout')), 10000)
        );
        
        const supabaseModule = await Promise.race([importPromise, timeoutPromise]) as typeof import('@/lib/supabase');
        clientService = supabaseModule.clientService;
        communicationService = supabaseModule.communicationService;
        
        console.log('Supabase services imported successfully');
      } catch (importError) {
        logError('Import', importError);
        throw new Error('Failed to load required services. Please refresh and try again.');
      }

      // Attempt client creation with retry logic
      let client = null;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (!client && retryCount < maxRetries) {
        try {
          console.log(`Attempting client creation (attempt ${retryCount + 1}/${maxRetries})`);
          client = await clientService.createFromContactForm(values);
          
          if (client) {
            console.log('Client created successfully:', client.id);
            break;
          } else {
            throw new Error('Client creation returned null');
          }
        } catch (clientError) {
          retryCount++;
          logError(`ClientCreation_Attempt${retryCount}`, clientError);
          
          if (retryCount >= maxRetries) {
            // Try fallback method - direct Supabase call
            try {
              console.log('Attempting fallback client creation...');
              const { supabase } = await import('@/lib/supabase');
              
              const { data: fallbackClient, error: fallbackError } = await supabase
                .from('clients')
                .insert({
                  first_name: values.firstName,
                  last_name: values.lastName,
                  suffix: values.suffix === 'none' ? null : values.suffix,
                  email: values.email,
                  phone: values.phone,
                  contact_method: values.contactMethod,
                  insurance_type: values.insuranceType,
                  preferred_date: values.preferredDate || null,
                  preferred_time: values.preferredTime || null,
                  additional_info: values.additionalInfo || null,
                  source: 'Website Contact Form (Fallback)'
                })
                .select()
                .single();
              
              if (fallbackError) {
                throw fallbackError;
              }
              
              client = fallbackClient;
              console.log('Fallback client creation successful:', client.id);
              break;
            } catch (fallbackError) {
              logError('FallbackClientCreation', fallbackError);
              throw new Error('Unable to save your information. Please try again or contact us directly.');
            }
          } else {
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      }

      if (!client) {
        throw new Error('Failed to create client record after all attempts');
      }

      // Attempt communication logging (non-critical)
      try {
        console.log('Logging communication...');
        await communicationService.log({
          client_id: client.id,
          communication_type: 'email',
          direction: 'inbound',
          subject: `New Contact Form Submission - ${values.insuranceType}`,
          content: `Contact form submission from ${values.firstName} ${values.lastName}. Interest: ${values.insuranceType}. Additional info: ${values.additionalInfo || 'None provided'}`,
          status: 'completed'
        });
        console.log('Communication logged successfully');
      } catch (logError) {
        // Log the error but don't fail the submission
        console.warn('Communication logging failed (non-critical):', logError);
      }

      // Notification will be automatically triggered by database webhook
      console.log('Client created successfully. Webhook notification will be triggered automatically.');

      // Success!
      console.log('Form submission completed successfully');
      setSubmitStatus('success');
      addToast({
        type: 'success',
        title: 'Message Sent Successfully!',
        description: 'Thank you for contacting us. Andrew will get back to you within 24 hours.',
        duration: 6000
      });
      form.reset();
      
    } catch (error) {
      logError('General', error);
      setSubmitStatus('error');
      
      // Provide more specific error messages
      let errorMessage = 'There was an error sending your message. Please try again or call us directly.';
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      if (errorMsg.includes('configuration')) {
        errorMessage = 'Service temporarily unavailable. Please try again in a few minutes or call us directly.';
      } else if (errorMsg.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (errorMsg.includes('network') || errorMsg.includes('Network')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      addToast({
        type: 'error',
        title: 'Message Failed to Send',
        description: errorMessage,
        duration: 10000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 bg-gray-50">
      <div className="bg-neutral-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto border border-neutral-silver">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6">
            Professional Insurance Services
          </Badge>
          <h2 className="font-authority text-section md:text-hero font-bold text-text-authority mb-6 leading-tight">
            Secure Your Family&apos;s Future
            <span className="block text-caribbean-teal font-authority text-subsection mt-2">Free Professional Consultation</span>
          </h2>
          <p className="font-professional text-body md:text-body-large text-text-professional max-w-3xl mx-auto leading-relaxed">
            Take the first step toward comprehensive protection. Andrew Cave will personally review your needs and recommend 
            <span className="text-wealth-gold font-semibold"> tailored insurance solutions</span> that fit your budget and goals.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-6">
            <Separator className="mb-4" />
            <div className="flex items-center text-text-professional">
              <CheckCircle2 className="w-5 h-5 text-wealth-green mr-2" />
              <Badge variant="outline" className="font-professional text-body-small font-medium">
                Free Consultation
              </Badge>
            </div>
            <div className="flex items-center text-text-professional">
              <CheckCircle2 className="w-5 h-5 text-wealth-green mr-2" />
              <Badge variant="outline" className="font-professional text-body-small font-medium">
                No Obligation
              </Badge>
            </div>
            <div className="flex items-center text-text-professional">
              <CheckCircle2 className="w-5 h-5 text-wealth-green mr-2" />
              <Badge variant="outline" className="font-professional text-body-small font-medium">
                Licensed Professional
              </Badge>
            </div>
          </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section aria-labelledby="contact-form-section">
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle id="contact-form-section">Contact Information</CardTitle>
                <CardDescription>
                  Fill out the form below and Andrew will get back to you within 2 business hours.
                </CardDescription>
              </CardHeader>
            <CardContent className="px-0">
              {submitStatus === 'success' && (
                <Alert className="mb-6">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Thank you for your inquiry! Andrew will be in touch soon.
                  </AlertDescription>
                </Alert>
              )}
              
              {submitStatus === 'error' && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was an error submitting your request. Please try again.
                  </AlertDescription>
                </Alert>
              )}
            
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="space-y-6"
                  noValidate
                  aria-label="Contact Andrew Cave Insurance"
                  role="form"
                >
                  {/* Name Fields */}
                  <fieldset className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <legend className="sr-only">Personal Information</legend>
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel className="font-professional text-body-small font-semibold text-text-authority">
                              First Name *
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="First name" 
                                {...field}
                                aria-invalid={fieldState.invalid}
                                aria-describedby={fieldState.error ? `firstName-error` : undefined}
                                autoComplete="given-name"
                              />
                            </FormControl>
                            <FormMessage 
                              id="firstName-error"
                              role="alert"
                              aria-live="polite"
                            />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-professional text-body-small font-semibold text-text-authority">
                              Last Name *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <FormField
                        control={form.control}
                        name="suffix"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-professional text-body-small font-semibold text-text-authority">
                              Title
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="None" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="Mr.">Mr.</SelectItem>
                                <SelectItem value="Mrs.">Mrs.</SelectItem>
                                <SelectItem value="Ms.">Ms.</SelectItem>
                                <SelectItem value="Dr.">Dr.</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="sr-only">
                              Optional title or honorific
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>
              
                  {/* Email Field - Full Width */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll use this to send you your consultation details.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              
                  {/* Phone and Contact Method */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(246) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Preferred Contact Method *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="either">Either is fine</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
            
                  <FormField
                    control={form.control}
                    name="insuranceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Insurance Type *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select insurance type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="life">Life Insurance</SelectItem>
                            <SelectItem value="critical_illness">Critical Illness Insurance</SelectItem>
                            <SelectItem value="personal_accident">Personal Accident Insurance</SelectItem>
                            <SelectItem value="health">Health & Medical Insurance</SelectItem>
                            <SelectItem value="pensions">Pensions & Retirement Planning</SelectItem>
                            <SelectItem value="property">Property & Casualty Insurance</SelectItem>
                            <SelectItem value="business">Business Insurance</SelectItem>
                            <SelectItem value="multiple">Multiple Coverage Types</SelectItem>
                            <SelectItem value="consultation">General Insurance Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the type of insurance coverage you're interested in.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              
                {/* Appointment Scheduling Section */}
                <div className="pt-6">
                  <Separator className="mb-6" />
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-caribbean-teal" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Schedule Your Consultation
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Preferred Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Select your preferred consultation date (optional).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Preferred Time
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select preferred time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select your preferred consultation time (optional).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>
                  </div>
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Additional Information
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell us about your specific insurance needs, current coverage, family situation, or any questions you have..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Share any additional details that will help us provide better recommendations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand to-brand-light hover:from-brand-light hover:to-brand text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Submitting...
                    </>
                  ) : (
                    'Get Your Free Consultation'
                  )}
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-500">
                    By submitting this form, you agree to be contacted by Andrew Cave Insurance regarding your inquiry.
                  </p>
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Your information is secure and will never be shared with third parties.
                  </p>
                </div>
              </form>
            </Form>
            </CardContent>
          </Card>
          </section>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-caribbean-teal" />
                  Get In Touch Directly
                </CardTitle>
                <CardDescription>
                  Multiple ways to connect with Andrew Cave Insurance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Google Maps Integration */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-brand" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Office Location</h4>
                        <p className="text-gray-600">Guardian Group Office, Bridgetown, Barbados</p>
                      </div>
                    </div>
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-brand to-brand-light hover:from-brand-light hover:to-brand"
                    >
                      <a 
                        href="https://maps.google.com/?q=Guardian+Group+Office+Bridgetown+Barbados" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        View on Google Maps
                      </a>
                    </Button>
                  </CardContent>
                </Card>
            
                {/* Contact Methods */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <Card className="group hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <a href="tel:+1246XXXXXXX" className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Phone className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Call Now</h4>
                          <p className="text-gray-600">(246) XXX-XXXX</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                  
                  {/* WhatsApp */}
                  <Card className="group hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <a 
                        href="https://wa.me/1246XXXXXXX?text=Hi%20Andrew,%20I%27m%20interested%20in%20learning%20more%20about%20your%20insurance%20services." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <MessageSquare className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">WhatsApp</h4>
                          <p className="text-gray-600">Message instantly</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </div>
            

                {/* Business Hours */}
                <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Business Hours</h4>
                        <div className="space-y-1 text-gray-600">
                          <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                          <p><span className="font-medium">Saturday:</span> By appointment</p>
                          <p><span className="font-medium">Sunday:</span> Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Quick Response Promise */}
                <Card className="bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Zap className="h-8 w-8 text-brand" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand text-lg">Quick Response Guarantee</h4>
                        <p className="text-gray-700">We respond to all inquiries within 2 business hours during office hours.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

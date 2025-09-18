'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Users, 
  Building, 
  FileText,
  Info,
  HelpCircle,
  Star
} from 'lucide-react';

// Enhanced Contact Button with Tooltip
export function ContactButtonWithTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="bg-gradient-to-r from-brand to-brand-light">
          <Phone className="w-4 h-4 mr-2" />
          Contact Andrew
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Get expert insurance advice from a licensed broker</p>
      </TooltipContent>
    </Tooltip>
  );
}

// Insurance Badge with Tooltip
export function InsuranceBadgeWithTooltip({ type, description }: { type: string; description: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="secondary" className="cursor-help">
          <Shield className="w-3 h-3 mr-1" />
          {type}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// Business Hours Popover
export function BusinessHoursPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-brand hover:text-brand-light">
          <Clock className="w-4 h-4 mr-2" />
          Business Hours
          <Info className="w-3 h-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Office Hours</h4>
            <p className="text-sm text-muted-foreground">
              Andrew Cave Insurance operating hours
            </p>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Monday - Friday</span>
              <Badge variant="outline">9:00 AM - 5:00 PM</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Saturday</span>
              <Badge variant="outline">9:00 AM - 1:00 PM</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Sunday</span>
              <Badge variant="secondary">Closed</Badge>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Emergency claims support available 24/7
            </p>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-brand" />
              <span className="text-xs">Emergency: +1 (246) XXX-XXXX</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// License Information Popover
export function LicenseInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-brand hover:text-brand-light">
          <Award className="w-4 h-4 mr-2" />
          Licensed Broker
          <Info className="w-3 h-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Professional Credentials</h4>
            <p className="text-sm text-muted-foreground">
              Andrew Cave's insurance licenses and certifications
            </p>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="default">
                <Shield className="w-3 h-3 mr-1" />
                Licensed
              </Badge>
              <span className="text-sm">Independent Insurance Broker</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                <Building className="w-3 h-3 mr-1" />
                Registered
              </Badge>
              <span className="text-sm">Barbados Insurance Association</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">
                <Users className="w-3 h-3 mr-1" />
                Member
              </Badge>
              <span className="text-sm">Caribbean Insurance Brokers</span>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">15+ Years Experience</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Specializing in life, health, and business insurance solutions for Barbadian families and businesses.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Insurance Coverage Help Popover
export function CoverageHelpPopover({ coverageType }: { coverageType: string }) {
  const getCoverageInfo = (type: string) => {
    switch (type) {
      case 'life':
        return {
          title: 'Life Insurance Coverage',
          description: 'Financial protection for your loved ones',
          benefits: [
            'Death benefit protection',
            'Cash value accumulation',
            'Tax advantages',
            'Estate planning benefits'
          ]
        };
      case 'health':
        return {
          title: 'Health Insurance Coverage',
          description: 'Comprehensive medical care protection',
          benefits: [
            'Medical expenses coverage',
            'Prescription drug benefits',
            'Preventive care',
            'Emergency services'
          ]
        };
      case 'business':
        return {
          title: 'Business Insurance Coverage',
          description: 'Protect your business operations',
          benefits: [
            'General liability protection',
            'Property damage coverage',
            'Business interruption',
            'Employee benefits'
          ]
        };
      default:
        return {
          title: 'Insurance Coverage',
          description: 'Comprehensive protection solutions',
          benefits: [
            'Risk assessment',
            'Coverage analysis',
            'Claims support',
            'Policy management'
          ]
        };
    }
  };

  const info = getCoverageInfo(coverageType);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-brand" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{info.title}</h4>
            <p className="text-sm text-muted-foreground">{info.description}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Key Benefits:</h5>
            <ul className="space-y-1">
              {info.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Shield className="w-3 h-3 text-green-600" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button asChild size="sm" className="flex-1">
              <Link href="/questionnaire">
                <FileText className="w-3 h-3 mr-1" />
                Get Quote
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-3 h-3 mr-1" />
              Call Now
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Contact Information Popover
export function ContactInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Phone className="w-4 h-4 mr-2" />
          Contact Info
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Get in Touch</h4>
            <p className="text-sm text-muted-foreground">
              Multiple ways to reach Andrew Cave Insurance
            </p>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-xs text-muted-foreground">+1 (246) XXX-XXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-muted-foreground">info@andrewcaveinsurance.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-brand" />
              <div>
                <p className="text-sm font-medium">Office</p>
                <p className="text-xs text-muted-foreground">Guardian Group Office, Bridgetown</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <Mail className="w-3 h-3 mr-1" />
              Send Email
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MapPin className="w-3 h-3 mr-1" />
              Get Directions
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

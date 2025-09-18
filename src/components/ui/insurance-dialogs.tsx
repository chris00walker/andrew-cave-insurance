'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText, Shield } from 'lucide-react';

// Quick Quote Dialog
export function QuickQuoteDialog() {
  return (
    <Button asChild className="bg-gradient-to-r from-brand to-brand-light">
      <Link href="/questionnaire">
        <FileText className="w-4 h-4 mr-2" />
        Get Quote
      </Link>
    </Button>
  );
}

// Schedule Consultation Dialog
export function ScheduleConsultationDialog() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    message: ''
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-brand" />
            Schedule Free Consultation
          </DialogTitle>
          <DialogDescription>
            Book a complimentary consultation with Andrew Cave to discuss your insurance needs and get expert advice.
          </DialogDescription>
        </DialogHeader>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="consult-name">Full Name</Label>
              <Input
                id="consult-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consult-email">Email</Label>
              <Input
                id="consult-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consult-phone">Phone Number</Label>
            <Input
              id="consult-phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (246) XXX-XXXX"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="consult-date">Preferred Date</Label>
              <Input
                id="consult-date"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consult-time">Preferred Time</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consult-type">Consultation Type</Label>
            <Select value={formData.consultationType} onValueChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Insurance Review</SelectItem>
                <SelectItem value="life">Life Insurance Planning</SelectItem>
                <SelectItem value="business">Business Insurance</SelectItem>
                <SelectItem value="health">Health Insurance</SelectItem>
                <SelectItem value="claims">Claims Assistance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consult-message">What would you like to discuss?</Label>
            <Textarea
              id="consult-message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Briefly describe your insurance needs or questions..."
              rows={3}
            />
          </div>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">What to Expect</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Comprehensive review of your current coverage</li>
                    <li>• Personalized recommendations based on your needs</li>
                    <li>• Competitive quotes from multiple insurers</li>
                    <li>• No obligation - completely free consultation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-gradient-to-r from-brand to-brand-light">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consultation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Insurance Info Dialog
export function InsuranceInfoDialog({ type, title, description, children }: {
  type: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-brand" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {type === 'life' && (
                <>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Financial protection for your family
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Tax-advantaged savings and investment
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Estate planning benefits
                  </div>
                </>
              )}
              {type === 'health' && (
                <>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Comprehensive medical coverage
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Access to quality healthcare
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Preventive care benefits
                  </div>
                </>
              )}
              {type === 'business' && (
                <>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Business continuity protection
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Liability coverage
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-green-600 mr-2" />
                    Employee benefits packages
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Licensed Provider</Badge>
            <Badge variant="secondary">Competitive Rates</Badge>
            <Badge variant="secondary">Local Support</Badge>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <QuickQuoteDialog />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

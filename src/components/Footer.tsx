import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Facebook, Linkedin, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-white">Andrew Cave Insurance</h3>
              <Badge variant="secondary" className="text-xs">
                Licensed
              </Badge>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Licensed Independent Insurance Agent providing comprehensive coverage solutions for individuals and businesses across Barbados.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-caribbean-teal" />
                <div>
                  <p>Guardian Group Office</p>
                  <p>Bridgetown, Barbados</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                  Licensed Insurance Broker
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <Link href="/">
                  Home
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <a href="/#about">
                  About
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <a href="/#services">
                  Services
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <Link href="/blog">
                  Blog
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <a href="/#contact">
                  Contact
                </a>
              </Button>
            </div>
          </div>
          
          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal & Support</h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <a href="/privacy-policy">
                  Privacy Policy
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <a href="/terms-of-service">
                  Terms of Service
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <a href="/disclaimer">
                  Disclaimer
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-2 h-auto">
                <a href="/#contact">
                  Support
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Social Media & Bottom Section */}
        <Separator className="mt-8 bg-gray-700" />
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 text-sm">Follow us:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-blue-500 hover:bg-gray-800 p-2">
                  <a 
                    href="https://facebook.com/andrewcaveinsurance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-blue-600 hover:bg-gray-800 p-2">
                  <a 
                    href="https://linkedin.com/in/andrewcave" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-pink-500 hover:bg-gray-800 p-2">
                  <a 
                    href="https://instagram.com/andrewcaveinsurance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-red-500 hover:bg-gray-800 p-2">
                  <a 
                    href="https://youtube.com/@andrewcaveinsurance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Andrew Cave Insurance. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-end gap-2 mt-1">
                <Badge variant="outline" className="text-xs text-gray-500 border-gray-600">
                  Licensed Independent Insurance Broker
                </Badge>
                <span className="text-gray-500 text-xs">serving Barbados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const services = [
  {
    title: "Life Insurance",
    href: "/#services",
    description: "Protect your family's financial future with comprehensive life insurance coverage."
  },
  {
    title: "Business Insurance",
    href: "/#services", 
    description: "Safeguard your business with tailored commercial insurance solutions."
  },
  {
    title: "Health Insurance",
    href: "/#services",
    description: "Comprehensive health coverage for individuals and families."
  },
  {
    title: "Property Insurance",
    href: "/#services",
    description: "Protect your home and personal property with reliable coverage."
  }
];

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 bg-gradient-to-r from-brand to-brand-light shadow-lg z-50 backdrop-blur-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link href="/" className="text-white font-authority font-bold text-card-title hover:text-caribbean-teal transition-colors duration-200">
          Andrew Cave Insurance
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/" 
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white font-professional"
                    aria-label="Go to homepage"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="text-white hover:text-caribbean-teal font-professional font-medium bg-transparent hover:bg-white/10"
                  aria-label="Insurance services menu"
                  aria-describedby="services-description"
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div id="services-description" className="sr-only">
                    Browse our comprehensive insurance services including life, health, business, and property insurance
                  </div>
                  <ul 
                    className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                    role="menu"
                    aria-label="Insurance services"
                  >
                    {services.map((service, index) => (
                      <li key={service.title} role="none">
                        <NavigationMenuLink asChild>
                          <Link 
                            href={service.href} 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            role="menuitem"
                            tabIndex={index === 0 ? 0 : -1}
                            aria-describedby={`service-desc-${index}`}
                          >
                            <div className="text-sm font-medium leading-none">{service.title}</div>
                            <p 
                              id={`service-desc-${index}`}
                              className="line-clamp-2 text-sm leading-snug text-muted-foreground"
                            >
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#about" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white font-professional">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#testimonials" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white font-professional">
                    Testimonials
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/blog" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white font-professional">
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button asChild variant="secondary" className="bg-caribbean-teal hover:bg-caribbean-teal/90 text-white">
            <Link href="/questionnaire">Get Quote</Link>
          </Button>
        </div>
        
        {/* Enhanced Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:bg-white/20 focus:ring-2 focus:ring-caribbean-teal focus:ring-offset-2"
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="mobile-navigation"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[400px]"
            id="mobile-navigation"
            aria-label="Mobile navigation menu"
          >
            <SheetHeader>
              <SheetTitle className="text-left">
                Andrew Cave Insurance
              </SheetTitle>
              <SheetDescription className="text-left text-sm text-muted-foreground">
                Navigate to different sections of our website
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-6">
              <SheetClose asChild>
                <Link href="/" className="flex items-center py-2 text-lg font-semibold">
                  Home
                </Link>
              </SheetClose>
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Services</h4>
                {services.map((service) => (
                  <SheetClose asChild key={service.title}>
                    <Link href={service.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                      {service.title}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <Separator />
              
              <SheetClose asChild>
                <Link href="/#about" className="flex items-center py-2 text-lg font-semibold">
                  About
                </Link>
              </SheetClose>
              <Separator />
              
              <SheetClose asChild>
                <Link href="/#testimonials" className="flex items-center py-2 text-lg font-semibold">
                  Client Stories
                </Link>
              </SheetClose>
              <Separator />
              
              <SheetClose asChild>
                <Link href="/blog" className="flex items-center py-2 text-lg font-semibold">
                  Blog
                </Link>
              </SheetClose>
              <Separator />
              
              <SheetClose asChild>
                <Button asChild className="w-full bg-caribbean-teal hover:bg-caribbean-teal/90 text-white">
                  <Link href="/questionnaire">Get Quote</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

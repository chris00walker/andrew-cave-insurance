import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BenefitsGrid from '@/components/BenefitsGrid';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Enhanced Skip Navigation Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[100] flex gap-2">
        <a 
          href="#main-content" 
          className="bg-brand text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-caribbean-teal focus:ring-offset-2 font-professional font-medium transition-all duration-200 hover:bg-brand/90"
          aria-label="Skip to main content section"
        >
          Skip to main content
        </a>
        <a 
          href="#services" 
          className="bg-caribbean-teal text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-brand focus:ring-offset-2 font-professional font-medium transition-all duration-200 hover:bg-caribbean-teal/90"
        >
          Skip to services
        </a>
        <a 
          href="#contact" 
          className="bg-wealth-gold text-brand px-4 py-2 rounded-md focus:ring-2 focus:ring-brand focus:ring-offset-2 font-professional font-medium transition-all duration-200 hover:bg-wealth-gold/90"
        >
          Skip to contact form
        </a>
      </div>
      
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero />
        <BenefitsGrid />
        <ServicesSection />
        <AboutSection />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

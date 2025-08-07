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
      <Navbar />
      <main>
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

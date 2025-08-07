export default function Hero() {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white pt-20">
      <div className="text-center px-6 max-w-5xl mx-auto">
        {/* Trust Badge */}
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
          <div className="w-2 h-2 bg-caribbean-teal rounded-full mr-2 animate-pulse"></div>
          <span className="text-neutral-warm font-professional text-fine font-medium">Licensed Insurance Broker • Barbados</span>
        </div>
        
        {/* Main Headline - Clean and Impactful */}
        <h1 className="font-authority text-4xl md:text-5xl lg:text-6xl font-bold animate-fadeInUp mb-8 text-white leading-tight">
          Your Family&apos;s
          <span className="block text-caribbean-teal mt-3 relative">
            Financial Security
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-wealth-gold rounded-full"></div>
          </span>
        </h1>
        
        {/* Clean Value Proposition */}
        <p className="font-professional text-body-large md:text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed text-neutral-warm">
          <span className="text-white font-semibold">15+ years</span> protecting Barbadian families with comprehensive insurance solutions.
        </p>
        
        {/* Service Categories - Simplified */}
        <div className="mb-12">
          <p className="text-caribbean-teal font-medium text-body md:text-body-large">
            Life • Health • Business • Retirement Planning
          </p>
        </div>
        
        {/* Trust-Building CTA */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center md:items-center">
          <a 
            href="#contact" 
            className="inline-block bg-wealth-gold hover:bg-wealth-gold/90 text-brand font-professional font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-body-large border-2 border-wealth-gold"
          >
            🛡️ Get Your Free Consultation
          </a>
          <a 
            href="#about" 
            className="inline-block bg-transparent hover:bg-white/10 text-white font-professional font-medium px-8 py-4 rounded-xl transition-all duration-300 border-2 border-white/30 hover:border-caribbean-teal text-body"
          >
            Learn About Andrew
          </a>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
          <div className="text-center">
            <div className="text-caribbean-teal font-authority text-subsection font-bold">15+</div>
            <div className="text-neutral-warm font-professional text-fine">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-caribbean-teal font-authority text-subsection font-bold">500+</div>
            <div className="text-neutral-warm font-professional text-fine">Families Protected</div>
          </div>
          <div className="text-center">
            <div className="text-caribbean-teal font-authority text-subsection font-bold">100%</div>
            <div className="text-neutral-warm font-professional text-fine">Barbadian Owned</div>
          </div>
        </div>
      </div>
    </section>
  );
}

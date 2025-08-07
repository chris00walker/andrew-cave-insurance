export default function Services() {
  const services = [
    {
      title: "Life Insurance",
      description: "Protect your loved ones with comprehensive life insurance coverage.",
      features: [
        "Term Life Insurance",
        "Whole Life Insurance", 
        "Investment-linked Policies"
      ]
    },
    {
      title: "Health & Medical Insurance",
      description: "Ensure your health and wellbeing with the right medical coverage.",
      features: [
        "Individual Health Plans",
        "Family Health Plans",
        "Corporate Health Coverage"
      ]
    },
    {
      title: "Property & Casualty Insurance", 
      description: "Protect your assets and property with comprehensive coverage.",
      features: [
        "Homeowners Insurance",
        "Automobile Insurance",
        "Business Property Insurance"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Insurance Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Andrew provides carefully tailored insurance solutions to meet each client's unique needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-3 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="#contact" 
            className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Request a Personalized Quote
          </a>
        </div>
      </div>
    </section>
  );
}

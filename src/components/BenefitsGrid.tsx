export default function Benefits() {
  const benefits = [
    {
      icon: "👤",
      title: "Personalized Service",
      description: "Tailored insurance solutions that fit your unique needs and circumstances."
    },
    {
      icon: "🎯",
      title: "Expert, Independent Advice",
      description: "Unbiased guidance from a trusted professional with extensive industry experience."
    },
    {
      icon: "⚡",
      title: "Seamless Claims Processing",
      description: "Efficient support when you need it most, making claims simple and stress-free."
    },
    {
      icon: "🛡️",
      title: "Tailored Coverage Options",
      description: "Comprehensive protection designed specifically for your lifestyle and budget."
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

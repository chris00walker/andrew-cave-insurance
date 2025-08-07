export default function Testimonials() {
  const testimonials = [
    {
      quote: "Andrew's professionalism and care transformed our insurance experience. We felt supported at every step.",
      author: "Mark and Alicia P."
    },
    {
      quote: "Fast, clear advice, and genuine care—Andrew is simply the best insurance broker in Barbados.",
      author: "Samuel R."
    },
    {
      quote: "Choosing Andrew was the best decision for my family's insurance needs. He took the complexity out of insurance.",
      author: "Carla T."
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with Andrew Cave Insurance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-gray-700 italic mb-4 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </div>
              <div className="text-brand font-semibold">
                – {testimonial.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

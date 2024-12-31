import React from 'react';

const testimonials = [
  {
    content: "This platform has revolutionized how I manage my healthcare. Booking appointments is now a breeze!",
    author: "Sarah Johnson",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    content: "As a healthcare provider, this system helps me stay organized and provide better care to my patients.",
    author: "Dr. Michael Chen",
    role: "Cardiologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-24" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
          What People Are Saying
        </h2>
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
              <div className="mt-4 flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.author}
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">{testimonial.author}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
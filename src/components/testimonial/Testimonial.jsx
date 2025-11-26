import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Aisha Rahman",
      role: "Verified Buyer",
      image: "/test1.jpeg",
      review:
        "GrabNGo made my shopping faster and easier. The product quality and service were outstanding!",
      rating: 5,
    },
    {
      name: "Jahid Hasan",
      role: "Product Seller",
      image: "/test2.jpeg",
      review:
        "I love how simple it is to add and manage my products. Sales increased after joining GrabNGo!",
      rating: 5,
    },
    {
      name: "Mim Akter",
      role: "Regular Customer",
      image: "/test3.jpeg",
      review:
        "Best e-commerce experience! Smooth checkout and fast delivery every time.",
      rating: 4,
    },
  ];

  return (
    <section className="w-full bg-yellow-300 py-16 px-6 md:px-12 lg:px-20 mt-12 rounded-2xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
        What Our <span className="text-indigo-600">Customers Say</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-8 rounded-2xl shadow hover:shadow-xl transition duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-indigo-600 text-sm font-medium">{item.role}</p>

              <p className="text-gray-600 text-base leading-relaxed">
                {item.review}
              </p>

              {/* Rating */}
              <div className="flex gap-1 justify-center">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
                {[...Array(5 - item.rating)].map((_, i) => (
                  <FaStar key={i} className="text-gray-300 text-xl" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

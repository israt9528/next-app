import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 120,
      image: "/product1.jpeg",
      brand: "Sony",
      category: "Electronics",
    },
    {
      id: 2,
      title: "Analog Wrist Watch",
      price: 80,
      image: "/product2.jpeg",
      brand: "Fossil",
      category: "Fashion",
    },
    {
      id: 3,
      title: "Smartphone Stand",
      price: 25,
      image: "/product3.jpeg",
      brand: "Baseus",
      category: "Accessories",
    },
    {
      id: 4,
      title: "Bluetooth Speaker",
      price: 60,
      image: "/product4.jpeg",
      brand: "JBL",
      category: "Electronics",
    },
  ];

  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-12 lg:px-20 mt-12 rounded-2xl shadow-lg font-serif">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
        Featured <span className="text-indigo-600">Products</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 p-5 cursor-pointer group"
          >
            {/* Image */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3 mt-4">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                {product.brand}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mt-3">
              {product.title}
            </h3>

            {/* Price */}
            <p className="text-indigo-600 font-bold text-xl mt-2">
              ${product.price}
            </p>

            {/* Add to Cart */}
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition">
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

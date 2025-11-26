import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

export default function ProductCard({ product }) {
  const { _id, thumbnail, name, category, Price, brand, stockStatus } = product;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-72 rounded-xl overflow-hidden">
        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover"
        />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-800 line-clamp-2">
        {name}
      </h2>
      <p className="text-sm text-gray-500">Brand: {brand}</p>
      <p className="text-sm text-gray-500">Category: {category}</p>

      <div className="mt-3 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">${Price}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            stockStatus === "In Stock"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {stockStatus}
        </span>
      </div>

      <Link
        href={`/items/${product._id}`}
        className="mt-4 flex items-center justify-center gap-2 border border-indigo-500 hover:bg-white bg-indigo-600 hover:text-indigo-500 text-white py-2 rounded-xl text-sm font-medium transition-all"
      >
        <FiEye className="text-lg" /> View Details
      </Link>
    </div>
  );
}

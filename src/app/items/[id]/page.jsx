import React from "react";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default async function DetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(`/api/products/${id}`);
  const product = await res.json();
  console.log(product);
  const {
    name,
    category,
    brand,
    model,
    thumbnail,
    description,
    Price,
    stockStatus,
    sku,
    barcode,
    colour,
    ownerName,
    ownerEmail,
  } = product;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <Link
        href="/items"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <FiArrowLeft className="text-lg" /> Back
      </Link>

      <div className="bg-white shadow-md rounded-2xl p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden">
          <Image src={thumbnail} alt={name} fill className="object-cover" />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {name}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            {brand} • {category}
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">{description}</p>

          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-semibold">Model:</span> {model}
            </p>
            <p>
              <span className="font-semibold">Color:</span> {colour}
            </p>
            <p>
              <span className="font-semibold">SKU:</span> {sku}
            </p>
            <p>
              <span className="font-semibold">Barcode:</span> {barcode}
            </p>
            <p>
              <span className="font-semibold">Owner:</span> {ownerName} (
              {ownerEmail})
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-bold text-blue-600">${Price}</span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                stockStatus === "In Stock"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {stockStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

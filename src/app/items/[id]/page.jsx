import React from "react";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function DetailsPageContent({ id }) {
  const res = await fetch(`${getBaseUrl()}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok || res.status === 404) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Product Not Found
        </h1>
        <Link href="/items" className="text-blue-600 underline">
          ← Back to Items
        </Link>
      </div>
    );
  }

  const product = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        href="/items"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
      >
        <FiArrowLeft /> Back to Items
      </Link>

      <div className="bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden">
          <Image
            src={product.thumbnail || "/placeholder.jpg"}
            alt={product.name || "Product"}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">
            {product.brand} • {product.category}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="space-y-2 text-gray-700">
            {product.model && (
              <p>
                <strong>Model:</strong> {product.model}
              </p>
            )}
            {product.colour && (
              <p>
                <strong>Color:</strong> {product.colour}
              </p>
            )}
            {product.sku && (
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
            )}
            {product.barcode && (
              <p>
                <strong>Barcode:</strong> {product.barcode}
              </p>
            )}
            {product.ownerName && (
              <p>
                <strong>Owner:</strong> {product.ownerName}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-8">
            <span className="text-3xl font-bold text-blue-600">
              ${product.Price}
            </span>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                product.stockStatus === "In Stock"
                  ? "bg-green-100 text-green-700"
                  : product.stockStatus === "Limited Stock"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stockStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DetailsPage({ params }) {
  const { id } = await params;

  return (
    <React.Suspense
      fallback={<div className="text-center py-20">Loading product...</div>}
    >
      <DetailsPageContent id={id} />
    </React.Suspense>
  );
}

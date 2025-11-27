"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/client";
import { useRouter } from "next/navigation";

export default function ManagePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      {/* --- Table for md+ screens --- */}
      <div className="hidden md:block overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Thumbnail
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-300">
                  <td className="px-4 py-2">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">{product.name}</td>
                  <td className="px-4 py-2 text-sm">{product.category}</td>
                  <td className="px-4 py-2 text-sm">${product.Price}</td>
                  <td className="px-4 py-2 text-sm">{product.stockStatus}</td>
                  <td className="px-4 py-2 mt-5 flex gap-2 items-center">
                    <Link
                      href={`/items/${product._id}`}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      <AiOutlineEye /> View
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                    >
                      <AiOutlineDelete /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Card layout for mobile --- */}
      <div className="md:hidden flex flex-col gap-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="shrink-0">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="mb-2">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                  <p className="text-gray-600 text-sm">${product.Price}</p>
                  <p className="text-gray-600 text-sm">{product.stockStatus}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/items/${product._id}`}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  >
                    <AiOutlineEye /> View
                  </Link>
                  <button
                    // onClick={() => handleDelete(product._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

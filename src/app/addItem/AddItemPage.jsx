"use client";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { auth } from "../firebase/config";

export default function AddItem() {
  const [user, loading] = useAuthState(auth);
  console.log(user);

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    thumbnail: "",
    description: "",
    quantity: 1,
    Price: 0,
    stockStatus: "",
    sku: "",
    barcode: "",
    colour: "",
    ownerName: "",
    ownerEmail: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ownerEmail: user?.email,
      }));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      const numeric =
        value === ""
          ? ""
          : name === "quantity"
          ? parseInt(value, 10)
          : parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: numeric }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const payload = {
      ...formData,
      // Make sure numeric fields are numbers (not empty strings)
      Price: formData.Price === "" ? 0 : Number(formData.Price),
      quantity: formData.quantity === "" ? 0 : Number(formData.quantity),
    };

    let data = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const res = await data.json();
    if (res) {
      alert("Product added!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 md:p-8 ">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <AiOutlinePlusCircle size={28} /> Add New Item
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4  p-5 rounded-xl shadow-2xl bg-white"
      >
        {/* Text Inputs */}
        {[
          "name",
          "category",
          "brand",
          "model",
          "thumbnail",
          "sku",
          "barcode",
          "colour",
          "ownerName",
          "ownerEmail",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold capitalize mb-1">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="border p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required={field !== "colour"} // optional for colour
            />
          </div>
        ))}

        {/* Description full width */}
        <div className="md:col-span-2 flex flex-col">
          <label className="font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter description..."
            className="border p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          ></textarea>
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="font-semibold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            min="1"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-semibold">Price ($)</label>
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        {/* Stock Status */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Stock Status</label>
          <select
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none "
            required
          >
            <option value="">Select stock status</option>
            <option value="In Stock">In Stock</option>
            <option value="Limited Stock">Limited Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

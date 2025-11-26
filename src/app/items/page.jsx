import ProductCard from "@/components/productCard/ProductCard";
import React from "react";

export default async function allItems() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  //   console.log(data);

  return (
    <div className="lg:w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-10">All Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 px-5 justify-items-center">
        {data.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}

import { uri } from "@/lib/dbConnect";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export async function GET(request, { params }) {
  try {
    await mongoose.connect(uri, clientOptions);

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const data = { _id: id };
  await mongoose.connect(uri, clientOptions);
  const result = await Product.deleteOne(data);
  if (result.deletedCount === 0) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, message: "Product deleted" });
}

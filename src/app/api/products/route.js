import { uri } from "@/lib/dbConnect";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export async function GET() {
  try {
    await mongoose.connect(uri, clientOptions);

    const data = await Product.find();
    // console.log(data);

    console.log("MongoDB connected!");
    return NextResponse.json(data);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const data = await request.json();
  await mongoose.connect(uri, clientOptions);
  let product = new Product(data);
  const result = await product.save();
  return NextResponse.json(result);
}

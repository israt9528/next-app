// app/api/products/route.ts
import { uri } from "@/lib/dbConnect";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Global cached connection (persists between Vercel serverless function invocations)
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const options = {
      bufferCommands: false,
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };

    global.mongoose.promise = mongoose
      .connect(uri, options)
      .then((mongoose) => {
        console.log("MongoDB connected (cached)");
        return mongoose;
      });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }

  return global.mongoose.conn;
}

// GET /api/products
export async function GET() {
  try {
    await connectDB();
    const data = await Product.find({}).lean(); // .lean() for better performance
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/products error:", err.message);
    return NextResponse.json(
      { error: "Failed to load products", details: err.message },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request) {
  try {
    const payload = await request.json();
    await connectDB();

    const product = new Product(payload);
    const saved = await product.save();

    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err.message);
    return NextResponse.json(
      { error: "Failed to save product", details: err.message },
      { status: 500 }
    );
  }
}

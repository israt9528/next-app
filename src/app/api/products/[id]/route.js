// app/api/products/[id]/route.jsx   ← MUST be .jsx and use this exact pattern

import { uri } from "@/lib/dbConnect";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Cached connection
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(uri, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
  }
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

// GET — this is the only correct way in .jsx route handlers
export async function GET(request, context) {
  try {
    // This line fixes the "params is a Promise" error
    const params = await context.params;
    const id = params.id;

    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}

// DELETE — same fix here
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const id = params.id;

    await connectDB();

    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

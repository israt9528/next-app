// app/api/products/route.ts
import { uri } from "@/lib/dbConnect";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

let cachedConnection = global.mongoose || { conn: null, promise: null };

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDB() {
  if (cachedConnection.conn) return cachedConnection.conn;

  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(uri, clientOptions)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      });
  }
  cachedConnection.conn = await cachedConnection.promise;
  global.mongoose = cachedConnection;
  return cachedConnection.conn;
}

export async function GET() {
  try {
    await connectDB();
    const data = await Product.find({});
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/products error:", err.message);
    return NextResponse.json(
      { error: "Failed to load products", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    await connectDB();
    const product = new Product(payload);
    const result = await product.save();
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err.message);
    return NextResponse.json(
      { error: "Failed to save product", details: err.message },
      { status: 500 }
    );
  }
}

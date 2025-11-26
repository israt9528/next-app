import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name: String,
  category: String,
  brand: String,
  model: String,
  thumbnail: String,
  description: String,
  quantity: Number,
  Price: Number,
  stockStatus: String,
  sku: String,
  barcode: String,
  colour: String,
  ownerName: String,
  ownerEmail: String,
});

export const Product =
  mongoose.models.products || mongoose.model("products", productModel);

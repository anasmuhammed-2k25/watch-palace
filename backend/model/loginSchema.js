import mongoose from "mongoose";

// USER
export const dataoffuserSchema = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
   role: {
  type: String,
  default: "user",
}
  })
);

// CATEGORY
export const categoryModel = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: { type: String, required: true },
  })
);

// PRODUCT
export const productsModel = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    price: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: String,
    isDelete: { type: Boolean, default: false },
  })
);
import {
  categoryModel,
  dataoffuserSchema,
  productsModel,
} from "../model/loginSchema.js";

import bcrypt from "bcrypt";


// ================= USER =================

// ➤ SIGNUP
export const postsignup = async (req, res) => {
  try {
    const { name, email, password , role} = req.body;

    const exist = await dataoffuserSchema.findOne({ email });
    if (exist) {
      return res.json({ status: false, message: "User exists" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await dataoffuserSchema.create({
      name,
      email,
      password: hashedPassword,
      role:"user"
    });

    res.json({ status: true, data: user });
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({ status: false });
  }
};


// ➤ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await dataoffuserSchema.findOne({ email });

    if (!user) {
      return res.json({ status: false, message: "Invalid login" });
    }

    // 🔐 COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ status: false, message: "Invalid login" });
    }

    res.json({ status: true, data: user });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ status: false });
  }
};

// ➤ GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await dataoffuserSchema.find().select("-password"); // Exclude password from the results
    res.json({ success: true, data: users });
  } catch (err) {
    console.log("Get All Users Error:", err);
    res.status(500).json({ success: false });
  }
};


// ================= PRODUCT =================
// ➤ GET ALL PRODUCTS
export const getProduct = async (req, res) => {
  try {
    const products = await productsModel
      .find({ isDelete: { $ne: true } }) // Filter out deleted products
      .populate("category", "name");

    console.log("PRODUCTS:", products); // debug

    res.json({ success: true, data: products });
  } catch (err) {
    console.log("Get Product Error:", err);
    res.status(500).json({ success: false });
  }
};

// ➤ GET DELETED PRODUCTS
export const getDeletedProducts = async (req, res) => {
  try {
    const products = await productsModel
      .find({ isDelete: true })
      .populate("category", "name");

    res.json({ success: true, data: products });
  } catch (err) {
    console.log("Get Deleted Product Error:", err);
    res.status(500).json({ success: false });
  }
};


// ➤ GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await productsModel
      .findById(req.params.id)
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    console.log("Get Single Product Error:", err);
    res.status(500).json({ success: false });
  }
};


// ➤ ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!req.file) {
      return res.json({ success: false, message: "Image required" });
    }

    const product = await productsModel.create({
      name,
      price: Number(price),
      category,
      image: req.file.filename,
      isDelete: false,
    });

    res.json({ success: true, data: product });
  } catch (err) {
    console.log("Add Product Error:", err);
    res.status(500).json({ success: false });
  }
};


// ➤ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await productsModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" } // ✅ FIXED
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.log("Update Product Error:", err);
    res.status(500).json({ success: false });
  }
};


// ➤ DELETE PRODUCT (SOFT DELETE)
export const deleteProduct = async (req, res) => {
  try {
    await productsModel.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { returnDocument: "after" } // ✅ FIXED
    );

    res.json({ success: true });
  } catch (err) {
    console.log("Delete Product Error:", err);
    res.status(500).json({ success: false });
  }
};


// ➤ RESTORE PRODUCT
export const restoreProduct = async (req, res) => {
  try {
    await productsModel.findByIdAndUpdate(
      req.params.id,
      { isDelete: false },
      { returnDocument: "after" }
    );

    res.json({ success: true });
  } catch (err) {
    console.log("Restore Product Error:", err);
    res.status(500).json({ success: false });
  }
};



// ================= CATEGORY =================

// ➤ ADD CATEGORY
export const addCategory = async (req, res) => {
  try {
    let { name } = req.body;

    if (!name || !name.trim()) {
      return res.json({
        success: false,
        message: "Name required",
      });
    }

    name = name.trim().toLowerCase();

    const exist = await categoryModel.findOne({ name });

    if (exist) {
      return res.json({
        success: false,
        message: "Category already exists",
      });
    }

    const cat = await categoryModel.create({ name });

    res.json({
      success: true,
      data: cat,
    });
  } catch (err) {
    console.log("Add Category Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ➤ GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const data = await categoryModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log("Get Category Error:", err);
    res.status(500).json({
      success: false,
    });
  }
};


// ➤ DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await categoryModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.log("Delete Category Error:", err);
    res.status(500).json({
      success: false,
    });
  }
};
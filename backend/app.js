import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// ================= IMPORT CONTROLLER =================
import {
  addCategory,
  addProduct,
  deleteCategory,
  getCategories,
  getProduct,
  login,
  postsignup,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  getAllUsers,
  getDeletedProducts,
  restoreProduct,
} from "./controller/loginController.js";

const app = express();

// ================= DB CONNECTION (FIXED) =================
// 🔥 Direct connection (NO ENV ERROR)
mongoose
  .connect("mongodb://127.0.0.1:27017/categoryDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error ❌:", err));

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use("/images", express.static(path.join(process.cwd(), "public/images")));

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ================= ROUTES =================

// USER
app.post("/signup", postsignup);
app.post("/login", login);
app.get("/users", getAllUsers);

// CATEGORY
app.get("/categories", getCategories);
app.post("/categories", addCategory);
app.delete("/categories/:id", deleteCategory);

// PRODUCT
app.get("/products/deleted", getDeletedProducts);
app.get("/products", getProduct);
app.get("/products/:id", getSingleProduct);
app.post("/products", upload.single("image"), addProduct);
app.put("/products/:id", upload.single("image"), updateProduct);
app.delete("/products/:id", deleteProduct);
app.put("/products/restore/:id", restoreProduct);

// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
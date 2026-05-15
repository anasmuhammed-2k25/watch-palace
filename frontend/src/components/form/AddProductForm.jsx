import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../input/Input";
import Image from "../Image/image";
import "./form.css";

function AddProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    preview: "",
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  // ✅ FETCH CATEGORIES
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");

      console.log("API DATA:", res.data); // 🔍 debug

      setCategories(res.data.data); // ✅ FIXED
    } catch (err) {
      console.log("Error fetching categories", err);
    }
  };

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function validate() {
    let newErrors = {};

    if (!product.name) newErrors.name = "Product name is required";
    if (!product.price) newErrors.price = "Price is required";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("image", product.image);

      const res = await axios.post(
        "http://localhost:5000/products",
        formData
      );

      alert(res.data.message || "Product Added ✅");

      setProduct({
        name: "",
        price: "",
        category: "",
        image: null,
        preview: "",
      });

    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
      alert("Error adding product ❌");
    }
  }

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <Input name="name" type="text" value={product.name} onChange={handleChange} errors={errors} />
        <Input name="price" type="number" value={product.price} onChange={handleChange} errors={errors} />

        {/* CATEGORY */}
        <div className="inputBox">
          <label>Category</label>

          <select
            name="category"
            onChange={handleChange}
            value={product.category}
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        {/* IMAGE */}
        <div className="inputBox">
          <label>Upload Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setProduct((prev) => ({
                  ...prev,
                  image: file,
                  preview: URL.createObjectURL(file),
                }));
              }
            }}
          />

          {product.preview && (
            <Image src={product.preview} width="80px" height="80px" />
          )}
        </div>

        {errors.image && <p className="error">{errors.image}</p>}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductForm;
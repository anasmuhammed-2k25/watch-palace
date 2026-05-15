import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar/SideBar";
import "../../components/form/form.css"; // Reuse the beautiful form styling!
const API = import.meta.env.VITE_API_URL;


function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    preview: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${API}/products/${id}`
      );

      const data = res.data.data;

      setProduct({
        name: data.name || "",
        price: data.price || "",
        category: data.category?._id || data.category || "",
        image: null,
        preview: data.image
          ? `${API}/images/${data.image}`
          : "",
      });

    } catch (err) {
      console.log("Fetch product error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API}/categories`
      );
      setCategories(res.data.data || []);
    } catch (err) {
      console.log("Fetch categories error:", err);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.category) {
      setError("All fields required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);

      if (product.image) {
        formData.append("image", product.image);
      }

      await axios.put(
        `${API}/products/${id}`,
        formData
      );

      alert("Product Updated ✅");

      navigate("/admin"); 

    } catch (err) {
      console.log("Update error:", err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="adminContainer" style={{ backgroundColor: "var(--color-dark)" }}>
      <Sidebar />
      
      <div className="content">
        <div className="form-container" style={{ minHeight: 'auto', paddingTop: '0', backgroundColor: 'transparent' }}>
          <form className="form-box" onSubmit={handleSubmit} style={{ margin: '0 auto', marginTop: '20px' }}>
            <h2>Edit Product</h2>

            <div className="inputBox">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
            </div>

            <div className="inputBox">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>

            <div className="inputBox">
              <label>Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputBox">
              <label>Update Image</label>
              <input
                type="file"
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
            </div>

            {product.preview && (
              <img
                src={product.preview}
                alt="preview"
                width="100"
                height="100"
                style={{ marginTop: "10px", borderRadius: "8px", border: "1px solid var(--color-gold)", objectFit: "cover" }}
              />
            )}

            {error && <p className="error">{error}</p>}

            <button type="submit" style={{ marginTop: "25px" }}>
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
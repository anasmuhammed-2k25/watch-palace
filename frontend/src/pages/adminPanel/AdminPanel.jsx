import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar/SideBar";
import "./adminPanel.css";
const API = import.meta.env.VITE_API_URL;

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/products/${id}`);

      if (res.data.success) {
        setProducts((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // EDIT PRODUCT
  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <div className="adminContainer">
      <Sidebar />

      <div className="content">
        <div className="dashboardHeader">
          <h2>Dashboard</h2>
          <div className="headerActions">
            <button className="dashboardActionBtn" onClick={() => navigate("/users")}>
              Manage Users
            </button>
            <button className="dashboardActionBtn outlined" onClick={() => navigate("/restore")}>
              Restore Products
            </button>
          </div>
        </div>

        <table className="productTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={`${API}/images/${item.image}`}
                    alt={item.name}
                    width="50"
                    height="50"
                  />
                </td>

                <td>{item.name}</td>
                <td>{item.price}</td>

                {/* FIX: category populate safe check */}
                <td>{item.category?.name || "No Category"}</td>

                <td>
                  <button
                    className="editBtn"
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
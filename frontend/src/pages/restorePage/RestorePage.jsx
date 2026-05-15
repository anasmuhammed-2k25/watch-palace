import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/SideBar";
import "../adminPanel/adminPanel.css"; // Reuse admin panel styling

function RestorePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchDeletedProducts();
  }, []);

  const fetchDeletedProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products/deleted");
      if (res.data.success) {
        setProducts(res.data.data || []);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/products/restore/${id}`);

      if (res.data.success) {
        // Remove item from UI once restored
        setProducts((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log("Restore error:", err);
    }
  };

  return (
    <div className="adminContainer">
      <Sidebar />

      <div className="content">
        <h2>Restore Deleted Products</h2>

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
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/images/${item.image}`}
                      alt={item.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category?.name || "No Category"}</td>
                  <td>
                    <button
                      className="editBtn" // Reusing styling from adminPanel.css but custom functionality
                      onClick={() => handleRestore(item._id)}
                      style={{ color: "#4caf50", borderColor: "#4caf50" }}
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No deleted products to restore.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestorePage;

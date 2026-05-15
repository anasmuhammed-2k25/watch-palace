import { useNavigate } from "react-router-dom";
import "./sideBar.css";



function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">Admin</h2>

      <ul>
        <li onClick={() => navigate("/admin")}>Dashboard</li>
        <li onClick={() => navigate("/AddProduct")}>Add Product</li>
        <li onClick={() => navigate("/AddCatogary")}>Add Category</li>
      </ul>

      
    </div>
  );
}


export default Sidebar;
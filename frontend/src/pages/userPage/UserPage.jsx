import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sideBar/SideBar";
import "../adminPanel/adminPanel.css"; // Reuse admin panel styling

function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      if (res.data.success) {
        setUsers(res.data.data || []);
      }
    } catch (error) {
      console.log("Fetch users error:", error);
    }
  };

  return (
    <div className="adminContainer">
      <Sidebar />

      <div className="content">
        <h2>Registered Users</h2>

        <table className="productTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        backgroundColor: user.role === "admin" ? "var(--color-gold)" : "transparent",
                        color: user.role === "admin" ? "var(--color-dark)" : "var(--color-light)",
                        border: "1px solid var(--color-gold)",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        textTransform: "uppercase"
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserPage;

import { useEffect, useState } from "react";
import axios from "axios";
import "./AddCategory.css";
const API = import.meta.env.VITE_API_URL;

function AddCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories`);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/categories`, {
        name,
      });

      setName("");
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };
const handleDelete = async (id) => {
  try {
    await axios.delete(`${API}/categories/${id}`);
    fetchCategories();
  } catch (err) {
    console.log(err);
  }
};

 return (
  <div className="category-page">
    <h2>Add Category</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter category"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>

    <h3>Categories</h3>

    <ul>
      {categories?.map((cat) => (
        <li key={cat._id}>
          {cat.name}
          <button onClick={() => handleDelete(cat._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default AddCategory;
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import AddProduct from "./pages/addProduct/AddProduct";
import AddCategory from "./pages/AddCatogary/AddCatogary";
import EditPage from "./pages/EditPage/EditPage";
import Signup from "./pages/signupPage/Signup";
import ProductPage from "./pages/ProductPage/ProductPage";
import RestorePage from "./pages/restorePage/RestorePage";
import UserPage from "./pages/userPage/UserPage";
import CartPage from "./pages/cartPage/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* PRODUCT */}
        <Route path="/addproduct" element={<AddProduct />} />

        {/* CATEGORY */}
        <Route path="/AddCatogary" element={<AddCategory />} />

        {/* EDIT PRODUCT */}
        <Route path="/editproduct/:id" element={<EditPage />} />
        
        {/* {productPage} */}
        <Route path="/productList" element={<ProductPage />} />

        {/* RESTORE & USERS */}
        <Route path="/restore" element={<RestorePage />} />
        <Route path="/users" element={<UserPage />} />

        {/* CART */}
        <Route path="/cart" element={<CartPage />} />

      </Routes>
    </Router>
  );
}

export default App;
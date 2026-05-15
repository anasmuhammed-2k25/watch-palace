import Button from "../button/Button.jsx";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";

const Nav = () => {
  const navigate = useNavigate();
  const { getCartCount } = useContext(CartContext);


  return (
    <div className="navbar-container">
      <nav className="navbar fade-up">

        <div className="logo">L'AURA</div>

        <ul className="nav-links delay-100">
          <li onClick={() => navigate("/productList")}>Collections</li>
          <li>Bestsellers</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div className="nav-actions delay-200">
          <Button
            text={`Cart (${getCartCount()})`}
            onClick={() => navigate("/cart")}
            className="nav-shop-btn"
            bgcolor="transparent"
            color="var(--color-gold)"
          />
          <Button
            text="Discover"
            onClick={() => navigate("/login")}
            className="nav-shop-btn"
            bgcolor="transparent"
            color="var(--color-gold)"
          />
        </div>

      </nav>
    </div>
  );
};

export default Nav;
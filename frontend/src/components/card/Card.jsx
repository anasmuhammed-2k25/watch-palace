import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Card.css";

function Card({ id, title, price, image, category }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuy = (e) => {
    e.stopPropagation();
    addToCart({ _id: id, name: title, price, image, category });
    navigate("/cart");
  };

  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt={title} />
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-category">{category}</p>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
          <p className="card-price" style={{marginBottom: 0}}>₹{price}</p>
          <button 
            className="buy-btn" 
            onClick={handleBuy}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
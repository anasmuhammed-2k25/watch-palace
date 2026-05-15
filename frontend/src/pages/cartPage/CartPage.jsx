import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Nav from "../../components/nav/Nav";
import "./cartPage.css";

function CartPage() {
  const { cart, removeFromCart, getCartTotal } = useContext(CartContext);

  return (
    <div className="cartContainer">
      <Nav />
      <div className="cartContent">
        <h1 className="cartTitle">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="cartEmptyState">
            <p>Your cart is currently empty.</p>
            <p className="cartSubtext">Explore our collections to find your perfect scent.</p>
            <a href="/productList" className="continueBrowsingBtn">
              Continue Browsing
            </a>
          </div>
        ) : (
          <div className="cartFilledState">
            <div className="cartItemsList">
              {cart.map((item) => (
                <div key={item._id} className="cartItem">
                  <div className="cartItemImg">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cartItemDetails">
                    <h3>{item.name}</h3>
                    <p className="cartItemCategory">{item.category}</p>
                    <p className="cartItemPrice">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="cartItemActions">
                    <span className="cartItemQty">Qty: {item.quantity}</span>
                    <p className="cartItemSubtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                    
                    <button 
                      className="cartItemRemoveBtn" 
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cartSummary">
              <h2>Order Summary</h2>
              <div className="summaryRow">
                <span>Subtotal</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summaryRow">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <hr />
              <div className="summaryRow totalRow">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <button className="checkoutBtn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;

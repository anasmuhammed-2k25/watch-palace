import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Nav from "../../components/nav/Nav";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./homePage.css";

import luxuryPerfumeBottle from "../../assets/luxury_perfume_bottle.png";

const Home = () => {
  useScrollReveal();

  const [scrollY, setScrollY] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ added
  const [error, setError] = useState(""); // ✅ added

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");

        console.log("API:", res.data);

        if (res.data && res.data.success) {
          setProducts(res.data.data.slice(0, 3)); // ✅ featured (top 3)
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ SCROLL
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page">
      <Nav />

      {/* HERO */}
      <section className="hero-section">
        <img
          src={luxuryPerfumeBottle}
          alt="Luxury Perfume"
          className="hero-bg"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="subtitle">Discover Your True Essence</p>
          <h1>Signature Scent</h1>
          <div className="hero-buttons">
            <button className="btn primary">Shop Now</button>
            <button className="btn secondary">Explore Collection</button>
          </div>
        </div>
      </section>


      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-text">
            <h2>Our Heritage</h2>
            <p>
              At L'AURA, we believe that a fragrance is more than just a scent—it is a reflection of one's soul, an invisible yet unforgettable signature. 
            </p>
            <p>
              Since our inception, we have traveled the world to source the rarest botanicals and finest extracts. Our master perfumers blend these precious ingredients with uncompromising precision, ensuring every bottle tells a story of elegance and emotion.
            </p>
            <button className="btn secondary" style={{ marginTop: "20px" }}>Discover Our Story</button>
          </div>
          <div className="about-image">
            <img src={luxuryPerfumeBottle} alt="About L'AURA Perfume" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>The Art of Perfumery</h2>
        <div className="feature-container">
          <div className="feature-card">
            <h3>Finest Ingredients</h3>
            <p>Sourced from the world's most pristine locations to craft authentic, pure scents.</p>
          </div>
          <div className="feature-card">
            <h3>Master Craftsmanship</h3>
            <p>Hand-blended by expert artisans who pour their soul into every single drop.</p>
          </div>
          <div className="feature-card">
            <h3>Enduring Legacy</h3>
            <p>A profound aroma that lingers, ensuring your presence is felt long after you leave.</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="items-section">
        <h2>Featured Collection</h2>

        <div className="items-grid">
          {/* ✅ LOADING */}
          {loading && <p>Loading products...</p>}

          {/* ✅ ERROR */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* ✅ PRODUCTS */}
          {!loading && !error && products.length > 0 &&
            products.map((product) => (
              <div key={product._id} className="item-card">
                <div className="item-image-container">
                  <img
                    src={
                      product.image
                        ? `http://localhost:5000/images/${product.image}`
                        : luxuryPerfumeBottle
                    }
                    alt={product.name}
                  />
                </div>

                <div className="item-info">
                  <h4>{product.name}</h4>

                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                    <p className="item-price" style={{marginBottom: 0}}>
                      ₹{product.price ? product.price.toFixed(2) : "0.00"}
                    </p>
                    <button 
                      className="buy-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          _id: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                            ? `http://localhost:5000/images/${product.image}`
                            : luxuryPerfumeBottle,
                          category: product.category?.name
                        });
                        navigate("/cart");
                      }}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: 'transparent',
                        color: 'var(--color-gold)',
                        border: '1px solid var(--color-gold)',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem'
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* ✅ EMPTY */}
          {!loading && !error && products.length === 0 && (
            <p>No featured products found</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Elevate Your Senses Today</h2>
        <button className="btn primary">Discover More</button>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} L'AURA Perfumes</p>
      </footer>
    </div>
  );
};

export default Home;
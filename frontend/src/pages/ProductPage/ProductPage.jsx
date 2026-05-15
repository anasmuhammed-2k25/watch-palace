import { useEffect, useState } from "react";
import axios from "axios";

import "./ProductPage.css";
import Nav from "../../components/nav/Nav";
import Card from "../../components/card/Card";

const API = import.meta.env.VITE_API_URL;

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);

        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Nav /> {/* ✅ NAV BAR */}

      <div className="product-page fade-up">
        <h2 className="page-title fade-up delay-100">All Products</h2>

        <div className="product-grid fade-up delay-200">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                image={
                  product.image
                    ?`${API}/images/${product.image}`
                    : ""
                }
                category={product.category?.name}
              />
            ))
          ) : (
            <p className="empty">No products found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './Profile.css';

const Profile = () => {
  const [products, setProducts] = useState([]);
  const username = localStorage.getItem("username"); 
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/userProducts", {
          params: { username },
        });
        // Ensure response.data.viewedProducts is populated correctly
        setProducts(response.data.viewedProducts || []);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchProducts();
  }, [username]);

  return (
    <div className="profile-container">
      <h1>Welcome, {username}!</h1>
      <h2>Your Recently Analyzed Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.productImage} // Corrected property name
                alt={product.productName} // Corrected property name
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.productName}</h3> {/* Corrected property name */}
                <p>Price: {product.productPrice}</p> {/* Corrected property name */}
                <p>Rating: {product.productRating}</p> {/* Corrected property name */}
                <a
                  href={product.productLink} // Corrected property name
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-link"
                >
                  View Product
                </a>
              </div>
              <button
                className="reanalyze-button"
                onClick={() => {
                  // Navigate to ProductDetail page, passing product data as state
                  navigate("/product", { state: { product: product } });
                }}
              >
                Re-analyze
              </button>
            </div>
          ))
        ) : (
          <p>You haven't analyzed any products yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

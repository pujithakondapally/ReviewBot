import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, username }) => {
  const navigate = useNavigate();

  const handleReanalyse = () => {
    navigate("/product", { state: { product } });
  };

  return (
    <div className="product-card">
      {product.image && <img src={product.image} alt={product.name} className="product-card-image" />}
      <div className="product-card-info">
        <h2 className="product-card-title">{product.name}</h2>
        <p className="product-card-username">Searched by: {username}</p>
        <button onClick={handleReanalyse} className="product-card-button">
          Re-analyze
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

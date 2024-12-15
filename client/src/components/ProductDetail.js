import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const [message, setMessage] = useState("");

  if (!product) {
    return <div>Loading...</div>;
  }

  const { image, name, price, sumRes, pos, neg, high, rating, reviews } = product;

  const chartData = {
    series: [
      {
        data: [
          { id: 0, value: pos, label: "Positive" },
          { id: 1, value: neg, label: "Negative" },
        ],
      },
    ],
  };

  return (
    <div className="prod-container">
      <div className="prod-wrapper">
        <div className="prod-card">
          <div className="prod-main">
            <div className="prod-image-container">
              {image && <img src={image} alt={name} className="prod-image" />}
            </div>
            <div className="prod-info">
              <h1 className="prod-title">{name}</h1>
              <div className="prod-price">{price}</div>
              <div className="prod-rating">Rating: {rating}</div>
              <div className="prod-highlights">
                {high && Array.isArray(high) && high.map((text, index) => (
                  <div key={index} className="prod-highlight-text">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="prod-summary-section">
            {sumRes && pos !== null && neg !== null && (
              <div className="prod-summary-wrapper">
                <div className="prod-summary">
                  <h2>Product Summary</h2>
                  <p>{sumRes}</p>
                </div>
                <div className="prod-sentiment-container">
                  <h2 className="prod-sentiment-title">Customer Sentiment</h2>
                  <PieChart series={chartData.series} width={400} height={200} />
                </div>
              </div>
            )}

            <div className="prod-chatbot-section">
              <h2 className="prod-chatbot-title">Product Assistant</h2>
              <div className="prod-chatbot-wrapper">
                <div className="prod-chatbot-messages">
                  <div className="bg-blue-100 p-3 inline-block rounded-lg">
                    Hello! How can I help you today?
                  </div>
                </div>
                <div className="prod-chatbot-input">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

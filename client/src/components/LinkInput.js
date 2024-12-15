import React, { useState } from "react";
import { Link2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LinkInput.css";

const LinkInput = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("url", url);

      // Step 1: Scrape product data
      const res = await axios.post("http://localhost:8000/scrape", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { product_details, reviews } = res.data;

      const reviewsArray = reviews
        .map((r) => r.review || "") 
        .map((review) =>
          review
            .replace(/READ MORE/gi, "") 
            .replace(/\.+$/, "") 
            .trim() 
        )
        .filter((review) => review.length > 0); 

      // Step 2: Sentiment analysis
      let positive = 0,
        negative = 0;
      try {
        const sentimentResponse = await axios.post("http://localhost:5001/senti", {
          reviewTexts: reviewsArray,
        });
        const { positive: posCount, negative: negCount } = sentimentResponse.data;
        positive = posCount;
        negative = negCount;
      } catch (error) {
        console.error("Error in sentiment analysis:", error);
      }

      // Step 3: Summarization
      let summary = "No summary available.";
      try {
        const summaryResponse = await axios.post("http://localhost:4000/summarize", {
          reviews: reviewsArray.map((review) => ({ review })),
        });
        summary = summaryResponse.data.summary.generated_text || summary;
      } catch (error) {
        console.error("Error in summarization:", error);
      }

      // Step 4: Navigate to Product Description page
      navigate("/product", {
        state: {
          product: {
            image: product_details.image || null,
            name: product_details.name || "Unknown Product",
            price: product_details.price || "Price not available",
            sumRes: summary,
            pos: positive,
            neg: negative,
            high: product_details.highlights || [],
            rating: product_details.rating || "No rating",
            reviews: reviewsArray, // Reviews in the desired format
          },
        },
      });
    } catch (err) {
      setError(err.response?.data || "Error fetching product details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="link-input-container">
      <div className="link-input-card">
        <div className="link-input-icon">
          <Link2 />
        </div>
        <h2 className="link-input-title">Add Review Link</h2>
        <p className="link-input-description">Enter the product URL to analyze reviews</p>

        <form onSubmit={handleSubmit} className="link-input-form">
          <div>
            <label htmlFor="url" className="link-input-label">
              URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/product"
              className="link-input-field"
              required
            />
          </div>
          <button type="submit" className="link-input-button" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Reviews"}
          </button>
        </form>

        {error && <div className="link-input-error">{error}</div>}
      </div>
    </div>
  );
};

export default LinkInput;

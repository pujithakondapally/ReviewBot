import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-hero">
      <div className="content">
        <h1>Welcome to Our Product Review Chatbot</h1>
        <p>Discover the power of our AI-driven product review analysis tool. Dive into customer insights and make informed decisions.</p>
        <div className="buttons">
          <a href="/analyze-reviews" className="btn">Analyze Reviews</a>
          <a href="/get-started" className="btn" style={{ marginLeft: '15px' }}>Get Started</a>
        </div>
      </div>
      {/* <img src="/HomePageImage.png" alt="Review Bot" className="robot-image" /> */}
    </div>
  );
};

export default Home;

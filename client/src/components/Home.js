import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="content">
          <h1>Welcome to ProBot - Your smart shopping companion! </h1>
          <p>We turn endless reviews into clear insights by scraping product reviews, analyzing sentiment, and delivering concise summaries. </p>
          <p><span className="got-questions">Got questions?</span> Our chatbot is here with tailored answers, helping you shop smarter and faster. With ProBot, every product's story is just a click away. Let's make shopping fun and effortless! </p>
          <div className="buttons">
            <a href="/link-input" className="home-btn">Analyze Reviews</a>
          </div>
        </div>
          <img src="./botpng.png" alt="Review Bot" className="robot-image" />
        </div>
    </div>
  );
};

export default Home;

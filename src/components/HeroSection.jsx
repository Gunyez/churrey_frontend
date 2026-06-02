// HeroSection.jsx
import React from "react";
import "../styles/heroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Finding Your New <br /> Home Is Simple
          </h1>

          <p>
            Churrey Homes is your go-to destination for finding the perfect home 
            away from home to suit your needs.
          </p>

          <div className="search-bar">
            <button>Explore</button>
          </div>
        </div>
      </div>

      {/* <div className="filter-box">
        <div className="filter-item">
          <span>City Street</span>
          <h4>123 Street</h4>
        </div>

        <div className="filter-item">
          <span>Type of Rent</span>
          <h4>Villa</h4>
        </div>

        <div className="filter-item">
          <span>Price</span>
          <h4>€ 950,000</h4>
        </div>

        <button className="filter-btn">Search</button>
      </div> */}
    </section>
  );
};

export default HeroSection;
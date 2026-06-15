import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../styles/homeList.css";

const Homes = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await api.get("/houses");
        setHomes(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading homes...</h2>;
  }

  return (
    <div className="homesPage">
      <div className="homesHeader">
        <h2>Available Homes</h2>
        <p>Find your perfect stay</p>
      </div>

      <div className="homesList">
        {homes.map((home) => (
          <Link
            to={`/house/${home._id}`}
            className="homeCard"
            key={home._id}
          >
            <img
              src={home.photos?.[0]}
              alt={home.title}
              className="homeImage"
            />

            <div className="homeInfo">
              <h3>{home.title}</h3>

              <p className="location">
                📍 {home.city}
              </p>

              <div className="homeMeta">
                <span>🛏 {home.bedrooms} Beds</span>
                <span>🛁 {home.bathrooms} Baths</span>
              </div>

              <div className="homeBottom">
                <span className="rating">
                  ⭐ {home.rating || 4.8}
                </span>

                <span className="price">
                  KSh {home.price?.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homes;
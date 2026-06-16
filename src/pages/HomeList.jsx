import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "../styles/homeList.css";

const Homes = () => {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await api.get("/houses");

        setHomes(res.data);
        setFilteredHomes(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  useEffect(() => {
    const filtered = homes.filter(
      (home) =>
        home.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        home.city
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredHomes(filtered);

  }, [search, homes]);

  const toggleFavorite = (id) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  if (loading) {
    return (
      <div className="homesPage">
        {[1,2,3,4].map((item) => (
          <div className="skeletonCard" key={item}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="homesPage">

      <div className="homesHeader">
        <h2>Find Your Next Home</h2>

        <input
          type="text"
          placeholder="Search city or house..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="searchInput"
        />
      </div>

      <div className="homesList">
        {filteredHomes.map((home) => (
          <HomeCard
            key={home._id}
            home={home}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

    </div>
  );
};

export default Homes;

const HomeCard = ({
  home,
  favorites,
  toggleFavorite,
}) => {
  const [index, setIndex] = useState(0);

  const photos =
    home.photos?.length > 0
      ? home.photos
      : [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        ];

  const next = () => {
    setIndex(
      (prev) => (prev + 1) % photos.length
    );
  };

  return (
    <Link
      to={`/house/${home._id}`}
      className="homeCard"
    >
      <div className="imageWrapper">

        <img
          src={photos[index]}
          alt={home.title}
          className="homeImage"
        />

        <button
          className="favBtn"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(home._id);
          }}
        >
          {favorites.includes(home._id)
            ? <FavoriteIcon />
            : <FavoriteBorderIcon />}
        </button>

        {photos.length > 1 && (
          <>
            <button
              className="nextBtn"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
            >
              ›
            </button>

            <div className="dots">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={
                    i === index
                      ? "dot active"
                      : "dot"
                  }
                />
              ))}
            </div>
          </>
        )}

        <div className="availableBadge">
          Available
        </div>

      </div>

      <div className="homeInfo">

        <h3>{home.title}</h3>

        <p className="location">
          📍 {home.city}
        </p>

        <div className="meta">
          <span>🛏 {home.bedrooms}</span>
          <span>🛁 {home.bathrooms}</span>
        </div>

        <div className="bottom">

          <span className="rating">
            ⭐ {home.rating || 4.8}
          </span>

          <span className="price">
            KSh {home.price?.toLocaleString()}
          </span>

        </div>

      </div>
    </Link>
  );
};
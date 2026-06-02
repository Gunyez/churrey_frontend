import { useNavigate } from "react-router-dom";

const HouseCard = ({ house }) => {

  // Array of images for easy mapping

   // Backend URL from .env
  const BASE_URL = process.env.REACT_APP_API_URL;
  
   // Convert relative image paths to full URLs
  const photoUrls = house.photos?.map((photo) =>
  photo.startsWith("http")
    ? photo
    : `${BASE_URL}${photo}`
);

  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="imageContainer">
        <img
          src={
            photoUrls[0]
          }
          alt={house.title}
          className="image"
        />
      </div>

      <div className="content">
        <h2 className="houseTitle">{house.title}</h2>

        <p className="location">
          {house.city}, {house.address}
        </p>

        <div className="row">
          <span className="price">KES {house.price} / night</span>
          <span className="rating">
            ⭐ {house.rating?.toFixed(1) || "0.0"} ({house.reviewCount || 0})
          </span>
        </div>

        <button 
        className="button"
        onClick={() => navigate(`/house/${house._id}`)}
        >View Details</button>
      </div>
    </div>
  );
};

export default HouseCard;
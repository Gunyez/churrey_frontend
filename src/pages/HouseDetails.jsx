import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/api";

import "../styles/houseDetails.css";

import BookingSection from "../components/BookingSection";
import ImageSlider from "../components/ImageSlider";
import Reviews from "../components/Review";

const HouseDetails = () => {
  const { id } = useParams();

  const [house, setHouse] = useState(null);
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);

  // Backend URL from .env
  const BASE_URL = process.env.REACT_APP_API_URL;

  // Fetch house details
  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await api.get(`/houses/${id}`);
        setHouse(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  // Check if user can review
  useEffect(() => {
    const checkBooking = async () => {
      try {
        await api.get(`/bookings/check/${id}`);
        setCanReview(true);
      } catch (err) {
        setCanReview(false);
      }
    };

    checkBooking();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!house) {
    return <p>House not found</p>;
  }

  // Convert relative image paths to full URLs
 const photoUrls = house.photos?.map((photo) =>
  photo.startsWith("http")
    ? photo
    : `${BASE_URL}${photo}`
);

  

  return (
    <div className="detailsPage">

      {/* Image Slider */}
      <ImageSlider photos={photoUrls} />

      <div className="detailsContainer">

        {/* LEFT SIDE */}
        <div className="left">

          <h1>{house.title}</h1>

          <p className="location">
            📍 {house.city}
            {house.address && `, ${house.address}`}
          </p>

          <div className="info">
            <span>👥 {house.maxPeople || 0} guests</span>
          </div>

          <h3>Description</h3>

          <p>{house.description}</p>

          <h3>Amenities</h3>

          <ul className="amenities">
            {house.amenities?.length > 0 ? (
              house.amenities.map((item, index) => (
                <li key={index}>✔ {item}</li>
              ))
            ) : (
              <p>No amenities listed</p>
            )}
          </ul>

          <p className="ratingBig">
            ⭐ {house.rating?.toFixed(1) || 0}
            {" "}
            ({house.reviewCount || 0} reviews)
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <BookingSection house={house} />
        </div>

      </div>

      {/* Reviews Section */}
      <div className="reviewSection">

        {canReview ? (
          <Reviews houseId={house._id} />
        ) : (
          <p>You must book this house to leave a review.</p>
        )}

      </div>

    </div>
  );
};

export default HouseDetails;
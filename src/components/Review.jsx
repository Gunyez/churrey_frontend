import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/reviews.css";

const Reviews = ({ houseId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseId]);

  const fetchReviews = async () => {
    const res = await api.get(`/reviews/${houseId}`);
    setReviews(res.data);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/reviews", {
        houseId,
        rating,
        comment,
      });

      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      alert(err.response?.data);
    }
  };

  return (
    <div className="reviewsSection">

      <h2>Reviews</h2>

      {/* Add review */}
      <div className="reviewForm">
        <div className="stars">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star active" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit Review</button>
      </div>

      {/* List reviews */}
      {reviews.map((r) => (
        <div key={r._id} className="reviewCard">
          <h4>{r.userId.username}</h4>
          <div className="stars">
            {"★".repeat(r.rating)}
          </div>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

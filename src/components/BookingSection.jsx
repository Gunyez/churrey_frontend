import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/api";

const BookingSection = ({ house }) => {
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Convert unavailable dates
  const disabledDates =
    house.unavailableDates?.map((date) => new Date(date)) || [];

  // Calculate total days
  const getDays = () => {
  if (!startDate || !endDate) return 0;

  const diffTime = Math.abs(endDate - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

  const totalPrice = getDays() * house.price;

  const handleBooking = async () => {
    try {
      await api.post("/bookings", {
        houseId: house._id,
        startDate,
        endDate,
        totalPrice,
      });

      alert("Booking successful!");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="bookingCard">
      <h2>KES {house.price} / night</h2>

      <div className="dateBox" onClick={() => setOpen(!open)}>
        {startDate?.toDateString()} → {endDate ? endDate.toDateString() : "Select end date"}
      </div>

      {open && (
        <div className="datePickerWrapper">
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            excludeDates={disabledDates}
            inline
          />
        </div>
      )}

      <p>Total: <strong>KES {totalPrice}</strong></p>

      <button className="bookBtn" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default BookingSection;
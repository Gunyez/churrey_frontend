import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const BookingSection = ({ house }) => {

  const {user} = useContext(AuthContext)

  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");

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

  if (!user) {
    alert("Please login first");
    return;
  }

  if (!phoneNumber) {
    alert("Enter your M-Pesa number");
    return;
  }

  if (!startDate || !endDate) {
    alert("Select booking dates");
    return;
  }

  try {

    // 1️⃣ Create booking first

    const bookingRes = await api.post(
      "/bookings",
      {
        userId: user._id,
        houseId: house._id,
        startDate,
        endDate,
        totalPrice,
        phone: phoneNumber,
      }
    );

    const booking = bookingRes.data;

    // 2️⃣ Initiate payment

    await api.post("/mpesa/pay", {
      bookingId: booking._id,
      phone: phoneNumber,
      amount: totalPrice,
    });

    alert(
      "Booking created. Complete payment on phone."
    );

  } catch (err) {

    console.log(err);

    alert("Booking failed");
  }
};

//   const handleMpesaPayment = async () => {

//   try {

//     await api.post("/mpesa/pay", {
//       bookingId: booking._id,
//       phone: phoneNumber,
//       amount: booking.totalPrice,
//     });

//     alert("STK Push sent");

//   } catch (err) {

//     console.log(err);

//     alert("Payment failed");
//   }
// };

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
      <input
        type="text"
        placeholder="2547XXXXXXXX"
        value={phoneNumber}
        onChange={(e) =>
          setPhoneNumber(e.target.value)
        }
      />

      <button>
        Pay with M-Pesa
      </button>


      <button className="bookBtn" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default BookingSection;
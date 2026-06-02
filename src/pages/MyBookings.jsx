// import { useContext, useEffect, useState } from "react";
// import api from "../api/api";
// import "../styles/bookings.css";
// import { AuthContext } from "../context/AuthContext";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await api.get("/bookings/my");
//       setBookings(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleCancel = async (id) => {
//     try {
//       await api.delete(`/bookings/${id}`);
//       fetchBookings();
//     } catch (err) {
//       alert("Cancel failed");
//     }
//   };

//   const { user } = useContext(AuthContext);
//   console.log(user);
  
//   if (!user) return <Navigate to="/login" />;

//   return (
//     <div className="mybookingCard" key={b._id}>

//         <img src={b.houseId?.photos?.[0]} alt="" />

//         <div className="bookingInfo">
//             <h3>{b.houseId?.title}</h3>

//             <p>
//             📅 {new Date(b.startDate).toDateString()} -{" "}
//             {new Date(b.endDate).toDateString()}
//             </p>

//             <p>💰 KES {b.totalPrice}</p>
//         </div>

//         <div className="mybookingActions">
//             <button
//             className="cancelBtn"
//             onClick={() => handleCancel(b._id)}
//             >
//             Cancel Booking
//             </button>
//         </div>

//     </div>
//   );
// };

// export default MyBookings;

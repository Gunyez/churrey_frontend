import { useEffect, useState } from "react";
import api from "../../api/api";
import "../../styles/adminBookings.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminBookings = () => {

  const { user } = useContext(AuthContext);

  
  
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);
  
  const fetchBookings = async () => {
    try {
      const res = await api.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const updateStatus = async (id, status) => {
    try {

      await api.put(`/admin/bookings/${id}`, {
        bookingStatus: status,
      });
      
      fetchBookings();
      
    } catch (err) {
      console.log(err);
    }
  };
  
  const deleteBooking = async (id) => {
    try {
      
      await api.delete(`/admin/bookings/${id}`);
      
      fetchBookings();
      
    } catch (err) {
      console.log(err);
    }
  };
  
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <AdminLayout>
    <div className="adminBookings">

      <h1>Booking Management</h1>

      <div className="bookingGrid">

        {bookings.map((booking) => (

          <div className="bookingCard" key={booking._id}>

            <img
              src={booking.houseId?.photos?.[0]}
              alt=""
            />

            <h3>{booking.houseId?.title}</h3>

            <p>
              <strong>User:</strong>{" "}
              {booking.userId?.username}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {booking.userId?.email}
            </p>

            <p>
              <strong>City:</strong>{" "}
              {booking.houseId?.city}
            </p>

            <p>
              <strong>Dates:</strong>{" "}
              {new Date(booking.startDate).toDateString()}
              {" - "}
              {new Date(booking.endDate).toDateString()}
            </p>

            <p>
              <strong>Total:</strong> KES {booking.totalPrice}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {booking.paymentStatus}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {booking.bookingStatus}
            </p>

            <div className="actions">

              <button
                className="approveBtn"
                onClick={() =>
                  updateStatus(booking._id, "approved")
                }
              >
                Approve
              </button>

              <button
                className="cancelBtn"
                onClick={() =>
                  updateStatus(booking._id, "cancelled")
                }
              >
                Cancel
              </button>

              <button
                className="deleteBtn"
                onClick={() =>
                  deleteBooking(booking._id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
    </AdminLayout>
  );
};

export default AdminBookings;
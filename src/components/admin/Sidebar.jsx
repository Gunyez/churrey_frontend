import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import "./Sidebar.css";

const Sidebar = () => {

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  return (
    <>
      {/* Mobile Topbar */}

      <div className="mobileTopbar">

        <h2>Admin</h2>

        <button
          className="menuBtn"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Sidebar */}

      <div className={`sidebar ${open ? "show" : ""}`}>

        <h2 className="logo">
          Churrey Admin
        </h2>

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/admin/houses">
          Houses
        </Link>

        <Link to="/admin/bookings">
          Bookings
        </Link>

        <Link to="/admin/users">
          Users
        </Link>

        <Link to="/admin/payments">
          Payments
        </Link>

        <button
          className="logoutBtn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </>
  );
};

export default Sidebar;
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import "../styles/navbar.css";
import logo from "../images/Logo.jpg"

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log("USER STATE:", user);

  return (
    <div className="navbar">

      {/* LEFT LOGO */}
      <div className="navLeft">
        <Link to="/" className="logo">
          <img  className = "logoimg"src={ logo} alt="logo"/> Churrey Homes
        </Link>
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
        ☰
      </div>

      {/* CENTER LINKS */}
      {/* <div className={`navCenter ${mobileMenu ? "active" : ""}`}>
        <Link to="/" onClick={() => setMobileMenu(true)}>Home</Link>
        <Link to="/about" onClick={() => setMobileMenu(false)}>About Us</Link>
        <Link to="/homes" onClick={() => setMobileMenu(false)}>Our Homes</Link>
        <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>
      </div> */}

      {/* RIGHT SECTION */}
      <div className={`navRight ${mobileMenu ? "active" : ""}`}>

        {!user ? (
          <>
            <div className={`navCenter`}>
              <Link to="/" onClick={() => setMobileMenu(true)}>Home</Link>
              <Link to="/about" onClick={() => setMobileMenu(false)}>About Us</Link>
              <Link to="/homes" onClick={() => setMobileMenu(false)}>Our Homes</Link>
              <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>
            </div>
            
            <Link to="/login" className="navBtn">Login</Link>
            <Link to="/register" className="navBtn">Register</Link>
          </>
        ) : (
          <div className="profile">

            <div
              className="profileBox"
              onClick={() => setOpen(!open)}
            >
              👤 {user?.username || "User"}
            </div>

            {open && (
              <div className="dropdown">
                <Link to="/bookings">My Bookings</Link>
                <Link to="/profile">Profile</Link>

                <button className="logoutBtn" onClick={handleLogout}>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;

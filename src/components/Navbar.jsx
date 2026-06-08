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
      console.log("Logout Failed:", err);
    }
  };


  return (
    <div className="navbar">

      {/* LEFT LOGO */}
      <div className="navLeft">
        <Link to="/" className="logo">
          <img  className = "logoimg"src={ logo} alt="ChurreyHomes Logo"/>
          <div>Churrey Homes</div>
        </Link>
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
        ☰
      </div>
      <div className={`mobileMenu ${mobileMenu ? "active" : ""}`}>
        <div className="navCenter">
          <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenu(false)}>About Us</Link>
          <Link to="/homes" onClick={() => setMobileMenu(false)}>Our Homes</Link>
          <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>
        </div>

        <div className="navRight">
           {!user ? (
              <>
                
                <Link
                  to="/login"
                  className="navBtn"
                  onClick={() => setMobileMenu(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="navBtn"
                  onClick={() => setMobileMenu(false)}
                >
                  Register
                </Link>

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
                    <Link to="/bookings" onClick={() => setOpen(false)}>
                      My Bookings
                    </Link>

                    <Link to="/profile" onClick={() => setOpen(false)}>
                      Profile
                    </Link>
                    <button className="logoutBtn" onClick={handleLogout}>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>


      {/* CENTER LINKS */}
      <div className={`navCenter ${mobileMenu ? "active" : ""}`}>
        
      </div>

      {/* RIGHT SECTION */}
      <div className={`navRight ${mobileMenu ? "active" : ""}`}>

       

      </div>
    </div>
  );
};

export default Navbar;
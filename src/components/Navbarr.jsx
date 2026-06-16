import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import "../styles/navbarr.css";
import logo from "../images/logo1.png"

export default function Navbar() {
  const { user, dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const [openNavbar, setOpenNavbar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);


//   const {loading, error, dispatch} = useContext(AuthContext);

  const toggleNavbar = () => {
    setOpenNavbar((prev) => !prev);
  };

  // HANDLE REGISTER CLICK
  // const handleRegister = () => {
  //   setOpenRegister((prev) => !prev);
  //   setOpenLogin(false);
  // };

  // HANDLE LOGIN CLICK
  // const handleLogin = () => {
  //   setOpenLogin((prev) => !prev);
  //   setOpenRegister(false);
  // };
  //HANDLE LOGOUT
    const handleLogout = async () => {

      try {
        setOpenDropdown(!openDropdown)
        await api.post("/auth/logout");
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
        navigate("/");
      } catch (err) {
        console.log("Logout Failed:", err);
      }
    };
  return (
      <header>
        <Link className="logoLink">
          
            <img src={logo} alt="Logo" className="logoIcon" />
            <span className="logoText">Churrey Homes</span>
        
        </Link>

        <ul className={`navbar ${openNavbar ? "active" : ""}`}>
            <li>
              <a href="#hero" className="active">
                Home
              </a>
            </li>
    
            <li>
              <a href="#aboutUs">About Us</a>
            </li>
          <li>
            <a href="#homes">Our Homes</a>
          </li>
          <li>
            <a href="#footer">Contact Us</a>
          </li>
        </ul>

        <div className="main">
          {user ? (
            <>
            <div className="profile">

                <div
                  className="profileBox"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  👤 {user?.username || "User"}
                </div>

                {openDropdown && (
                  <div className="dropdown">
                    <Link to="/bookings" onClick={() => setOpenDropdown(false)}>
                      My Bookings
                    </Link>

                    <Link to="/profile" onClick={() => setOpenDropdown(false)}>
                      Profile
                    </Link>
                    <button className="logoutBtn" onClick={handleLogout}>
                      <LogoutIcon/>Logout
                    </button>
                  </div>
                )}
              </div>
              {/* <span className="username">{user.username}</span>
              <button className="logoutBtn" onClick={handleLogout}>
                <LogoutIcon/>Logout
              </button> */}
            </>

          ) : (
            <>
            <Link to="/login">
              <button className="userBtn" >
                <AccountCircleIcon className="userIcon" />
                Sign in
              </button>
            </Link>
              {/* {openLogin && <Login setOpen={setOpenLogin} />} */}

              <Link to="/register">
              <button className="registerBtn">
                Register
              </button>
              </Link>
              {/* {openRegister && <Register setOpenRegister={setOpenRegister} setOpenLogin={setOpenLogin}/>} */}
            </>
          )}
          <div id="menu-icon" onClick={toggleNavbar}>
            {openNavbar ? <CancelIcon /> : <MenuIcon />}
          </div>
        </div>
      </header>
  );
}

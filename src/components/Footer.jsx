import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
  Send,
} from "@mui/icons-material";
import logo from "../images/logo1.png"


import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footerTop">

        <div className="footerLogo">
          <div className="footerLeft">
            <img src={logo} alt="Logo" className="logoIcon" />
            <span className="footerLogoText">Churrey Homes</span>
          </div>
          
          <div className="footerRight">
            <div className="socialIcons">
              <Facebook />
              <Twitter />
              <Instagram />
              <LinkedIn />
            </div>
          </div>
        </div>

      </div>

      <div className="footerContent">

        <div className="footerSection">
          <h3>About Us</h3>

          <p>
            Churrey Homes helps travelers
            discover and book beautiful homes
            across Kenya with secure online
            payments and instant confirmations.
          </p>

          <div className="contactItem">
            <LocationOn />
            <span>Nairobi, Kenya</span>
          </div>

          <div className="contactItem">
            <Phone />
            <span>+254 722 477 920</span>
          </div>

          <div className="contactItem">
            <Email />
            <span>info@churreyhomes.com</span>
          </div>
        </div>

        <div className="footerSection">
          <h3>Explore</h3>

          <a href="/">Home</a>
          <a href="/houses">Browse Homes</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footerSection">
          <h3>Quick Links</h3>

          <a href="/bookings">My Bookings</a>
          <a href="/favorites">Saved Homes</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>

        <div className="footerSection">
          <h3>Newsletter</h3>

          <p>
            Get new homes and exclusive
            offers delivered to your inbox.
          </p>

          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              <Send />
            </button>
          </div>
        </div>

      </div>

      <div className="footerBottom">

        <p>
          © {new Date().getFullYear()}
          Churrey Homes. All rights reserved.
        </p>

        <div className="footerPolicies">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookies</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
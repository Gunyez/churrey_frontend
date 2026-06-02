import "../styles/footer.css"

import logo from '../images/logo1.png'
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function Footer() {
  const year = new Date().getFullYear()  
  
  return (
    <div className="footer">
        <div className="topFooter">
            <div className="logo">
              <img src={logo} alt="" className="logoImg"/>
            </div>
            <div className="logoText">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Minus ipsa magni nam aliquid cum atque nemo delectus
                nostrum corporis perspiciatis, 
                voluptas impedit veniam ad officia tenetur 
                expedita ex dolor voluptates.
              </p>
            </div>
        </div>
        <div className="bottomFooter">
           <ul className="linkFooter">
            <div className="linkTitle">
              Quick Link
            </div>
            <li>
              Home
            </li>
            <li>
              About Us
            </li>
            <li>
              Our Homes
            </li>
            <li>
              Contact
            </li>
           </ul>
           <ul className="linkFooter">
           <div className="linkTitle">
              Get In Touch
            </div>
            <li className="socialsLink">
              <EmailIcon/> churreyexperts@gmail.com
            </li>
            <li className="socialsLink">
              <LocationOnIcon/>2198 Diani, South Coast 
            </li>
            <ul className="socials">
              <li>
                <XIcon/>
              </li>
              <li>
                <FacebookIcon/>
              </li>
              <li>
                <InstagramIcon/>
              </li>
            </ul>
           </ul>
        </div>
        <hr />
        <div className="copyRight">
            &copy; Churrey Homes {year}
        </div>
    </div>
  )
}

export default Footer
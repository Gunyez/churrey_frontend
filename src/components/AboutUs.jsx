import "../styles/aboutUs.css"
import bg1 from "../images/bg1.jfif"
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function AboutUs() {
  return (
    <section>

    <div className="section">
        <div className="top">
            
            <img src={bg1} alt = "background" className="img"/>
            
    
            <h2>
                We Specialize In Quality Homes For Our Visitors
            </h2>
        </div>
        <div className="bottom">
            <p className="bodyText">
                Looking for a home to reflect your style and personality? 
                Look no further than Churrey homes who specialize in quality homes for our visitors, your dream home  and a place you’ll love. 
                From the yard to the bedroom.
            </p>

            <ul className="featureList">
                <li className="featureItem">
                    <span><TaskAltIcon/></span>

                    <span>Smart Home</span>
                </li>

                <li class="featureItem">
                    <span><TaskAltIcon/></span>

                    <span>Beautiful Scene Around</span>
                </li>

                <li class="featureItem">
                    <span><TaskAltIcon/></span>

                    <span>Exceptional lifestyle</span>
                </li>

                <li class="featureItem">
                    <span><TaskAltIcon/></span>

                    <span>Complete 24/7 Security</span>
                </li>  
            </ul>
        </div>
            
        </div>

  

</section>
  )
}

export default AboutUs

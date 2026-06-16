import React from 'react'
import "../styles/home.css";
import HouseGrid from '../components/HouseGrid'
import AboutUs from '../components/AboutUs'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='homeContent'>
      <HeroSection/>
      
      <AboutUs/>
        
      <HouseGrid/>
        
      <Footer/>
        
        
    </div>
  )
}

export default Home
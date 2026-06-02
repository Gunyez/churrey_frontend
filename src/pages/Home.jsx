import React from 'react'
import HouseGrid from '../components/HouseGrid'
import AboutUs from '../components/AboutUs'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
        <div>
            <HeroSection/>
        </div>
        <div>
          <AboutUs/>
        </div>
        <div>
            <HouseGrid/>
        </div>
        
          <Footer/>
        
        
    </>
  )
}

export default Home
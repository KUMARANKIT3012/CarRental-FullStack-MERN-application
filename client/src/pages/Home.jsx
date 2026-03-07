// THIS IS THE HOME PAGE

import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <>
      {/* mounting the hero section in our home page */}
      <Hero />
      {/* mounting the featured section in our home page */}
      <FeaturedSection/>
      {/* mounting the banner section in our home page */}
      <Banner/>
      {/* mounting the testimonial section in our home page */}
      <Testimonial/>
      {/* mounting the newsletter section in our home page */}
      <Newsletter/>

    </>
  )
}

export default Home

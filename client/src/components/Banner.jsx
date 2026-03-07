// call to action banner component

import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 md:pl-14 pt-10 bg-linear-to-r from-[#0558ff] to-[#A9CfFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden">

      {/* own a luxury car banner */}
      <div className='text-white'>
        <h2 className='text-3xl font-medium'>Do you own a Luxury Car?</h2>
        <p className='mt-2'>Monetize your vehicle with our platform.</p>
        <p className='max-w-130'>We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free.</p>


        {/* button for listing your car */}
        <button className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer">List your car</button>
      </div>


        {/* banner car image */}
      <img src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'/>

    </div>
  )
}

export default Banner

// We will use prebuiltui to create a footer component

import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <div className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>

            {/* 1st column - Logo and Description */}
                <div>
                    <img src={assets.logo} alt="logo" className='h-8 md:h-9' />

                    {/* Description */}
                    <p className='max-w-80 mt-3'>
                        StayVenture is your trusted partner for luxury car rentals worldwide. Experience unparalleled service, premium vehicles, and unforgettable journeys with us.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>

                        {/* Facebook */}
                        <a href="#"><img src={assets.facebook_logo} className='w-5 h-5' alt="" /></a>

                        {/* Instagram */}
                        <a href="#"><img src={assets.instagram_logo} className='w-5 h-5' alt="" /></a>

                        {/* Twitter */}
                        <a href="#"><img src={assets.twitter_logo} className='w-5 h-5' alt="" /></a>

                        {/* LinkedIn */}
                        <a href="#"><img src={assets.gmail_logo} className='w-5 h-5' alt="" /></a>
                    </div>
                </div>

            {/* 2nd column - Quick Links */}
                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>

            {/* 3rd column - Resources */}              
                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>

            {/* 4th column - Contact */}
                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li>1234 Luxury Drive</li>
                        <li>Los Angeles, CA 90001</li>
                        <li>Email: support@stayventure.com</li>
                        <li>Phone: (123) 456-7890</li>
                    </ul>
                </div>

                
            </div>

           {/* Bottom copyright and links */}
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </div>
  )
}

export default Footer

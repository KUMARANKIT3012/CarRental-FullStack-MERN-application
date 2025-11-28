// Getting testimonial prebuilt from prebuiltui.com

import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {

    // testimonials data
    const testimonials = [
        { name: "Emma Rodriguez",
            location: "Barcelona, Spain", 
            image: assets.testimonial_image_1,
            testimonial: "I've rented car from various companies, and this was by far the best experience. The staff was friendly, the process was smooth, and the car was in excellent condition." 
        },

        { name: "Maxine Johnson", 
        location: "New York, USA", 
        image: assets.testimonial_image_2, testimonial: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
        },

        { name: "Sophia Lee", 
        location: "Seoul, South Korea", 
        image: assets.testimonial_image_1, testimonial: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." }
    ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

        {/* Title Section */}
        <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose StayVenture for their luxury accomodations around the world"/>

            {/* instead of flex layout we will use the grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">

                        {/* Testimonial Content */}
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                {/* Name and Location */}
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star-icon" />
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial

// this carcard is for the featured cars on the homepage

import React, { use } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

// destructuring car from props
const CarCard = ({car}) => {

    // getting currency from env file
    const currency = import.meta.env.VITE_CURRENCY;

    // to navigate to car details page
    const navigate = useNavigate();

  return (
    // now when i click on any car card it will navigate to car details page of that specific car
    <div onClick={()=> {navigate(`/car-details/${car._id}`); scrollTo(0,0)}} className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 translate-all duration-500 cursor-pointer'>

        {/* car image */}
        <div className='relative h-48 overflow-hidden'>
            <img src={car.image} alt="Car Image" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />


            {/* availability status */}
            {car.isAvailable && <p className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">Available Now</p>}


            {/* price per day */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
            <span>{currency}{car.pricePerDay}</span>
            <span className='text-sm text-white/80'>/day</span>
            </div>
        </div>


        {/* car details */}
        <div className='p-4 sm:p-5'>

            {/* car name and model */}
            <div className='flex justify-between items-start mb-2'>
                <div>
                    <h3 className='text-lg font-medium'>{car.brand} {car.model}</h3>
                    <p className='text-muted-foreground text-sm'>{car.category} • {car.year}</p>
                </div>
            </div>

            {/* car other specifications */}
            <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>

                {/* seating capacity */}
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.users_icon} alt="" className='h-4 mr-2' />
                    <span>{car.seating_capacity} Seats</span>
                </div>

                {/* fuel type */}
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.fuel_icon} alt="" className='h-4 mr-2' />
                    <span>{car.fuel_type}</span>
                </div>

                {/* transmission type */}
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.car_icon} alt="" className='h-4 mr-2' />
                    <span>{car.transmission}</span>
                </div>

                {/* car location */}
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.location_icon} alt="" className='h-4 mr-2' />
                    <span>{car.location}</span>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default CarCard

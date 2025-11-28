// Featured Cars Section

import React from 'react'
import Title from './Title'
import { assets} from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {

    // to navigate to all cars page
    const navigate = useNavigate();

    const {cars} = useAppContext();

  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-34'>

      {/* shows title and subtitle */}
      <div>
        <Title title = {"Featured Cars"} subTitle = {"Check out our featured cars for rent"} align = {"center"}/>
      </div>


        {/* display the cars using cards component */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {
            // mapping through first 6 cars from dummy data
            cars.slice(0, 6).map((car) => (
                <div key={car._id}>
                    <CarCard car={car} />
                </div>
            ))    
        }
      </div>

      <button onClick={()=> {
        // onclick property to navigate to all cars page
        navigate('/cars'); scrollTo(0,0)
      }}
      className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer">

        {/* using assets.arrow_icon button is there to navigate to all cars */}
        Explore all Cars <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  )
}

export default FeaturedSection

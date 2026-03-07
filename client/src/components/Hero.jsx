// This is the hero section of the webpage

import React from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {

    // Pickup location state for the dropdown in the hero section form
    const [pickupLocation, setPickupLocation] = React.useState('')

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext(); 

    const handleSearch = (e) => {
        e.preventDefault()
        // Implement search functionality here
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate);
    }

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>

        {/* Hero heading */}
        <h1 className='text-4xl md:text-5xl font-semibold'>Luxury cars on Rent</h1>

        {/* Return date and pickup location */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">

            <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min md:ml-8'>
                <div className='flex flex-col items-start gap-2'>

                    {/* whenever the location is selected it will go and get stored in the state above and in p tag ... */}
                    <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>


                        {/* Default option */}
                        <option value="">Pickup Location</option>

                        {/* City options */}
                        {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>

                
                    {/* display the city name in this p tag */}
                    <p className='px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : 'Please select location'}</p>
                </div>

                {/* for pickup date*/}
                {/* min is used to set the earliest date to today */}
                <div className='flex flex-col items-start gap-2'>   
                    <label htmlFor="pickup-date">Pick-up Date</label>
                    <input value={pickupDate}
                    onChange={e=>setPickupDate(e.target.value)}
                    type="date" id='pickup-date' min={new Date().toISOString().split("T")[0]}className='text-sm text-gray-500' required/>
                </div>

                {/* for return date */}
                <div className='flex flex-col items-start gap-2'>   
                    <label htmlFor="return-date">Return Date</label>
                    <input 
                    value={returnDate}
                    onChange={e=>setReturnDate(e.target.value)}
                    type="date" id='return-date'  className='text-sm text-gray-500' required/>
                </div>
            </div>

            {/* search button */}
            <button className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer">
                <img src={assets.search_icon} alt="Search" className='brightness-300' />
                Search
            </button>
        </form>

        {/* car image */}
        <img src={assets.main_car} alt="car" className='max-h-74' />
      
    </div>
  )
}

export default Hero

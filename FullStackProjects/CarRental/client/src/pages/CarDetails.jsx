// THIS IS THE CAR DETAILS PAGE

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const CarDetails = () => {

  // getting car id from url params
  const { id } = useParams();

  // to navigate to other pages
  const navigate = useNavigate();

  const { axios, currency, token, setShowLogin, user, pickupDate, returnDate, setPickupDate, setReturnDate } = useAppContext();

  // car state to store the car details
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch the car details based on id
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const { data } = await axios.get(`/api/user/car/${id}`);
        if (data.success) {
          setCar(data.car);
        } else {
          toast.error(data.message);
          navigate('/');
        }
      } catch (error) {
        toast.error(error.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, axios, navigate]);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setShowLogin(true);
      return;
    }

    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }

    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: car._id,
        pickupDate,
        returnDate
      });

      if (data.success) {
        toast.success("Booking created successfully!");
        navigate('/my-bookings');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading) return <Loader />;

  // ? is used to check if car is not null then only render the div
  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>

      {/* redirect the user into previous page */}
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>

        {/* Back arrow icon */}
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65' />
        Back to all cars
      </button>


      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left : Car Image AND Details */}
        <div className='lg:col-span-2'>
          <img src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounder-xl mb-6n shadow-md' />
          <div className='space-y-6'>
            <div>

              {/* Car Title and Details */}
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>

              {/* Car Category and Year */}
              <p className="text-gray-500 text-lg">{car.category} • {car.year}</p>
            </div>
            <hr className='border-borderColor my-6' />

            {/* Car Specifications using array */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.sitting_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2' />
                  {text}
                </div>
              ))}
            </div>


            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  (car.features || ["360 Camera", "Bluetooth", "Cruise Control", "Heated Seats", "Keyless Entry", "Leather Seats", "Navigation System", "Parking Sensors", "Premium Sound System", "Sunroof", "USB Port", "Wi-Fi Hotspot"]).map((item) => (
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt="" />
                      {item}
                    </li>
                  ))
                }

              </ul>
            </div>
          </div>
        </div>


        {/* Right : Booking Form */}
        <form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>{currency} {car.pricePerDay} <span className='text-base text-gray-400 font-normal'>Per day</span></p>

          <hr className='border-borderColor my-6' />

          {/* div for Pickup Date */}
          <div className='flex flex-col gap-2'>
            {/* Pickup Date */}
            <label htmlFor="pickup-date">Pickup Date</label>
            {/* input field where user can select pickup date */}
            {/* it will allow you to select a date from today onwards */}
            <input
              type="date"
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id='pickup-date'
              min={new Date().toISOString().split("T")[0]}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>



          {/* div for Return Date */}
          <div className='flex flex-col gap-2'>
            {/* Return Date */}
            <label htmlFor="return-date">Return Date</label>
            {/* input field where user can select return date */}
            <input
              type="date"
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id='return-date'
              min={pickupDate || new Date().toISOString().split("T")[0]}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>



          {/* button for booking */}
          <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>Book Now</button>


          <p className='text-center text-sm'>No Credit Card Required to reserve</p>

        </form>
      </div>
    </div>

    // or else show loading
  ) : <Loader />
}

export default CarDetails

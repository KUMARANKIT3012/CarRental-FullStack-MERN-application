// THIS IS THE CARS PAGE

import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  // Get URL search params
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation") || "";
  const pickupDate = searchParams.get("pickupDate") || "";
  const returnDate = searchParams.get("returnDate") || "";

  // ⬅️ NOTE: we now also take `cars` from context
  const { axios, cars } = useAppContext();

  // Search box text
  const [input, setInput] = useState("");

  // Cars currently shown on the page
  const [filteredCars, setFilteredCars] = useState([]);

  const hasSearchData =
    pickupLocation.trim() && pickupDate.trim() && returnDate.trim();

  // 1) When there is NO search data → just show all cars from context
  useEffect(() => {
    if (!hasSearchData) {
      setFilteredCars(Array.isArray(cars) ? cars : []);
    }
  }, [cars, hasSearchData]);

  // 2) When there IS search data → call check-availability
  useEffect(() => {
    if (!hasSearchData) return;

    const searchCarAvailability = async () => {
      try {
        const { data } = await axios.post(
          "/api/bookings/check-availability",
          {
            location: pickupLocation,
            pickupDate,
            returnDate,
          }
        );

        console.log("check-availability response:", data);

        if (data.success && Array.isArray(data.availableCars)) {
          setFilteredCars(data.availableCars);

          if (data.availableCars.length === 0) {
            toast("No cars available");
          }
        } else {
          // backend responded but with failure
          toast.error(data.message || "No cars available for these dates");
          setFilteredCars([]);
        }
      } catch (error) {
        console.error("Error in check-availability:", error?.response || error);
        toast.error("Something went wrong while loading cars");
        setFilteredCars([]);
      }
    };

    searchCarAvailability();
  }, [
    axios,
    pickupLocation,
    pickupDate,
    returnDate,
    hasSearchData,
  ]);

  // Apply search box filter on whatever cars we have
  const visibleCars = filteredCars.filter((car) =>
    input.trim() === ""
      ? true
      : `${car.brand} ${car.model}`
          .toLowerCase()
          .includes(input.toLowerCase())
  );

  return (
    <div>
      {/* Title + Search Bar */}
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles for your next adventure"
        />

        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />

          {/* Search Input */}
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />

          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>

      {/* Cars List */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {visibleCars.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {visibleCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;

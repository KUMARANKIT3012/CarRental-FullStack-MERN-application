// Manage Bookings Page for Owners

import React, { useState, useEffect, useCallback } from 'react';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';

const ManageBookings = () => {
  const { currency, axios } = useAppContext();

  const [bookings, setBookings] = useState([]);

  // Fetch owner's bookings
  const fetchOwnerBookings = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios]);

  // Change booking status
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', {
        bookingId,
        status,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load on mount
  useEffect(() => {
    fetchOwnerBookings();
  }, [fetchOwnerBookings]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="View, edit, and manage all your car bookings."
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-borderColor dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <img src={assets.calendar_icon_colored} alt="" className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{bookings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-borderColor dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <img src={assets.check_icon} alt="" className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Confirmed</p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-borderColor dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <img src={assets.calendar_icon_colored} alt="" className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-borderColor dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <span className="text-primary dark:text-primary-light font-bold text-lg">{currency}</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-primary dark:text-primary-light">
                {currency}{bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-borderColor dark:border-gray-700 mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-borderColor dark:border-gray-600">
              <tr>
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300">Booking Details</th>
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300 max-md:hidden">Customer</th>
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300 max-lg:hidden">Dates</th>
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300 max-md:hidden">Payment</th>
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-borderColor dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={booking.car?.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.car?.brand} {booking.car?.model}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.car?.year} • {booking.car?.category}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 max-md:hidden">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{booking.user?.name || 'Customer'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking.user?.email || 'No Email'}</p>
                    </div>
                  </td>

                  <td className="p-4 max-lg:hidden">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.ceil((new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{currency}{booking.price}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {currency}{Math.round(booking.price / Math.ceil((new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24)))}/day
                      </p>
                    </div>
                  </td>

                  <td className="p-4 max-md:hidden">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                      completed
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${booking.status === 'confirmed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700'
                        : booking.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700'
                          : booking.status === 'cancelled'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                      }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => changeBookingStatus(booking._id, 'confirmed')}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => changeBookingStatus(booking._id, 'cancelled')}
                            className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => changeBookingStatus(booking._id, 'completed')}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-borderColor dark:border-gray-700 mt-6 p-16 text-center">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No bookings found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Bookings will appear here once customers start booking your cars.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;

import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// receive setShowLogin prop from App.jsx
const Navbar = () => {

  const { setShowLogin, user, logout, isOwner, axios, setIsOwner, theme, toggleTheme } = useAppContext();

  // we have used setShowLogin prop in Navbar component but not passed it here
  const location = useLocation();

  // state to handle menu toggle in mobile view
  const [open, setOpen] = useState(false);

  // navigation hook used to navigate to different routes
  const navigate = useNavigate();

  // function to change role to owner
  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role');
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }





  return (
    // Navbar container with conditional styling based on the current route
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all dark:text-gray-300 dark:border-gray-700 ${location.pathname === '/' ? 'bg-light dark:bg-gray-900' : 'bg-white dark:bg-gray-900'
        }`}
    >
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      {/* Menu Links used to navigate between different pages */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 
        ${location.pathname === '/' ? 'bg-light dark:bg-gray-900' : 'bg-white dark:bg-gray-900'} 
        ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}`}
      >
        {/* use of menuLinks */}
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} className="hover:text-primary transition-colors">
            {link.name}
          </Link>
        ))}

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56 dark:border-gray-700">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="dark:invert" />
        </div>

        {/* Buttons */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            onClick={() => isOwner ? navigate('/owner') : changeRole()}
            className="cursor-pointer hover:text-primary transition-colors"
          >
            {isOwner ? 'Dashboard' : 'List Your Car'}
          </button>


          <button
            onClick={() => { user ? logout() : setShowLogin(true) }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

      {/* Menu Toggle Button used for mobile view */}
      <button
        className="sm:hidden cursor-pointer dark:invert"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
        />
      </button>
    </div>
  );
};

export default Navbar;

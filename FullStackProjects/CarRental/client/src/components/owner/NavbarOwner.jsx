// Navbar Component for Owner Pages

import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {

  // Get user data which is dummy for now
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700">
      {/* navigate to home */}
      <Link to="/">
        <img src={assets.logo} alt="" className="h-7" />
      </Link>
      {/* if user is not found then owner name will be displayed */}
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner

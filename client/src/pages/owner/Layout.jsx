// Layout Component for Owner Pages
// Mounting NavbarOwner and Sidebar here

import React, { useEffect } from 'react';
import NavbarOwner from '../../components/owner/NavbarOwner';
import Sidebar from '../../components/owner/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { isOwner, loading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect when user is NOT loading
    if (!loading && !isOwner) {
      navigate('/', { replace: true });
    }
  }, [loading, isOwner, navigate]);

  if (loading) {
    // Prevent flashing white screen while user loads
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

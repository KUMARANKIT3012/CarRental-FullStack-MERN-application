import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';
import Layout from './pages/owner/Layout';
import Dashboard from './pages/owner/Dashboard';
import AddCar from './pages/owner/AddCar';
import ManageCars from './pages/owner/ManageCars';
import ManageBookings from './pages/owner/ManageBookings';
import Login from './components/Login';
import {Toaster} from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

const App = () => {
  // we have used setShowLogin prop in Navbar component but not passed it here
  const {showLogin} = useAppContext();
 
  // hide the navbar when we are in /owner route
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    
    <>
    {/* Toaster for displaying toast notifications */}
    <Toaster/>

    {/* Mounting login component */}
    {showLogin && <Login/>}


    {/* Navbar - whenever we are not in /owner route but if i am in the /owner route then i will not show the navbar */}
      {!isOwnerPath && <Navbar/>}


{/* routing so that we can navigate between different pages */}
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/my-bookings" element={<MyBookings />} />

{/* Create Owner Pages Routes */}
      <Route path='/owner' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path = "add-car" element={<AddCar />} />
        <Route path = "manage-cars" element={<ManageCars />} />
        <Route path = "manage-bookings" element={<ManageBookings />} />
      </Route>


      </Routes>

    {/* mounting footer - because it is a common component that should be displayed on all pages except the owner routes */}
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App

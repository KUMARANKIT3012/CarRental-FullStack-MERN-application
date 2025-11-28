// api for owner related operations
// we will provide this router in server.js to use it

import express from 'express';
import { protect } from '../middleware/auth.js';
import {addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';

// creating new router for owner related routes
const ownerRouter = express.Router();

// adding the api endpoint '/change-role' to change user role to owner
ownerRouter.post('/change-role', protect, changeRoleToOwner);

// adding the api endpoint '/add-car' to add a new car by owner
ownerRouter.post('/add-car', upload.single('image'), protect, addCar);

// API to get owner's cars
ownerRouter.get('/cars', protect, getOwnerCars);

// API to toggle car availability
ownerRouter.post('/toggle-car', protect, toggleCarAvailability);

// API to delete a car
ownerRouter.post('/delete-car', protect, deleteCar);

// API to getting the dashboard data 
ownerRouter.get('/dashboard', protect, getDashboardData)

// API to update owner profile image
ownerRouter.post('/update-image', upload.single('image'), protect, updateUserImage)


// export the ownerRouter to use in server.js
export default ownerRouter;
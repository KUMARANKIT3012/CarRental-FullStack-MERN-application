// creating an api for owner related operations
// and we will create a new route for this in ownerRoutes.js

import imagekit from '../configs/imageKit.js';
import Booking from '../models/Booking.js';
import Car from '../models/car.js';
import User from '../models/User.js';
import fs from 'fs';

// API to change user role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    // we will update the role of the user to 'owner'
    await User.findByIdAndUpdate(_id, { role: 'owner' });

    // after updating the role we will send the response back to the frontend
    res.json({ success: true, message: 'Role changed to owner successfully' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list Cars for owner
export const addCar = async (req, res) => {
  try {
    // this user data will be added using the middleware
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);

    // get the car image from req.file
    const imageFile = req.file;

    // to upload this image on the cloud storage we will use imagekit.io
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/cars',
    });

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: '1280' }, // width resizing
        { quality: 'auto' }, // auto compression
        { format: 'webp' }, // convert to modern format
      ],
    });

    // we can store this image in our mongodb url
    const image = optimizedImageUrl;
    await Car.create({ ...car, owner: _id, image });

    // send success response back to frontend
    res.json({ success: true, message: 'Car added successfully' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to List Owner Cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Ensure the requester is the owner of the car
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    // Toggle availability and save
    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message: 'Car availability updated' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Delete a Car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Ensure the requester is the owner of the car
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    // Mark car as deleted / unavailable
    car.owner = null;
    car.isAvailable = false;

    await car.save();

    res.json({ success: true, message: 'Car deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard Stats for Owner
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== 'owner') {
      return res.json({ success: false, message: 'Unauthorized access' });
    }

    // Get cars for this owner
    const cars = await Car.find({ owner: _id });

    // ✅ FIXED: use Mongoose sort, not Array.sort
    const bookings = await Booking.find({ owner: _id })
      .populate('car')
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({ owner: _id, status: 'pending' });
    const completedBookings = await Booking.find({ owner: _id, status: 'confirmed' });

    // calculate monthlyRevenue from bookings where status is confirmed
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === 'confirmed')
      .reduce((acc, booking) => acc + booking.price, 0);

    // object where we will add all the data about the dashboard
    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API TO update user image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file; // Multer uploaded file

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/users',
    });

    // Optimize the uploaded image using ImageKit URL transformations
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: '400' }, // Resize width
        { quality: 'auto' }, // Auto compression
        { format: 'webp' }, // Convert to modern webp format
      ],
    });

    const image = optimizedImageUrl;

    // Save to DB
    await User.findByIdAndUpdate(_id, { image });

    res.json({ success: true, message: 'Image updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

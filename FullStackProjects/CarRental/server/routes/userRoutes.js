// now we have to create API routes for user registration and login
// We will use Express Router for this purpose

import express from 'express';
import { registerUser, loginUser, getUserData, getCars, getCarById } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';


// create a user router
const userRouter = express.Router();

// it has api endpoints -- '/ register','/login' and we will call the controller function registerUser and loginUser respectively
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getCars);
userRouter.get('/car/:id', getCarById);

// export the userRouter to use in server.js
export default userRouter;
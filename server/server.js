// This is our main backend server file

// Import necessary modules
import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';



// Initialize express app
const app = express()

// calling the database connection function from db.js
connectDB()


// Middleware setup -- NOTE -(all the requests from frontend to backend will go through these middlewares)
app.use(cors());
app.use(express.json());



// route for our application
app.get('/', (req, res) => res.send("Server is running"))

// importing userRouter from userRoutes.js
app.use('/api/user', userRouter);

// importing ownerRouter from ownerRoutes.js
app.use('/api/owner', ownerRouter);

app.use('/api/bookings', bookingRouter);


const PORT = process.env.PORT || 5000;

// Only listen locally if NOT inside a Vercel Serverless Function
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;

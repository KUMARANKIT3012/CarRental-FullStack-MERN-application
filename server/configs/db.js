// server/configs/db.js 
// Database configuration file
import mongoose from 'mongoose';

const connectDB = async () => {
    // Connecting to MongoDB database
    try{

        // Event listener for successful connection
        mongoose.connection.on('connected', () => console.log("Database connected successfully"));

        // await is used to wait for the connection to be established
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`)

    // Catching any error during connection
    }catch(error){
        console.error(error.message);
    }
}

export default connectDB;
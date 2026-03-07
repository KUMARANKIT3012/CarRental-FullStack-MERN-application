// we have to store the car details in the database
// and to store any data in the database we need to create a model for that data

import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: 'User' },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true } // storing the timestamp so that we can know when the car was added
);

// using this schema we will create a model
// IMPORTANT: use mongoose.models.Car if it already exists to avoid OverwriteModelError
const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

// export the Car model to use it in other files
export default Car;

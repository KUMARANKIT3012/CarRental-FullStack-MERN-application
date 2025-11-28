import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;


const bookingSchema = new mongoose.Schema({
    car: { type: ObjectId, ref: 'Car', required: true },
    user: { type: ObjectId, ref: 'User', required: true },
    owner: { type: ObjectId, ref: 'User', required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    price: { type: Number, required: true }

},{ timestamps: true }); // storing the timestamp so that we can know when the car was added


// using this schema we will create a model
const Booking = mongoose.model('Booking', bookingSchema)

// export the Booking model to use it in other files
export default Booking;
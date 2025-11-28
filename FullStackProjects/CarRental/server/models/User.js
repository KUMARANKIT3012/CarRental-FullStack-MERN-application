// creating model for user using mongoose
// for user authentication purpose
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // defining schema for user model
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:["owner", "user"] , default: 'user'},
    image: {type: String, default: ''},
},{ timestamps: true });
// timestamps will tell us when the user is created and updated


// using this schema we can create a model
const User = mongoose.model('User', userSchema);


// export it so that we can use it in other files
export default User;
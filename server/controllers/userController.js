// function to register a new user

// importing the User model
import User from "../models/User.js";
// we will use bcrypt to hash the password
import bcrypt from "bcrypt";
// we will use jsonwebtoken to generate token for the user
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";


// GENERATE JWT TOKEN FUNCTION
const generateToken = (userId) => {
    const payload = userId;
    // signing the payload with secret key to generate token
    return jwt.sign(payload, process.env.JWT_SECRET);
}





// for registering a new user
export const registerUser = async (req, res) => {
    try {
        // we will request body for name, email, password --- it is done using req.body
        const { name, email, password } = req.body;

        // validating the input fields using simple if condition ---> using res.json to send response back to frontend
        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, message: "fill all the fields properly" })
        }


        // we will check wether the user already exists or not
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // now we will encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)


        // now we will create a new user using the User model
        // it will save the user to the database
        const user = await User.create({ name, email, password: hashedPassword })


        // whenever a user is registered successfully we have to generate a token for that user
        // with this token the user can access protected routes to perform certain actions
        const token = generateToken(user._id.toString())
        res.json({ success: true, token })
        // it will send the token back to the frontend


    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message })
    }
}






// function to login a user
export const loginUser = async (req, res) => {
    try {
        // we will get email and password from req.body
        const { email, password } = req.body;

        // find this user in the database using email
        const user = await User.findOne({ email })
        // if user not found with this email id:
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }


        // if user found then we will compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        // if password does not match
        if (!isMatch) {
            return res.json({ success: false, message: "invalid credentials" })
        }


        // if user is available and password matches then we will generate a token for that user
        const token = generateToken(user._id.toString())
        res.json({ success: true, token })


    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message })
    }
}




// Get user data using token (JWT) -- protected route
export const getUserData = async (req, res) => {
    try {
        const { user } = req; // getting user from req object which we have set in authMiddleware
        res.json({ success: true, user })
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message })
    }
}



// Get All Cars for the Frontend
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvailable: true });
        res.json({ success: true, cars });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get Single Car by ID
export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, car });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

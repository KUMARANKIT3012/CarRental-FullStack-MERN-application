// we will create an autherntication middleware in this file
// we have created this middleware to protect certain routes that require user to be logged in


// import necessary modules
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protect = async(req, res, next) => {

    // get the token from request headers
    const token = req.headers.authorization;

    // check if token is not present
    if(!token){
        return res.json({success: false, message: "No token, authorization denied"})
    }

    // now suppose token is present then we will verify the token
    try{

        // we will decode the token using jwt verify method
        // we will get the decoded token and from that decoded token we can get the user id
        const userId = jwt.decode(token, process.env.JWT_SECRET);

        // check if userId is not present
        if(!userId){
            return res.json({success: false, message: "Token is not valid"})
        }

        // now if the user is present then we will find the user from our database 
        req.user = await User.findById(userId).select('-password');
        // -password means it will remove the password field from the user data

        next(); // call the next middleware or route handler

    }catch(error){
        return res.json({success: false, message: "Token is not valid"})
    }
}    
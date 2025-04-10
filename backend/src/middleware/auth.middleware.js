import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAdminAuthenticated = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.adminToken 
    
        if(!token) {
            throw new ApiError(401, "unauthorised request")
        }
        console.log("TOKEN VALUE:", token);

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
        const user= await User.findById(decodedToken?.id).select("-password")
    
        if(!user || user.role !== "Admin") {
            throw new ApiError(401, "invalid token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token")
    }

});

export const isPatientAuthenticated = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.patientToken 
    
        if(!token) {
            throw new ApiError(401, "unauthorised request")
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
        const user= await User.findById(decodedToken?.id).select("-password")
    
        if(!user || user.role !== "patient") {
            throw new ApiError(401, "invalid token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token")
    }

})
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { generateTokens } from "../utils/jwtTokens.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerPatient = asyncHandler(async (req, res) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role
    } = req.body;

    if(
        [firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(409, "user already exists")
    };

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role
    })


    if(!user){
        throw new ApiError(500, "something went wrong")
    }

    generateTokens(user, "user registered successfully", 200, res)
})

const login = asyncHandler(async(req, res) => {
    const {email, password, confirmPassword, role} = req.body;

    if([email, password, confirmPassword, role].some((field) => String(field).trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if(password !== confirmPassword){
        throw new ApiError(400, "passwords do not match")
    }

    const user = await User.findOne({email}).select("+password")

    if (!user || role !== user.role || !(await user.comparePassword(password))) {
        throw new ApiError(400, "Invalid credentials");
    }
    

    generateTokens(user, "user logged in successfully", 200, res)


})

const addNewAdmin = asyncHandler(async(req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password
    } = req.body;

    if(
        [firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(409, "user already exists")
    };

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Admin"
    })

    if(!admin){
        throw new ApiError(500, "something went wrong")
    }

    generateTokens(admin, "user registered successfully", 200, res)
})

const getAllDoctors = asyncHandler(async(req, res) => {
    const doctors = await User.find({role: "doctor"});
    res.status(200).json({
        success: true,
        doctors
    })
})

const getUserDetails = asyncHandler(async(req,res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
})

const logoutAdmin = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate( 
        req.user.id,
        {
            $set: {
                adminToken: undefined
            }
        },
        {
            new: true
        }
    )

    res.status(200)
    .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None",
    })
    .json({
        success: true,
        message: "user logged out successfully",
    })
})

const logoutPatient = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate( 
        req.user.id,
        {
            $set: {
                patientToken: undefined
            }
        },
        {
            new: true
        }
    )

    res.status(200)
    .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None",
    })
    .json({
        success: true,
        message: "user logged out successfully",
    })
})

const addNewDoctor = asyncHandler(async(req, res, next) => {
    console.log("Body", req.body);
    console.log("Files", req.files);

    if(!req.files || Object.keys(req.files).length === 0) {
        throw new ApiError(400, "doctor avatar required")
    }

    console.log("Received files:", req.files);

    const {docAvatar} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)) {
        throw new ApiError(400, "file format not supported")
    }
    console.log("Uploading avatar:", docAvatar.name);


    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        doctorDepartment,
        role
    } = req.body;

    const requiredFields = [firstName, lastName, email, phone, dob, gender, doctorDepartment, role];
    if (requiredFields.some((field) => !field || (typeof field === "string" && field.trim() === ""))) {
        throw new ApiError(400, "all fields are required");
    }


    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(409, "user already exists")
    };

    const cloudinaryRes = await uploadOnCloudinary(docAvatar.tempFilePath)
    const docAvatarurl = cloudinaryRes.secure_url || cloudinaryRes.url

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        doctorDepartment,
        docAvatar: docAvatarurl,
        role
    })


    if(!doctor){
        throw new ApiError(500, "something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, doctor, "doctor registered successfully")
    )
})



export {
    registerPatient, 
    login, 
    addNewAdmin, 
    getAllDoctors, 
    getUserDetails, 
    logoutAdmin, 
    logoutPatient, 
    addNewDoctor
}
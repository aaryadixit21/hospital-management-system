import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "first name must conatain atleast 3 character"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "last name must conatain atleast 3 character"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "please provide valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "phone no must conatain atleast 10 character"],
        maxLength: [10, "phone no must conatain atleast 10 character"]   
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"]
    },
    password: {
        type: String,
        minLength: [4, "password must contain 8 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "patient", "doctor"]
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        type: String,
    },

}, {timestamps: true})


//methods
//save krne se pehle password hashed
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

//login ke time ke liye to check pw
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//generate tokens
userSchema.methods.generateJwtTokens = async function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES} )
}

export const User = mongoose.model("User", userSchema)
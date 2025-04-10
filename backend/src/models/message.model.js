import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, "message must conatain atleast 10 character"]
    },
}, {timestamps: true})

export const Message = mongoose.model("Message", messageSchema)
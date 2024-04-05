import mongoose from "mongoose";
import validator from "validator";

const messageSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minLength: [3, "first name must contain atleast 3 characters"]
    },
    lastname:{
        type: String,
        required: true,
        minLength: [3, "last name must contain atleast 3 characters"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "please provide a valid email"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [11, "phone number must contain atleast 11 characters"]
    },
    message:{
        type: String,
        required: true,
        minLength: [11, "message must contain atleast 11 characters"]
    },
});

export const Message = mongoose.model("Message", messageSchema);
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Message } from "../models/message.model.js";


const sendMessage = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, phone, message} = req.body

    if(
        [firstName, lastName, email, phone, message].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const recievedMessage = await Message.create({firstName, lastName, email, phone, message});

    return res.status(201).json(new ApiResponse(200, recievedMessage, "message sent successfully"))
})

const getAllMessages = asyncHandler(async(req, res) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages
    })
})

export  {sendMessage, getAllMessages}
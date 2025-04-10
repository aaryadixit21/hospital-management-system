import { Router } from "express";
import { getAllMessages, sendMessage } from "../controller/messgae.controller.js";
import { isAdminAuthenticated } from "../middleware/auth.middleware.js";

const messageRouter = Router()

messageRouter.route("/send").post(sendMessage)
messageRouter.route("/getall").get(isAdminAuthenticated ,getAllMessages)

export default messageRouter
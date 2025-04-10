import { Router } from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, registerPatient } from "../controller/user.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.middleware.js";

const userRouter = Router()

userRouter.route("/patient/register").post(registerPatient)
userRouter.route("/login").post(login)
userRouter.route("/admin/register").post(isAdminAuthenticated, addNewAdmin)
userRouter.route("/doctors").get(getAllDoctors)
userRouter.route("/admin/me").get(isAdminAuthenticated, getUserDetails)
userRouter.route("/patient/me").get(isPatientAuthenticated, getUserDetails)
userRouter.route("/admin/logout").get(isAdminAuthenticated, logoutAdmin)
userRouter.route("/patient/logout").get(isPatientAuthenticated, logoutPatient)
userRouter.route("/doctor/addnew").post(isAdminAuthenticated, addNewDoctor)



export default userRouter
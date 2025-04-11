import { Router } from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointment.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.middleware.js";

const appointmentRouter = Router()

appointmentRouter.route("/post").post(isPatientAuthenticated ,postAppointment)
appointmentRouter.route("/getall").get(isAdminAuthenticated ,getAllAppointments)
appointmentRouter.route("/status/:id").put(isAdminAuthenticated ,updateAppointmentStatus)
appointmentRouter.route("/delete/:id").delete(isAdminAuthenticated ,deleteAppointment)


export default appointmentRouter
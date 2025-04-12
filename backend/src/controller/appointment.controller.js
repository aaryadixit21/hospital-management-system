import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Appointment } from "../models/appointment.model.js";


export const postAppointment = asyncHandler(async(req, res) => {
    console.log("Incoming request body:", req.body);

    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointmentDate,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address
    } = req.body;

    const requiredFields = [
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointmentDate,
        department,
        doctor_firstName,
        doctor_lastName,
        address
      ];
      
      // Check for empty strings or missing values (excluding booleans like hasVisited)
      if (
        requiredFields.some(
          (field) => field === undefined || field === null || (typeof field === "string" && field.trim() === "")
        ) || typeof hasVisited !== "boolean"
      ) {
        throw new ApiError(400, "all fields are required");
      }
      

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "doctor",
        doctorDepartment: department
    })

    if(isConflict.length === 0) {
        throw new ApiError(404, "doctor not found")
    }

    if(isConflict.length > 1) {
        throw new ApiError(404, "contact through email or phone")
    }

    const doctorId = isConflict[0]._id
    const patientId = req.user._id

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointmentDate,
        department,
        doctor : {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId
    });
    return res.status(201)
    .json(new ApiResponse(200, appointment, "appointment sent successfully"))
})


export const getAllAppointments = asyncHandler(async(req, res) => {
    const appointments = await Appointment.find();
    return res.status(201)
    .json(new ApiResponse(200, appointments, "appointments received successfully"))

})


export const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }
    

    if (req.body.status && !["pending", "accepted", "rejected"].includes(req.body.status)) {
        throw new ApiError(400, "Invalid status value");
    }


    const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        req.body,
        { 
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
      
  
    return res
      .status(200)
      .json(new ApiResponse(200, updatedAppointment, "Status updated successfully")
    );
});
  

export const deleteAppointment = asyncHandler(async(req, res) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment) {
        throw new ApiError(404, "appointment not found")
    }
    await appointment.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, "appointment deleted")
    );
})
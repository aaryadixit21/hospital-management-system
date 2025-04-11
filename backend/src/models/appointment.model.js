import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain at least 3 characters"]
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain at least 3 characters"]
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
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
  appointmentDate: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  doctor: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  hasVisited: {
    type: Boolean,
    default: false
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);

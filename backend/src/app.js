import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"

const app = express();

//cors cookie-parser are middlewares
//connected to frontend
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);

//to get cookies
app.use(cookieParser());
//data comes in json format.. this is parse data into string format
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/", // or any temp directory
      limits: { fileSize: 10 * 1024 * 1024 }, // Optional: 10 MB file size limit
      abortOnLimit: true,
      safeFileNames: true,
      preserveExtension: true,
    })
  );




import messageRouter from "./router/message.router.js";
import userRouter from "./router/user.router.js";
import appointmentRouter from "./router/appointment.router.js";

app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/appointment", appointmentRouter)

export {app}
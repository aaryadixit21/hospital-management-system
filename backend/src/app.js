import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

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


app.use(fileUpload)

export {app}
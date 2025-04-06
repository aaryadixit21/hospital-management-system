import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});

import connectDB from "./dbConnection/index.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 4000}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    }
);
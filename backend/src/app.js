import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public")) //store file,folder,images on our server
app.use(cookieParser())

import employeesRouter from "./routers/employee.routes.js"

app.use("/api/v1/employees",employeesRouter);

export {app};
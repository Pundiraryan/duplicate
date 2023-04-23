import express from "express";
import connectDB from "./db/dbconnector.js";
import router from "./routes/allRoutes.js";
import cors from "cors";
import helmet from "helmet";
import dotenv from 'dotenv';
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
// });
app.post("/auth/register", register);
app.use("/auth", authRoutes);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const port = process.env.PORT || "4000";
const dburl=process.env.dbUrl||"mongodb://localhost:27017";
connectDB(dburl);
// app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(router)
app.listen(port,()=>{
console.log(`server running at url- http://localhost:${port}`);})
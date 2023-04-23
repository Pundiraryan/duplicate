import express from "express";
import connectDB from "./db/dbconnector.js";
import router from "./routes/allRoutes.js";
// import bodyParser from 'bod'
const app=express();
app.use(express.json());
const port = process.env.PORT || "4000";
const dburl=process.env.dbUrl||"mongodb://localhost:27017";
connectDB(dburl);
// app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(router)
app.listen(port,()=>{
console.log(`server running at url- http://localhost:${port}`);})
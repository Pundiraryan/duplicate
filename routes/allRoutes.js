import express from "express";
import userModel from "../models/user.js";
import nodemailer from 'nodemailer';
import mongodb from 'mongodb';
const router=express.Router();
router.get("/PoolMemberDetails/:id",async (req,res)=>{
    try {
        console.log(req.params.id);
        const result=await userModel.find({place:req.params.id});
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error)
    }
})
router.delete("/PoolMemberDetails/:id",async (req,res)=>{
    try {
        const result=await userModel.remove({phone:req.params.id});
        res.status(201).json({message:"user deleted successfully"});
        console.log(result);
    } catch (error) {
        console.log(error)
    }
})
// const deleteAfterTime=async ()=>{
// setTimeout(async (time)=>{
            //     try {
            //         const result=await userModel.remove({time:time});
            //         res.status(201).json({message:"user deleted successfully after 10 seconds"});
            //         console.log(result);
            //     } catch (error) {
            //         console.log(error)
            //     }
            // },10000)
// }
// try {
//     const result=await userModel.deleteOne({_id:new mongodb.ObjectId(req.params.id)});
//     res.status(201).json({message:"user deleted successfully"});
//     console.log(result);
// } catch (error) {
//     console.log(error)
// }
router.post("/PoolMemberDetails",async (req,res)=>{
    console.log(req.body);
    const {name,time,phone,place}=req.body;
        try {
            const userExists= await userModel.findOne({phone:phone});
            if(userExists){
             return res.status(422).json({error:"user with this phone already exists"})
            }
            const user= new userModel(({name,time,phone,place}));
            await user.save();
            
            res.status(201).json({message:"user registered successfully"});
         } catch (error) {
             console.log(error.message);
         }
    }
)
router.post("/contact",(req,res)=>{
    const {fname,lname,email,message}=req.body;
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'autopoolcorporation@gmail.com',
            pass:'qtunmiaewxhyqaik'
        }

    })
    var mailoptions={
        from:'autopoolcorporation@gmail.com',
        to:email,
        subject:'Thanks for your valuable feedback '+ fname,
        text:'We appreciate your valuable feedback dear'+fname+'and time that you spent . Thank you'
    }
    transporter.sendMail(mailoptions,(error,info)=>{
        if(error){console.log(error);}
        else{
            res.send("response submitted successfully");
            console.log("email sent " +info.response);
        }
    })
})
export default router;
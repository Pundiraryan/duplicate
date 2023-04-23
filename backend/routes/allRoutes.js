import express from "express";
import userModel from "../models/user.js";
const router=express.Router();
router.put("/api/submitfood/:id",async (req,res)=>{
    try {
        const tbu=await userModel.findOneAndUpdate({phone:req.params.id},{fooddescr:req.body.fooddesc,foodcount:req.body.food},{upsert:true});
        console.log(tbu);
        res.send("update made sucessfully");
    } catch (error) {
        res.send(error);
    }
})
router.put("/api/submitwater/:id",async (req,res)=>{
    try {
        const tbu=await userModel.findOneAndUpdate({phone:req.params.id},{waterdescr:req.body.waterdesc,watercount:req.body.water},{upsert:true});
        console.log(tbu);
        res.send("update made sucessfully");
    } catch (error) {
        res.send(error);
    }
})
router.put("/api/submitfinance/:id",async (req,res)=>{
    try {
        const tbu=await userModel.findOneAndUpdate({phone:req.params.id},{financedescr:req.body.financedesc,financecount:req.body.finance},{upsert:true});
        console.log(tbu);
        res.send("update made sucessfully");
    } catch (error) {
        res.send(error);
    }
})
router.get("/careplaceDetails/all",async (req,res)=>{
    try {
        const result=await userModel.find();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})
router.get("/careplaceDetails/:id",async (req,res)=>{
    try {
        console.log(req.params.id);
        const result=await userModel.find({phone:req.params.id});
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
router.post("/careplaceDetails/submit",async (req,res)=>{
    console.log(req.body);
    const {careplace,supname,supid,pwd,phone,add,staffsize,feedback}=req.body;
        try {
            const userExists= await userModel.findOne({phone:supid});
            if(userExists){
             return res.status(422).json({error:"user with this phone already exists"})
            }
            const user= new userModel(({careplace,supname,supid,pwd,phone,add,staffsize,feedback}));
            await user.save();
            
            res.status(201).json({message:"user registered successfully"});
         } catch (error) {
             console.log(error.message);
         }
    }
);

export default router;
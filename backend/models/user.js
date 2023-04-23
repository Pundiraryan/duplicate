import mongoose from "mongoose";
const careplaceSchema=new mongoose.Schema({
    careplace:{type:String,required:true},
    supname:{type:String,required:true},
    supid:{type:String,required:true},
    pwd:{type:String,required:true},
    phone:{type:Number,required:true},
    add:{type:String,required:true},
    staffsize:{type:Number},
    foodcount:{type:Number,default:10},
    fooddescr:{type:String},
    watercount:{type:Number,default:10},
    waterdescr:{type:String},
    financecount:{type:Number,default:10},
    financedescr:{type:String},
})
const userModel=mongoose.model("hosteldata",careplaceSchema);
export default userModel;

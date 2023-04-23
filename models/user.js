import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String},
    time:{type:Date},
    phone:{type:String},
    place:{type:String}
})
// userSchema.index({time:1},{expireAfterSeconds:1200});
const userModel=mongoose.model("pooldata",userSchema);
export default userModel;

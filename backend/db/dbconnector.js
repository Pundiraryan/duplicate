import mongoose from "mongoose";
const dboptions={
    dbName:"careplaces"
}
const connectDB=async (url)=>{
    try {
        await mongoose.connect(url,dboptions)
        console.log("connection made sucessfully")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;
const mongoose=require('mongoose')
const express=require('express')
const app=express()
app.use(express.json())

async function connectToDb(){
    try
    {
        const connection=await mongoose.connect("mongodb+srv://Mayuri:Mayuri24@cluster0.rdnwxxx.mongodb.net/ass3b")
        console.log("Connected to MongoDB Successfully!!")
    }
    catch(error)
    {
        console.log("Error while connection to mongodb!!",error)
    }
}
const schema=new mongoose.Schema({
    name:String,
    surname:String
})
const User=mongoose.model("Profile",schema)

//adduser
app.post("/adduser",async(req,res)=>{
    try
    {
        const data=new User(req.body)
        await data.save()
        res.status(200).json({message:"Added Data Successfully!!",user:data})
    }
    catch(error)
    {
        res.status(500).json({messgae:"Error while adding data!!"})
    }
})
//retrieve user
app.get("/finduser",async(req,res)=>{
    try
    {
        const find=await User.find()
        res.status(200).json({message:"Data Fetched Successfully!!",data:find})
    }
    catch(error)
    {
        res.status(500).json({messgae:"Error while fetching data!!"})
    }
})
//update user
app.put("/updateuser/:id",async(req,res)=>{
    try
    {
        const userid=req.params.id
        const updatebody=req.body
        const update=await User.findByIdAndUpdate(userid,updatebody,{new:true})
        res.status(200).json({message:"Data Updated Successfully!!"})
    }
    catch(error)
    {
        res.status(500).json({messgae:"Error while updating data!!"})
    }
})
//delete user
app.delete("/deleteuser/:id",async(req,res)=>{
    try
    {
        const userid=req.params.id;
        const remove=await User.findOneAndDelete(userid)
        res.status(200).json({message:"Data Deleted Successfully!!"})
    }
    catch(error)
    {
        res.status(500).json({messgae:"Error while deleting data!!"})
    }
})
app.listen(3000,()=>{
    console.log("Server running on port 3000")
})
connectToDb()
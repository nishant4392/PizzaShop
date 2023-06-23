const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    password:String,
    email:String,
    cart:[],
    isAdmin:{type:Boolean,default:false}
})

module.exports=mongoose.model("allUsers",userSchema);
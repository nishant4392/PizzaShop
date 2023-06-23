const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    userId:String,
    userName:String,
    userEmail:String,
    cart:[],
    sumPaid:Number,
    token:{},
    paymentId:String,
    orderedOn:String
})

module.exports=mongoose.model("orderList",orderSchema);

const mongoose = require("mongoose");

const cartSchema=mongoose.Schema({
    serialNum:String,
    name: String,
    varient:String,
    quantity:Number,
    price:Number,
    totalPrice:Number
})

module.exports=mongoose.model("allCartItemList",cartSchema);
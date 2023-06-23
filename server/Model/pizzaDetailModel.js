const mongoose=require("mongoose");

const pizzaDetailSchema=mongoose.Schema(
    {   
        name: String,
        sizes: [],
        category: String,
        description: String
    }
)

module.exports=mongoose.model("allPizzaList",pizzaDetailSchema);

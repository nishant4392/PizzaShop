const mongoose = require("mongoose");
const connectToPizzaWebDb=()=>{
    try{
        const url=process.env.MONGO_URL;
        const makeConnection=mongoose.connect(url,{
            useUnifiedTopology:true,
        });
        console.log("connected to database");
    }
    catch(err){
        console.log(err.message);
    }
}


module.exports=connectToPizzaWebDb;
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const cors = require("cors")
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51MjGv7SGd2RtTHPIEpc7Bf9bWteylE4l3yqDKKEtdStH79UKgUjiywx2mkttfRP1QPTvfKJGJGtRpJjGAJ4IQflj000jqrbiVQ");

require("colors");



//making the connection to the database 
const connectToPizzaWebDb = require("./Config/pizzaWebDb");
dotenv.config();
connectToPizzaWebDb(); //done making it

const pizzaCollectionModel = require("./Model/pizzaDetailModel"); // contains the collection that has pizzas.
const cartCollectionModel = require("./Model/cartDetailsModel");//contains the collection that has carted pizzas.
const userCollectionModel = require("./Model/userDetailModel");
const orderCollectionModel = require("./Model/orderDetailsModel");




const app = express();

app.use(cors());
app.use(express.json()); // this specifies which type of data we will be getting in the body. this means that our body will be coming in json format read it as a json.
app.use(morgan("dev"))

//pizza api----------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
    console.log("server running on port 5000");
    let currentDate = new Date().toISOString().slice(0, 10);
    let currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    let orderedOn = currentDate + " " + currentTime;
    res.send(orderedOn)
})

app.get("/api-pizza-list", async (req, res) => {
    let result = await pizzaCollectionModel.find();
    res.send(result);
})

app.put("/update-pizza/:id", async (req, res) => {
    let newSizes = [
        { name: "Small", price: Number(req.body.small) },
        { name: "Medium", price: Number(req.body.medium) },
        { name: "Large", price: Number(req.body.large) }
    ]
    let result= await pizzaCollectionModel.updateOne({_id:req.params.id},{
        $set: { name:req.body.name ,sizes:newSizes, category:req.body.category, description:req.body.description}
    })
    res.send(result);
})

app.post("/add-pizza",async(req,res)=>{
    let result=new pizzaCollectionModel(req.body);
    result=await result.save();
    res.send(result);
})

app.delete("/delete-pizza/:id",async(req,res)=>{
    let result=await pizzaCollectionModel.deleteOne({_id:req.params.id});
    res.send(result);
})

//cart api----------------------------------------------------------------------------------------------------------------
app.get("/api-cart-list/:userId", async (req, res) => {
    let result = await userCollectionModel.findOne({ _id: req.params.userId });
    res.send(result.cart);
})


app.post("/add-to-cart/:userId", async (req, res) => {
    let user1 = await userCollectionModel.findOne({ _id: req.params.userId });
    let id = new mongodb.ObjectId();
    let user = await userCollectionModel.updateOne({
        _id: req.params.userId
    },
        {
            $set: { cart: [...user1.cart, { ...req.body, _id: id }] }
        })
    res.send({
        ...req.body,
        _id: id
    });
})



app.put("/remove-from-cart/:userId/:id", async (req, res) => {
    let user = await userCollectionModel.findOne({ _id: req.params.userId });
    // console.log(user);
    let newCart = user.cart.filter((obj) => obj._id != req.params.id);
    // console.log(newCart);
    user = await userCollectionModel.updateOne({
        _id: req.params.userId
    }, {
        $set: { cart: [...newCart] }
    })
    res.send(newCart);
})


app.delete("/clear-cart/:userId", async (req, res) => {
    let user = await userCollectionModel.updateOne({
        _id: req.params.userId
    }, {
        $set: { cart: [] }
    })
    res.send(user);
})


app.put("/add-quantity/:userId/:id", async (req, res) => {
    // console.log("----------------------------------------------------------------------------------")
    let user = await userCollectionModel.findOne({ _id: req.params.userId }, { cart: 1, _id: 0 });
    let cartOb = user.cart.filter((obj) => obj._id == req.params.id);
    // console.log("the quantity is -------", cartOb[0].quantity);
    cartOb[0].quantity = Number(cartOb[0].quantity) + 1
    cartOb[0].totalPrice = cartOb[0].totalPrice + cartOb[0].price
    cartOb[0].totalPrice = Number(cartOb[0].totalPrice.toFixed(2))
    // console.log(cartOb[0].totalPrice)
    let newCart = user.cart.filter((obj) => obj._id != req.params.id);
    newCart = [...newCart, ...cartOb];
    user = await userCollectionModel.updateOne({ _id: req.params.userId }, {
        $set: { cart: newCart }
    });
    res.send(user);
})


app.put("/sub-quantity/:userId/:id", async (req, res) => {
    // console.log("----------------------------------------------------------------------------------")
    let user = await userCollectionModel.findOne({ _id: req.params.userId }, { cart: 1, _id: 0 });
    let cartOb = user.cart.filter((obj) => obj._id == req.params.id);
    let newCart = user.cart.filter((obj) => obj._id != req.params.id);
    cartOb[0].quantity = Number(cartOb[0].quantity) - 1
    cartOb[0].totalPrice = cartOb[0].totalPrice - cartOb[0].price
    cartOb[0].totalPrice = Number(cartOb[0].totalPrice.toFixed(2))
    console.log(cartOb[0].totalPrice)
    if (cartOb[0].quantity != 0) {
        newCart = [...newCart, ...cartOb];
    }
    user = await userCollectionModel.updateOne({ _id: req.params.userId }, {
        $set: { cart: newCart }
    });
    res.send(user);
})


//user api-----------------------------------------------------------------------------------------------------------------

app.post("/add-user", async (req, res) => {
    // console.log("the body is --------------------------", req.body);
    let userToAdd = new userCollectionModel({ ...req.body, cart: [] })
    userToAdd = await userToAdd.save();
    res.send(userToAdd);
})

app.post("/login-user", async (req, res) => {
    // console.log(req.body);
    let user = await userCollectionModel.findOne({ ...req.body });
    if (user) {
        // console.log("user is there")
    }
    else {
        // console.log("no user found");
    }
    res.send(user);
})

app.get("/get-all-users", async (req, res) => {
    let result = await userCollectionModel.find({}, { cart: 0 });
    res.send(result);
})

app.delete("/delete-user/:id", async (req, res) => {
    let result = await userCollectionModel.deleteOne({ _id: req.params.id });
    res.send(result);
})

// order api ----------------------------------------------------------------------------------------------------------------------

app.post("/make-order", async (req, res) => {
    // console.log("came to the register successfull api in node");
    const { token, user, cart, sumPaid } = req.body;
    // console.log(token);
    // console.log(user);
    // console.log(cart);
    // console.log(sumPaid);
    const customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
        source: token.id
    });
    // console.log(customer.id);
    // console.log("the card id", token.card.id);
    const payment = await stripe.paymentIntents.create({
        amount: sumPaid * 100,
        currency: "inr",
        customer: customer.id,
        payment_method: token.card.id
    })

    const confirmedPayment = await stripe.paymentIntents.confirm(
        payment.id, {
        payment_method: token.card.id
    }
    )

    // console.log("------------------------------------------------------------------------------------------------------------", payment);
    // console.log("----------------------------------------------------------------------------------------------------------", confirmedPayment);
    res.send(payment);
})

app.post("/register-successfull-order", async (req, res) => {
    let currentDate = new Date().toISOString().slice(0, 10);
    let currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    let orderedOn = currentDate + " at " + currentTime;
    let result = new orderCollectionModel({ ...req.body, orderedOn });
    result = await result.save();
    res.send(result);
})

app.get("/order-list/:id", async (req, res) => {
    let result = await orderCollectionModel.find({ userId: req.params.id });
    // console.log("filtered ordered list is", result);
    res.send(result);
})

app.get("/get-all-orders",async(req,res)=>{
    let result= await orderCollectionModel.find({},{cart:0,token:0,userName:0,userId:0});
    res.send(result);
})

app.delete("/delete-order-from-all-orders/:id",async(req,res)=>{
    let result= await orderCollectionModel.deleteOne({_id:req.params.id});
    res.send(result);
})

const port = process.env.PORT || 5000;
app.listen(port)
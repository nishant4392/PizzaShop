import {takeEvery,put} from "redux-saga/effects";

function* apiForPizzaList(){
    let result=yield fetch("http://localhost:5000/api-pizza-list");
    result=yield result.json();
    yield put({
        type:"SET_PIZZA_LIST",
        data:result
    })
}

function* apiForUpdatingPizzaInAllPizzaList(action){
    let result= yield fetch(`http://localhost:5000/update-pizza/${action.userId}`,{
        method:"put",
        body:JSON.stringify(action.objectToSend),
        headers:{
            "content-type":"application/json"
        }
    })
    yield put({
        type:"GET_PIZZA_LIST",
        data:result
    })
}

function* apiForAddingToAllPizzaList(action){
    let result= yield fetch("http://localhost:5000/add-pizza",{
        method:"post",
        body:JSON.stringify(action.objectToSend),
        headers:{
            "content-type":"application/json"
        }
    })
    yield put({
        type:"GET_PIZZA_LIST",
        data:result
    })
}

function* apiForDeletingFromPizzaList(action){
    let result=yield fetch(`http://localhost:5000/delete-pizza/${action.userId}`,{
        method:"delete"
    })
    yield put({
        type:"GET_PIZZA_LIST",
        data:result
    })
}


function* apiForAddingToCart(action){
    console.log("came to add to cart api the id and product is",action.userId,action.product);
    let result=yield fetch(`http://localhost:5000/add-to-cart/${action.userId}`,{
        method:"post",
        body:JSON.stringify(action.product),
        headers:{
            "content-type":"application/json"
        }
    })
    result=yield result.json();
    yield put({
        type:"SET_CART_LIST",
        data:result
    })
}

function* apiForCartList(action){
    let finalPrice=0
    console.log("came to the api for crting pizza list")
    let result=yield fetch(`http://localhost:5000/api-cart-list/${action.userId}`);
    result=yield result.json();

    result.map((item,index)=>{
        finalPrice=finalPrice+item.totalPrice
        return null
    }) 
    finalPrice=Number(finalPrice.toFixed(2));
    yield put({
        type:"GET_CARTED_LIST",
        data:result
    })
    yield put({
        type:"SET_PRICE",
        finalPrice
    })
}

function* apiForClearCartList(action) {
    let result=yield fetch(`http://localhost:5000/clear-cart/${action.userId}`,{
        method:"delete"
    });
    result=yield result.json();
    yield put({
        type:"SET_CLEARED_CART_LIST",
        data:result
    })
}

function* apiForRemoveFromCart(action){
    console.log("in remove cart api",action.userId,action.productId);
    yield fetch(`http://localhost:5000/remove-from-cart/${action.userId}/${action.productId}`,{
        method:"put"
    })
    yield put({
        type:"CARTED_PIZZA_LIST",
        userId:action.userId
    })
}


function* apiForIncreaseQuantity(action){
    console.log("the user id is ",action.userId);
    console.log("the product id is ",action.productId);
    yield fetch(`http://localhost:5000/add-quantity/${action.userId}/${action.productId}`,{
        method:"put"
    })
    yield put({
        type:"CARTED_PIZZA_LIST",
        userId:action.userId
    })
}

function* apiForDecreaseQuantity(action){
    yield fetch(`http://localhost:5000/sub-quantity/${action.userId}/${action.productId}`,{
        method:"put"
    })
    yield put({
        type:"CARTED_PIZZA_LIST",
        userId:action.userId
    })
}

function* apiForRegisterUser(action){
    console.log("apiForRegisterUser",action.data);
    let result= yield fetch("http://localhost:5000/add-user",{
        method:"post",
        body:JSON.stringify(action.data),
        headers:{
            "content-type":"application/json"
        }
    })
    result=yield result.json()
    alert("you are successfully registered");
    yield put({
        type:"SET_USER",
        data:result
    })
}

function* apiForLoginUser(action){
    let result= yield fetch("http://localhost:5000/login-user",{
        method:"post",
        body:JSON.stringify(action.data),
        headers:{
            "content-type":"application/json"
        }
    })

    result=yield result.json();
    if(result._id){
        alert("you are successfully logged in")
        yield put({
            type:"SET_USER",
            data:result
        })
        yield put({
            type:"CARTED_PIZZA_LIST",
            userId:result._id
        })
    }
    else{
        alert("no user found");
    }
}


function* apiForLogOutUser(action){
    yield put({
        type:"SET_CLEARED_CART_LIST",
        data:action.data
    })
    yield put({
        type:"RESET_USER",
        data:action.data
    })
}

function* apiForRegisteringSuccessfullOrder(action){
    console.log("the registering order saga the result is ");
    let result= yield fetch("http://localhost:5000/register-successfull-order",{
        method:"post",
        body:JSON.stringify(action.data),
        headers:{
            "content-type":"application/json"
        }
    })
    result=yield result.json();
    console.log("the registering order saga the result is ",result);
}

function* apiForGettingSuccessfullOrder(action){
    let result= yield fetch(`http://localhost:5000/order-list/${action.userId}`);
    result= yield result.json();
    console.log("came to get order list",result);
    yield put ({
        type:"SET_ORDER_LIST",
        data:result
    })
}

function* apiForGettingAllUsers(action){
    let result= yield fetch("http://localhost:5000/get-all-users");
    result= yield result.json();
    yield put({
        type:"SET_ALL_USERS",
        data:result
    })
}

function* apiForDeletingAUser(action){
    let result=yield fetch(`http://localhost:5000/delete-user/${action.userId}`,{
        method:"delete"
    });
    result=yield result.json();
    yield put({
        type:"GET_ALL_USERS",
        data:result
    })
}

function* apiForGettingAllOrders(action){
    let result= yield fetch("http://localhost:5000/get-all-orders");
    result=yield result.json()
    yield put({
        type:"SET_ALL_ORDERS_LIST",
        data:result
    })
}

function* apiForDeletingAOrderFromAllOrder(action){
    let result =yield fetch(`http://localhost:5000/delete-order-from-all-orders/${action.userId}`,{
        method:"delete"
    })
    yield put({
        type:"GET_ALL_THE_ORDERS",
        data:result
    })
}

function* pizzaSaga(){
    yield takeEvery("GET_PIZZA_LIST",apiForPizzaList);
    yield takeEvery("ADD_TO_CART",apiForAddingToCart);
    yield takeEvery("CARTED_PIZZA_LIST",apiForCartList);
    yield takeEvery("CLEAR_CART_LIST",apiForClearCartList);
    yield takeEvery("REMOVE_FROM_CART",apiForRemoveFromCart);
    yield takeEvery("INCREASE_QUANTITY",apiForIncreaseQuantity);
    yield takeEvery("DECREASE_QUANTITY",apiForDecreaseQuantity);
    yield takeEvery("REGISTER_USER",apiForRegisterUser);
    yield takeEvery("LOGIN_USER",apiForLoginUser);
    yield takeEvery("LOGOUT_USER",apiForLogOutUser);
    yield takeEvery("REGISTER_SUCCESSFULL_ORDER",apiForRegisteringSuccessfullOrder);
    yield takeEvery("GET_ORDERS",apiForGettingSuccessfullOrder);
    yield takeEvery("GET_ALL_USERS",apiForGettingAllUsers);
    yield takeEvery("DELETE_A_USER",apiForDeletingAUser);
    yield takeEvery("UPDATE_IN_ALL_PIZZA_LIST",apiForUpdatingPizzaInAllPizzaList);
    yield takeEvery("ADD_A_PIZZA_IN_LIST",apiForAddingToAllPizzaList)
    yield takeEvery("DELETE_FROM_ALL_PIZZA_LIST",apiForDeletingFromPizzaList);
    yield takeEvery("GET_ALL_THE_ORDERS",apiForGettingAllOrders);
    yield takeEvery("DELETE_A_ORDER_FROM_ALL_ORDERS",apiForDeletingAOrderFromAllOrder);
}

export default pizzaSaga;
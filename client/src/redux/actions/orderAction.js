export const placeOrder=(token,user,cart,sumPaid,paymentId)=>{
    let data={
        token,
        userId:user.id,
        userName:user.name,
        userEmail:user.email,
        cart,
        sumPaid,
        paymentId
    }
    console.log(" in register order action");
    return({
        type:"REGISTER_SUCCESSFULL_ORDER",
        data
    })
}

export const getOrder=(userId)=>{
    return ({
        type:"GET_ORDERS",
        userId
    })
}
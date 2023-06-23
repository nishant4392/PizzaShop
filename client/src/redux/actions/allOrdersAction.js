export const getAllOrdersListAction=(data)=>{
    return({
        type:"GET_ALL_THE_ORDERS",
        data
    })
}

export const deleteFromAllOrdersList=(userId)=>{
    return({
        type:"DELETE_A_ORDER_FROM_ALL_ORDERS",
        userId
    })
}
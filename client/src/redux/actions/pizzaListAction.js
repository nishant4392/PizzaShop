export const getAllPizzaListAction=(data)=>{
    return({
        type:"GET_PIZZA_LIST",
        data
    })
}

export const updateAllPizzaList=(userId,objectToSend)=>{
    return({
        type:"UPDATE_IN_ALL_PIZZA_LIST",
        userId,
        objectToSend
    })
}

export const addToAllPizzaListAction=(objectToSend)=>{
    return({
        type:"ADD_A_PIZZA_IN_LIST",
        objectToSend
    })
}

export const deleteFromAllPizzaList=(userId)=>{
    return({
        type:"DELETE_FROM_ALL_PIZZA_LIST",
        userId
    })
}
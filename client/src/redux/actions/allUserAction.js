export const getAllUsers=(data)=>{
    return({
        type:"GET_ALL_USERS",
        data
    })
}

export const deleteFromAllUser=(userId)=>{
    return({
        type:"DELETE_A_USER",
        userId
    })
}
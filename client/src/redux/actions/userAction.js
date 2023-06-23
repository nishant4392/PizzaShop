export const addUser=(name,email,password)=>{
    let data={name,email,password};
    return({
        type:"REGISTER_USER",
        data
    })
}

export const loginUser=(email,password)=>{
    let data={email,password};
    return({
        type:"LOGIN_USER",
        data
    })
}

export const logoutUser=(data)=>{
    return({
        type:"LOGOUT_USER",
        data
    })
}

export const getUser=(data)=>{
    return({
        type:"GET_USER",
        data
    })
}
export const userManager=(state={},action)=>{
    switch (action.type) {
        case "SET_USER":
            state={show:true,...action.data};
            return state
        case "RESET_USER":
            alert("you are logged out successfully");
            state={};
            return state
        case "GET_USER":
            return state
        default:
            return state
    }
}
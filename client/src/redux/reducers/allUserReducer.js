export const allUserManager=(state={users:[]},action)=>{
    switch (action.type) {
        case "SET_ALL_USERS":
            state.users=[...action.data]
            return {
                show:true,
                users:state.users
            }
        default:
            return state
    }
}
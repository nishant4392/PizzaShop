export const cartListManager=(state={cart:[]},action)=>{
    switch (action.type) {
        case "GET_CARTED_LIST":
            return {
                show:true,
                cart:[...action.data]
            }   
        case "SET_CART_LIST":
            state.cart=[...state.cart,action.data]
            return state
        case "SET_CLEARED_CART_LIST":
            console.log("came to reducer for clear cart list");
            state.cart=[]
            return state
        default:
            return state
    }
}
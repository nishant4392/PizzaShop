export const orderManager=(state={orders:[]},action)=>{
    switch (action.type) {
        case "SET_ORDER_LIST":
            state.orders=[...action.data]
            return {
                show:true,
                orders:state.orders
            }
        default:
           return state
    }
}
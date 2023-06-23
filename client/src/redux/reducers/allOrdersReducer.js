export const AllOrdersManager=(state={orders:[]},action)=>{
    switch (action.type) {
        case "SET_ALL_ORDERS_LIST":
            state.orders=action.data;
            return({
                show:true,
                orders:state.orders
            })
    
        default:
            return state
    }
}
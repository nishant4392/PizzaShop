export const getAllPizzaListManager=(state={pizzas:[]},action)=>{
    switch(action.type){
        case "SET_PIZZA_LIST":
            return {
                show:true,
                pizzas:[...action.data]
            }
        default:
            console.log("default called");
            return state
    }
}


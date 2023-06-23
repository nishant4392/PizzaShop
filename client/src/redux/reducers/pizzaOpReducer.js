export const pizzaToOperateOnManager=(state={},action)=>{
    switch (action.type) {
        case "SET_THE_PIZZA":
            state=action.pizza
            return state
        default:
            return state
    }
}
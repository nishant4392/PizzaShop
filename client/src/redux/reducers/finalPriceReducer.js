export const finalPriceManager=(state=0,action)=>{
    switch (action.type) {
        case "SET_PRICE":
            state=action.finalPrice
            return state   
        default:
            return state
    }
}
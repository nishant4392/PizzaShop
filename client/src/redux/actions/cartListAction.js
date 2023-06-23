export const getCartList=(userId)=>{
    return({
        type:"CARTED_PIZZA_LIST",
        userId
    })
}

export const addToCart=(userId,product)=>{
    console.log("came to add to cart action th id and product is",userId,product);
    return({
        type:"ADD_TO_CART",
        userId,
        product
    })
}

export const clearCart=(userId)=>{
    return({
        type:"CLEAR_CART_LIST",
        userId
    })
}

export const removeFromCart=(userId,productId)=>{
    console.log("in the remove cart",userId,productId)
    return ({
        type:"REMOVE_FROM_CART",
        userId,
        productId
    })
}

export const increaseQuantity=(userId,productId)=>{
    return ({
        type:"INCREASE_QUANTITY",
        userId,
        productId
    })
}

export const decreaseQuantity=(userId,productId)=>{
    return({
        type:"DECREASE_QUANTITY",
        userId,
        productId
    })
}

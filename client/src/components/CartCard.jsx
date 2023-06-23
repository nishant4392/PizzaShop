import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { decreaseQuantity, getCartList, increaseQuantity, removeFromCart } from '../redux/actions/cartListAction';

const CartCard = (props) => {
    const user=useSelector((state)=>state.userManager);
    const pizza =props.pizza;
    const dispatch=useDispatch()
    const clicker=()=>{
      dispatch(getCartList(user._id));
      dispatch(removeFromCart(user._id,pizza._id));
      dispatch(getCartList(user._id));
    }
    const adder=()=>{
      console.log("the user id is",user._id)
      if(pizza.quantity<10){
        dispatch(increaseQuantity(user._id,pizza._id));
      }
      else{
        alert("You can not add more then 10");
      }
    }

    const subtracter=()=>{
      console.log("the user id is",user._id)
      dispatch(decreaseQuantity(user._id,pizza._id));
      dispatch(getCartList(user._id));
    }

  return (
    <div className='cart-card'>
        <div>{pizza.name}</div>
        <div>{pizza.varient}</div>
        <div>{pizza.quantity}</div>
        <div>{pizza.price}</div>
        <div>{pizza.totalPrice}</div>
        <div className='cart-card-button'><button onClick={adder}>add</button><button onClick={subtracter}>sub</button><button onClick={clicker}>Remove</button></div>
    </div>
  )
}

export default CartCard

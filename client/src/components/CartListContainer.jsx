import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartList } from '../redux/actions/cartListAction';
import { useSelector } from 'react-redux';
import CartCard from './CartCard';
import CheckOut from './CheckOut';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";




const CartListContainer = () => {
  const stripePromise=loadStripe("pk_test_51MjGv7SGd2RtTHPImrxSytqlt7KsNaDGn2w7k2aOhh2qGD67bJXKkPEVPg6xTfdLe4x2fUjOGYkSiHtR8eXqUnKv00MqqSk4s4");
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartListManager);
  const cartShow = cartState.show;
  const cartList = cartState.cart;

  const user = useSelector((state) => state.userManager);
  const finalTotal=useSelector((state)=>state.finalPriceManager);

  useEffect(() => {
    if (user.show) {
      dispatch(getCartList(user._id));
    }
  },[dispatch,user.show,user._id]);


  return (
    <div className='cart-list-container'>
      <h1>Carted Items</h1>
      {cartShow ? cartList.length > 0 ?
        <div className="cart-container-heading">
          <div><h3>Name</h3></div>
          <div><h3>Varient</h3></div>
          <div><h3>Quantity</h3></div>
          <div><h3>Cost</h3></div>
          <div><h3>Total Price</h3></div>
          <div><h3>options</h3></div>
        </div> :
        console.log("no item") :
        console.log("loading")
      }
      {console.log(user)}
      {
        user.show ?
          cartShow ?
            cartList.length > 0 ?
              cartList.map((item, index) =>
                (<CartCard pizza={item} key={index} />)) :
              <h3>No item in cart</h3>:
            <h2>Loading</h2> :
          <h2>Please register / login first</h2>
      }
      {cartList.length > 0 ?
      <>
      <h6>Continue to checkout, your bill is {finalTotal} Rs</h6>
      <div className='cart-list-pay'>
      <Elements stripe={stripePromise}>
      <CheckOut subTotal={finalTotal}></CheckOut>
      </Elements>
      </div>
      </>:
      console.log()}
    </div>
  )
}

export default CartListContainer



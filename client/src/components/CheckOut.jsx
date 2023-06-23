import React, { useEffect, useState } from 'react';
import StripeCheckout from "react-stripe-checkout";
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, placeOrder } from '../redux/actions/orderAction';
import { useStripe } from '@stripe/react-stripe-js';
import { clearCart, getCartList } from '../redux/actions/cartListAction';
import { useNavigate } from 'react-router-dom';



const CheckOut = (props) => {
  const navigate=useNavigate();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userManager);
  const cart = useSelector((state) => state.cartListManager);
  const finalTotal = useSelector((state) => state.finalPriceManager);

  useEffect(()=>{
    dispatch(getOrder(user._id));
    dispatch(getCartList(user._id))
  },[])

  const tokenHandler = async (token) => {
    console.log("the token is--", token);
    let userOb = {
      id: user._id,
      name: user.name,
      email: user.email
    }
    let sentData = {
      token: token,
      user: userOb,
      cart: cart.cart,
      sumPaid: finalTotal.toFixed()
    }

    let payment = await fetch("http://localhost:5000/make-order", {
      method: "post",
      body: JSON.stringify(sentData),
      headers: {
        "content-type": "application/json"
      }
    })
    payment = await payment.json();

    let confirmCard = await stripe.confirmCardPayment(payment.client_secret, {
      payment_method: token.card.id
    })

    console.log("the payment is done", confirmCard)
    dispatch(placeOrder(token,userOb,cart.cart,finalTotal,payment.id));
    dispatch(getOrder(user._id));
    dispatch(clearCart(user._id));
    dispatch(getCartList(user._id));
    navigate("/orders");
  }

  return (
    <StripeCheckout
      amount={props.subTotal*100}
      shippingAddress
      token={tokenHandler}
      stripeKey="pk_test_51MjGv7SGd2RtTHPImrxSytqlt7KsNaDGn2w7k2aOhh2qGD67bJXKkPEVPg6xTfdLe4x2fUjOGYkSiHtR8eXqUnKv00MqqSk4s4"
      currency='INR'
    >
      <Button>Pay Now </Button>
    </StripeCheckout>
  )
}

export default CheckOut

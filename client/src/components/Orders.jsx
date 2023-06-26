import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartList } from '../redux/actions/cartListAction';
import { getOrder } from '../redux/actions/orderAction';
import OrderCard from './OrderCard';

const Orders = () => {
  const dispatch=useDispatch();
  const order=useSelector((state)=>state.orderManager);
  const user = useSelector((state) => state.userManager);


  useEffect(()=>{
    dispatch(getCartList(user._id));
    dispatch(getOrder(user._id));
  },[dispatch,user._id])

  return (
    <>
    <h3 className='order-heading'>Your Previous Orders</h3>
    <div className='order-container'>
    {
      order.orders.reverse().map((item,index)=>(<OrderCard order={item} key={index}/>))
    }
    </div>
    </>
  )
}

export default Orders

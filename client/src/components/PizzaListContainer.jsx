import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPizzaListAction } from '../redux/actions/pizzaListAction';
import { useSelector } from 'react-redux';
import { clearCart, getCartList } from '../redux/actions/cartListAction';
import Pizza from './Pizza';

const PizzaListContainer = () => {
    const dispatch=useDispatch();
    const pizzaState=useSelector((state)=>state.getAllPizzaListManager);
    const show=pizzaState.show;
    const pizzaList=pizzaState.pizzas;
    const user=useSelector((state)=>state.userManager);

    useEffect(()=>{
      dispatch(getAllPizzaListAction());
      if(user.show){
        dispatch(getCartList(user._id));
      }     
    },[])

    const clearClicker=()=>{
      if(user.show){
        dispatch(getCartList(user._id));
        dispatch(clearCart(user._id));
        dispatch(getCartList(user._id));
      }
    }


  return (
    <div>
        <div className='app-pizza-show'>
        {show?pizzaList.map((item,index)=>(<Pizza pizza={item} key={index}/>)):<h1>Loading</h1>}
        </div>
        <button onClick={clearClicker}>CLEAR CART</button>
    </div>
  )
}

export default PizzaListContainer

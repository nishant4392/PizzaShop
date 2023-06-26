import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import {addToCart, getCartList} from "../redux/actions/cartListAction";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



const Pizza = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch=useDispatch();

  const user=useSelector((state)=>state.userManager);

  const pizza=props.pizza;
  const sizes=pizza.sizes;

  useEffect(()=>{
    let varCost=sizes.find((size)=>size.name===variety).price;
    let totalCost=varCost*quantity;
    setCost(totalCost);
    setPriceOfOne(varCost);
  })

  const [variety,setVariety]=useState("Small");
  const [quantity,setQuantity]=useState(1);
  const [cost,setCost]=useState(0);
  const [priceOfOne,setPriceOfOne]=useState(0)

  const Clicker=()=>{
    console.log("the user is",user.show, user._id);
    if(user.show){
      dispatch(getCartList(user._id));
      let objectToBeAddedToCart={
        serialNum:pizza._id,
        name:pizza.name,
        varient:variety,
        quantity:quantity,
        price:priceOfOne,
        totalPrice:Number(cost.toFixed(2))
    }
    dispatch(addToCart(user._id,objectToBeAddedToCart));
    dispatch(getCartList(user._id));
    dispatch(getCartList(user._id));
    dispatch(getCartList(user._id));
    }
    else{
      alert("please login / regisrter first");
    }
}
  

  return (
    <div className='pizza'>
    <Card style={{ width: '18rem' }}>
      <Card.Img  onClick={handleShow} className='pizza-image' variant="top" src="https://tse1.mm.bing.net/th?id=OIP.Lr1GKEqWmmYqwhlBdrVMDQHaFj&pid=Api&P=0" />
      <Card.Body className='pizza-lower'>
        <Card.Title className='pizza-title'>{pizza.name}</Card.Title>
        <div className='pizza-details'>
        <div className='pizza-details-left'><div>Varient</div><select value={variety} onChange={(e)=>{setVariety(e.target.value)}}><option>Small</option><option>Medium</option><option>Large</option></select></div>
        <div className='pizza-details-right'><div>Quantities</div><select value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select></div>
        </div>
        <button className='pizza-button' onClick={Clicker}>Buy</button>
        <div className='pizza-price'>Price:{cost}</div>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className='pizza-pop-heading'>{pizza.name}</h2><img className='pizza-pop-image' src='https://tse1.mm.bing.net/th?id=OIP.Lr1GKEqWmmYqwhlBdrVMDQHaFj&pid=Api&P=0' alt='a image'></img></Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>Description</h5><p>{pizza.description}</p></Modal.Body>
      </Modal>
    </div>
  )
}

export default Pizza

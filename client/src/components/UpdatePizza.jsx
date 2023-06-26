import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAllPizzaList } from '../redux/actions/pizzaListAction';


const UpdatePizza = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const pizza=useSelector((state)=>state.pizzaToOperateOnManager);
  const [name,setName]=useState("");
  const [small,setSmall]=useState(0);
  const [medium,setMedium]=useState(0);
  const [large,setLarge]=useState(0);
  const [category,setCategory]=useState("");
  const [description,setDescription]=useState("");

  useEffect(()=>{
    if(pizza._id){
      setName(pizza.name);
      setSmall(pizza.sizes[0].price);
      setMedium(pizza.sizes[1].price);
      setLarge(pizza.sizes[2].price)
      setCategory(pizza.category);
      setDescription(pizza.description);
    }
    else{
      alert("Something bad happened, so you will be redirected to the previous page")
      navigate("/admin-panel/all-pizzas/");
    }
  },[navigate,pizza])

  const updatePizzaHandler=()=>{
    let objectToSend={
      name:name,
      small:small,
      medium:medium,
      large:large,
      category:category,
      description:description
    }
    if(name && small && medium && large && category && description){
      dispatch(updateAllPizzaList(pizza._id,objectToSend));
      navigate("/admin-panel/all-pizzas/");
    }
    else{
      alert("please fill all the fields correctly")
    }
  }

  return (
    <div className='update-pizza'>
      <h1>Update Pizza</h1>
      <div className='update-pizza-1f'>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
    </Form>
    </div>
    <div className='update-pizza-2f'>
    <div className='update-pizza-2f-content'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Small Price</Form.Label>
        <Form.Control type='number' placeholder="Enter Price" value={small} onChange={(e)=>setSmall(e.target.value)}/>
      </Form.Group>
    </Form>
    </div>
    <div className='update-pizza-2f-content'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Medium Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" value={medium} onChange={(e)=>setMedium(e.target.value)}/>
      </Form.Group>
    </Form>
    </div>
    <div className='update-pizza-2f-content'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Large Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" value={large} onChange={(e)=>setLarge(e.target.value)}/>
      </Form.Group>
    </Form>
    </div>
    </div>
    <div className='update-pizza-1f'>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
      </Form.Group>
    </Form>
    </div>
    <div className='update-pizza-1f'>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
      </Form.Group>
    </Form>
    </div>
    <Button variant="dark" onClick={updatePizzaHandler}>Update</Button>
    </div>
  )
}

export default UpdatePizza

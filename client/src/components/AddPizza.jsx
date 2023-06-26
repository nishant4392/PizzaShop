import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToAllPizzaListAction } from '../redux/actions/pizzaListAction';


const AddPizza = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [small,setSmall]=useState(0);
    const [medium,setMedium]=useState(0);
    const [large,setLarge]=useState(0);
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");

    const addPizza=()=>{

        if(name && small && medium && large && category && description){
            let objectToSend={
                name:name,
                sizes:[
                    {name:"Small", price:small},{name:"Medium", price:medium},{name:"Large", price:large}
                ],
                category:category,
                description:description
            }
            dispatch(addToAllPizzaListAction(objectToSend));
            navigate("/admin-panel/all-pizzas/")
        }
        else{
            alert("please enter all the fields correctly");
        }

    }

    return (
        <div className='update-pizza'>
            <h1>Add Pizza</h1>
            <div className='update-pizza-1f'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                </Form>
            </div>
            <div className='update-pizza-2f'>
                <div className='update-pizza-2f-content'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Small Price</Form.Label>
                            <Form.Control type='number' placeholder="Enter Price" value={small} onChange={(e) => setSmall(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                <div className='update-pizza-2f-content'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Medium Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={medium} onChange={(e) => setMedium(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                <div className='update-pizza-2f-content'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Large Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={large} onChange={(e) => setLarge(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <div className='update-pizza-1f'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>
                </Form>
            </div>
            <div className='update-pizza-1f'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                </Form>
            </div>
            <Button variant="dark" onClick={addPizza}>Add</Button>
        </div>
    )
}

export default AddPizza

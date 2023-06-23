import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/userAction';

const Register = () => {
    const dispatch=useDispatch();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [erior,setErior]=useState(false)

    const makeUser=()=>{
        if(name && email && password){
            console.log("found all");
            dispatch(addUser(name,email,password));
            setErior(false);
        }
        else{
            setErior(true);
        }

    }

    return (
        <div className='register'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><h4>Name</h4></Form.Label>
                    <Form.Control type="name" value={name} placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><h4>Email address</h4></Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><h4>Password</h4></Form.Label>
                    <Form.Control value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                </Form.Group>
                {erior?<h6>Please input all the fields correctly</h6>:console.log("no error found")}
                <Button variant="primary" onClick={makeUser}>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register

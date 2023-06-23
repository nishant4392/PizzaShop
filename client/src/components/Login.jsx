import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/userAction';



const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [erior,setErior]=useState(false);

  const logingInUser=()=>{
    if(email && password){
      dispatch(loginUser(email,password))
      setErior(false);
      navigate("/");
    }
    else{
        setErior(true);
    }
  }

  return (
    <div className='register'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><h4>Email address</h4></Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label><h4>Password</h4></Form.Label>
          <Form.Control value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
        </Form.Group>
        {erior ? <h6>Please input all the fields correctly</h6> : console.log("no error found")}
        <Button variant="primary" onClick={logingInUser}>
        Login
        </Button>
      </Form>
    </div>
  )
}

export default Login

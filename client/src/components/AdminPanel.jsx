import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';
import {Link, Route, Routes, useNavigate } from 'react-router-dom';
import AddPizza from './AddPizza';
import AllOrders from './AllOrders';
import AllPizza from './AllPizza';
import AllUsers from './AllUsers';
import UpdatePizza from './UpdatePizza';

const AdminPanel = () => {
  const navigate=useNavigate();
  const user = useSelector((state) => state.userManager);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    if(!user.isAdmin){
      navigate("/")
    }
  },[])

  return (
    <div className='admin-panel'>
      <div className='admin-menu'>
        <Button variant="primary" className='admin-menu-button' onClick={handleShow}>
          Menu
        </Button>

        <Offcanvas show={show} onHide={handleClose} className="menu-canvas">
          <Offcanvas.Body>
            <div className='admin-menu-container'>
              <Link className='menu-grid-item menu-grid-item-title'>Menu Bar</Link>
              <Link to="all-users/" className='menu-grid-item'>All Users</Link>
              <Link to="all-pizzas/" className='menu-grid-item'>Pizza Menu</Link>
              <Link to ="add-pizza/" className='menu-grid-item'>Add Pizza</Link>
              <Link to ="all-orders/" className='menu-grid-item'>All Orders</Link>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <Routes>
        {/* <Route path='/admin-panel/' element={<AllUsers />}></Route> */}
        <Route path='/' element={<AllUsers />}></Route>
        <Route path='all-users/' element={<AllUsers />}></Route>
        <Route path='all-pizzas/' element={<AllPizza/>}></Route>
        <Route path='all-pizzas/update-pizza/' element={<UpdatePizza/>}></Route>
        <Route path='add-pizza/' element={<AddPizza/>}></Route>
        <Route path='all-orders/' element={<AllOrders/>}></Route>
      </Routes>
    </div>
  )
}

export default AdminPanel

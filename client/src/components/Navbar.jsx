import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { logoutUser } from '../redux/actions/userAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cartListManager);
    const cartList = cartState.cart;

    const user = useSelector((state) => state.userManager);
    const [cartLength, setCartLength] = useState(0);

    useEffect(() => {
        setCartLength(cartList.length);
    },[setCartLength,cartList.length]);

    const loggingOutUser = () => {
        dispatch(logoutUser("some data"));
        setCartLength(0);
    }


    return (
        <div className='navbar'>
            <div className="policy-nav">
                <div className="policy-nav-left"><p>The Logo Comes Here</p></div>
                <div className="policy-nav-right">
                    {
                        !user.show ? <>
                            <Link to="/register"><p>Register</p></Link>
                            <Link to="/login"><p>Login</p></Link></> :
                            console.log("user is here already")
                    }
                    {
                        user.show ?
                            user.isAdmin ?
                                <>
                                    <Link to="/admin-panel" ><p className=''>Admin</p></Link>
                                    <Link to="/"><p className='' onClick={loggingOutUser}>Log Out</p></Link>
                                </> :
                                <>
                                    <Link to="/cart" ><p className=''>Cart-{cartLength}</p></Link>
                                    <Link to="/orders" ><p className=''>Orders</p></Link>
                                    <Link to="/"><p className='' onClick={loggingOutUser}>Log Out</p></Link>
                                </>:
                                console.log("no user")
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
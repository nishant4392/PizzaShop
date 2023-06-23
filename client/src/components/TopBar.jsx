import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocalOffer } from "react-icons/md"

const TopBar = () => {
    return (
        <div className='topbar'>
            <div className="left">
                <Link to="/" className='topbar-a'><p className='topbar-p'><MdLocalOffer className='offer-icon' />Free Delivery On Offers Above 500/-Rupees</p></Link>
            </div>
            <div className="right">
            <Link to="/" className='topbar-a'><p className='topbar-p'>Home</p></Link>
            <Link to="/about" className='topbar-a'><p className='topbar-p'>About</p></Link>
            <Link to="/contact" className='topbar-a'><p className='topbar-p'>Contact Us</p></Link>
            <Link to="/policy" className='topbar-a'><p className='topbar-p'>Terms and Policy</p></Link>
            </div>
        </div>
    )
}

export default TopBar
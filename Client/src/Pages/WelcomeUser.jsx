import React from 'react';
import { Link } from "react-router-dom";

const WelcomeUser = () => {
  return (
    <div className='welcome_container'>
        <h2>Welcome Sarvesh</h2>
        <Link to="/user/profile" id="viewprofile">View profile</Link>
    </div>
  )
}

export default WelcomeUser
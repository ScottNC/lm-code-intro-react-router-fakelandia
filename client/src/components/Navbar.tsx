import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <div className='header__card'>
      <nav className='header__card--navbar'>
        <li className='header__card--link'><Link to="/home">Home</Link></li>
        <li className='header__card--link'><Link to="/misdemeanour">Misdemeanours</Link></li>
        <li className='header__card--link'><Link to="/confession">Confess To Us</Link></li>
      </nav>
    </div>
  );
};
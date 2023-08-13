import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
      <nav className='navbar__container'>
        <menu className='menu'><li className='navbar__container--link'><Link to="/home">Home</Link></li></menu>
        <menu className='menu'><li className='navbar__container--link'><Link to="/misdemeanour">Misdemeanours</Link></li></menu>
        <menu className='menu'><li className='navbar__container--link'><Link to="/confession">Confess To Us</Link></li></menu>
      </nav>
  );
};
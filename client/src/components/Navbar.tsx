import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/misdemeanour">Misdemeanour</Link></li>
      <li><Link to="/confession">Confess To Us</Link></li>
    </nav>
  );
};
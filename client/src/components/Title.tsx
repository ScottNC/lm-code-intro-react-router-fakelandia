import React from 'react';
import { Link } from 'react-router-dom';

export const Title: React.FC = () => {
  return (
    <header className='header__card'>
      <h1 className='header__card--title'><Link to="/" className='header__card--title--link'>Fakelandia Justice Department</Link></h1>
    </header>
  );
};

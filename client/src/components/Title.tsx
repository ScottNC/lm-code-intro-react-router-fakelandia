import React from 'react';
import { Link } from 'react-router-dom';

export const Title: React.FC = () => {
  return (
    <div className='header__card'>
      <h1 className='header__card--title header__card--link'><Link to="/">Fakelandia Justice Department</Link></h1>
    </div>
  );
};

import React from 'react';
import s from './Header.module.scss';
import user from '../../../images/header/user.svg';
import hamburger from '../../../images/header/hamburger.svg';

const Header = () => {
  return (
    <header className={s.heading}>
    <button>
      <img src={user} alt='' /> 
    </button>

    <button>
      <img src={hamburger} alt='' /> 
    </button>
    </header>
  )
};

export default Header;

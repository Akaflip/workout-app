import React from 'react';
import Header from './Header/Header';
import s from './Layout.module.scss'

const Layout = ({Children}) => {
  return (
    <div>
        <Header />
        {Children}
    </div>
  )
}

export default Layout
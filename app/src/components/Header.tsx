import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { FC, memo, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/authContext';

const HeaderApp: FC = () => {
   const {logout, isAuthenticated} = useContext(AuthContext);
   const navigate = useNavigate();

   const activeLink = () => {
      return ({ isActive }) => (isActive ? 'activeNavbarLink' : '');
   };

   return (
      <Header>
         <nav>
            <NavLink className={activeLink()} to='/generate'>Generate</NavLink>
            <NavLink className={activeLink()} to='/links'>List QRCode</NavLink>
            <NavLink className={activeLink()} to='/about'>About</NavLink>
            {isAuthenticated ? (
                  <Button onClick={() => logout()}>Sign Out</Button>
               ) : (
                  <Button onClick={() => navigate('/auth')}>Sign In</Button>
               )
            }
         </nav>
      </Header>
   )
}

export default memo(HeaderApp);
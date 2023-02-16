import './navbar_user_menu.scss';

import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import React, { useReducer, useRef } from 'react';
import { FaRegMoon, FaRegSun, FaRegUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineAccountCircle } from 'react-icons/md';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { IAuthStore, useAuthStore } from '@/store/auth_store';

import Auth from '../auth/auth';

interface INavbarUserMenuState {
  navbarUserMenuOpen: boolean;
  authMenuOpen: boolean;
}

const NavbarUserMenu = () => {
  const { authToken, darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const navbarUserMenuRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useReducer(
    (state: INavbarUserMenuState, action: Partial<INavbarUserMenuState>) => ({ ...state, ...action }),
    {
      navbarUserMenuOpen: false,
      authMenuOpen: false,
    },
  );
  const toggleNavbarUserMenu = () => {
    setState({
      navbarUserMenuOpen: !state.navbarUserMenuOpen,
    });
  };
  const closeNavbarUserMenu = () => {
    setState({ navbarUserMenuOpen: false });
  };
  const authMenuHandler = () => {
    setState({ navbarUserMenuOpen: false });
    if (authToken) {
      // Logout logic
    } else {
      setState({ authMenuOpen: !state.authMenuOpen });
    }
  };
  useOnClickOutside(navbarUserMenuRef, closeNavbarUserMenu);
  return (
    <Box className={`navbar__user`} ref={navbarUserMenuRef}>
      <IconButton className={`icon-container`} size="large" color="inherit" onClick={toggleNavbarUserMenu}>
        <MdOutlineAccountCircle className={`icon`} />
      </IconButton>
      <Auth open={state.authMenuOpen} handleClose={authMenuHandler} />
      {state.navbarUserMenuOpen ? (
        <Card className={`navbar__user__menu fade-in-top`}>
          <Button className={`user__menu__header user__menu__element`}>
            <FaRegUserCircle className={`icon`} />
            <Typography>{`${authToken ? 'Hello username' : 'Welcome, Guest'}`}</Typography>
          </Button>
          <Button className={`user__menu__dark-mode user__menu__element`} onClick={toggleDarkMode}>
            {darkMode ? <FaRegMoon className={`dark-mode-sun icon`} /> : <FaRegSun className={`dark-mode-moon icon`} />}
            <Typography variant="body1">{darkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
          </Button>
          <Button className={`user__menu__auth user__menu__element`} onClick={authMenuHandler}>
            {authToken ? (
              <FaSignOutAlt className={`auth-button__icon icon`} />
            ) : (
              <FaSignInAlt className={`auth-button__icon icon`} />
            )}
            <Typography variant="body1">{authToken ? 'Sign Out' : 'Sign In/Sign Up'}</Typography>
          </Button>
        </Card>
      ) : null}
    </Box>
  );
};

export default NavbarUserMenu;

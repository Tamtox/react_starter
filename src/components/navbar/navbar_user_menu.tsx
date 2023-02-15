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
    <Box className={`navbar-user`} ref={navbarUserMenuRef}>
      <IconButton
        className={`navbar-user-icon icon-container`}
        size="large"
        color="inherit"
        onClick={toggleNavbarUserMenu}
      >
        <MdOutlineAccountCircle className={`icon`} />
      </IconButton>
      <Auth open={state.authMenuOpen} handleClose={authMenuHandler} />
      {state.navbarUserMenuOpen ? (
        <Card className={`navbar-user-menu fade-in-top`}>
          <Box className={`user-menu-header`}>
            <FaRegUserCircle className={`icon`} />
            <Typography variant="h6">{`${authToken ? 'Hello username' : 'Welcome, Guest'}`}</Typography>
          </Box>
          <Box className={`user-menu-body`}>
            <Button
              className={`user-menu-dark-mode`}
              size="large"
              startIcon={
                darkMode ? <FaRegMoon className={`dark-mode-sun`} /> : <FaRegSun className={`dark-mode-moon`} />
              }
              fullWidth
              onClick={toggleDarkMode}
            >
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </Box>
          <Button
            className={`user-menu-auth-button`}
            size="large"
            startIcon={
              authToken ? (
                <FaSignOutAlt className={`user-menu-auth-button-icon`} />
              ) : (
                <FaSignInAlt className={`user-menu-auth-button-icon`} />
              )
            }
            fullWidth
            onClick={authMenuHandler}
          >
            {authToken ? 'Sign Out' : 'Sign In/Sign Up'}
          </Button>
        </Card>
      ) : null}
    </Box>
  );
};

export default NavbarUserMenu;

import './navbar.scss';

import {
  alpha,
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  Icon,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { stat } from 'fs';
import React, { useReducer } from 'react';
import { FaHome, FaRegMoon, FaRegSun } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdNotificationsNone, MdOutlineAccountCircle, MdSearch } from 'react-icons/md';

import { IAuthStore, useAuthStore } from '@/store/auth_store';

import Auth from '../auth/auth';

interface INavbarState {
  navbarMenu: null | HTMLElement;
  navbarUserMenu: null | HTMLElement;
  authMenuOpen: boolean;
}

const Navbar = (): JSX.Element => {
  const { authToken, darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const mobile = useMediaQuery('(max-width:700px)');
  const [state, setState] = useReducer(
    (state: INavbarState, action: Partial<INavbarState>) => ({ ...state, ...action }),
    {
      navbarMenu: null,
      navbarUserMenu: null,
      authMenuOpen: false,
    },
  );
  const menusHandler = (event: React.MouseEvent<HTMLElement>, target: string) => {
    if (target === 'menu') {
      setState({ navbarMenu: event.currentTarget, navbarUserMenu: null });
    } else if (target === 'userMenu') {
      if (authToken) {
        setState({ navbarMenu: null, navbarUserMenu: event.currentTarget });
      } else {
        setState({ authMenuOpen: state.authMenuOpen ? false : true });
      }
    }
  };

  const closeMenusHandler = () => {
    setState({ navbarMenu: null, navbarUserMenu: null });
  };
  return (
    <>
      <AppBar className={`navbar`} position="fixed">
        <Toolbar className={`navbar-container`}>
          <Box className={`navbar-main`}>
            <Box className={`navbar-main-title-container`}>
              <IconButton className={`navbar-title-icon-container icon-container`} size="large" color="inherit">
                <FaHome className={`navbar-title-icon icon`} />
              </IconButton>
              <Typography className={`navbar-title`} variant="h5">
                Starter App
              </Typography>
            </Box>
            <Box className={`navbar-main-menu`}>Menu</Box>
            <Box className={`navbar-main-links`}>Links</Box>
          </Box>
          <Box className={`navbar-util`}>
            <IconButton
              className={`navbar-dark-mode icon-container`}
              size="large"
              aria-label="dark mode toggle"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDarkMode}
              color="inherit"
            >
              {darkMode ? (
                <FaRegSun className={`navbar-dark-mode-sun icon`} />
              ) : (
                <FaRegMoon className={`navbar-dark-mode-moon icon`} />
              )}
            </IconButton>
            <Box className={`navbar-user`}>
              <IconButton
                className={`navbar-user-icon icon-container`}
                size="large"
                aria-label="account of current user"
                aria-controls="navbar-user-menu"
                aria-haspopup="true"
                onClick={(e) => {
                  menusHandler(e, 'userMenu');
                }}
                color="inherit"
              >
                <MdOutlineAccountCircle className={`icon`} />
              </IconButton>
              <Menu
                className={`navbar-user-menu`}
                id="navbar-user-menu"
                sx={{ marginTop: '10px', padding: '10rem' }}
                anchorEl={state.navbarUserMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(state.navbarUserMenu)}
                onClose={closeMenusHandler}
              >
                <MenuItem onClick={closeMenusHandler}>Profile</MenuItem>
                <MenuItem onClick={closeMenusHandler}>My account</MenuItem>
              </Menu>
              <Auth
                open={state.authMenuOpen}
                handleClose={(e) => {
                  menusHandler(e, 'userMenu');
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

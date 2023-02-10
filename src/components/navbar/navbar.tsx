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
import React, { useReducer } from 'react';
import { FaHome, FaRegMoon, FaRegSun } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdNotificationsNone, MdOutlineAccountCircle, MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { authActions } from '@/store/store';

interface INavbarState {
  navbarMenu: null | HTMLElement;
  navbarUserMenu: null | HTMLElement;
}

const Navbar = (): JSX.Element => {
  const auth = useSelector<RootState, string | undefined>((state) => state.authSlice.authToken);
  const darkMode = useSelector<RootState, boolean>((state) => state.authSlice.darkMode);
  const dispatch = useDispatch();
  const mobile = useMediaQuery('(max-width:700px)');
  const [state, setState] = useReducer(
    (state: INavbarState, action: Partial<INavbarState>) => ({ ...state, ...action }),
    {
      navbarMenu: null,
      navbarUserMenu: null,
    },
  );
  const menusHandler = (event: React.MouseEvent<HTMLElement>, target: string) => {
    if (target === 'menu') {
      setState({ navbarMenu: event.currentTarget, navbarUserMenu: null });
    } else if (target === 'userMenu') {
      setState({ navbarMenu: null, navbarUserMenu: event.currentTarget });
    }
  };

  const closeMenusHandler = () => {
    setState({ navbarMenu: null, navbarUserMenu: null });
  };
  const toggleDarkModeHandler = () => {
    dispatch(authActions.toggleDarkMode());
  };
  return (
    <>
      <AppBar className={`navbar`} position="fixed">
        <Toolbar className={`navbar-container`}>
          <Box className={`navbar-main`}>
            {/* <Box className={`navbar-main-title nav-element${darkMode ? '-dark' : ''}`}>
              <FaHome className={`navbar-title-icon icon`} />
              <Typography className={`navbar-title`} variant="h6">
                Starter App
              </Typography>
            </Box>
            <Box className={`navbar-main-menu`}>
              <Button variant="outlined">Button</Button>
            </Box> */}
          </Box>
          <Box className={`navbar-util`}>
            <IconButton
              className={`navbar-dark-mode`}
              size="large"
              aria-label="dark mode toggle"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDarkModeHandler}
              color="inherit"
            >
              {darkMode ? (
                <FaRegSun className={`navbar-dark-mode-sun`} />
              ) : (
                <FaRegMoon className={`navbar-dark-mode-moon`} />
              )}
            </IconButton>
            {/* <div className={`navbar-user`}>
              <IconButton
                className={`navbar-user-icon`}
                size="large"
                aria-label="account of current user"
                aria-controls="navbar-user-menu"
                aria-haspopup="true"
                onClick={(e) => {
                  menusHandler(e, 'userMenu');
                }}
                color="inherit"
              >
                <MdOutlineAccountCircle />
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
            </div> */}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

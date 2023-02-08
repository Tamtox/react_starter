import './navbar.scss';

import { alpha, AppBar, Badge, Box, Button, IconButton, InputBase, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { styled, Toolbar, Typography } from '@mui/material';
import React, { useReducer } from 'react';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdNotificationsNone, MdOutlineAccountCircle, MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { authActions } from '@/store/store';

const Navbar = (): JSX.Element => {
  const auth = useSelector<RootState, string | undefined>((state) => state.authSlice.authToken);
  const darkMode = useSelector<RootState, boolean>((state) => state.authSlice.darkMode);
  const dispatch = useDispatch();
  const mobile = useMediaQuery('(max-width:700px)');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const userMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    auth ? setAnchorEl(event.currentTarget) : null;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDarkModeHandler = () => {
    dispatch(authActions.toggleDarkMode());
  };
  return (
    <AppBar className={`navbar`} position="static">
      <Toolbar className={`navbar-container`}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <HiOutlineMenu />
        </IconButton>
        <Typography className={`navbar-title`} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Starter App
        </Typography>
        <Box className={`navbar-controls`}>
          <IconButton
            className={`navbar-contols-dark-mode`}
            size="large"
            aria-label="dark mode toggle"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleDarkModeHandler}
            color="inherit"
          >
            {darkMode ? (
              <FaRegSun className={`navbar-contols-dark-mode-sun`} />
            ) : (
              <FaRegMoon className={`navbar-contols-dark-mode-moon`} />
            )}
          </IconButton>
          <div className={`navbar-contols-user`}>
            <IconButton
              className={`navbar-contols-user-icon`}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="false"
              onClick={userMenuHandler}
              color="inherit"
            >
              <MdOutlineAccountCircle />
            </IconButton>
            <Menu
              className={`navbar-contols-user-menu`}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

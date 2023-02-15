import './navbar_menu.scss';

import { Box, Button, Card, IconButton, useMediaQuery } from '@mui/material';
import React, { useEffect, useReducer, useRef } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import useOnClickOutside from '@/hooks/useOnClickOutside';

interface INavbarMenuState {
  navbarMenuOpen: boolean;
}

const NavbarMenu = () => {
  const mobile = useMediaQuery('(max-width:700px)');
  const navbarMenuRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useReducer(
    (state: INavbarMenuState, action: Partial<INavbarMenuState>) => ({ ...state, ...action }),
    {
      navbarMenuOpen: false,
    },
  );
  // Navbar menu controls
  const toggleNavbarMenu = () => {
    setState({ navbarMenuOpen: !state.navbarMenuOpen });
  };
  const closeNavbarMenu = () => {
    setState({ navbarMenuOpen: false });
  };
  useOnClickOutside(navbarMenuRef, closeNavbarMenu);
  return (
    <Box className={`navbar-main-menu`} ref={navbarMenuRef}>
      {mobile ? (
        <IconButton
          className={`navbar-main-menu-icon-container icon-container`}
          size="large"
          color="inherit"
          onClick={toggleNavbarMenu}
        >
          <HiOutlineMenu className={`navbar-main-menu-icon icon`} />
        </IconButton>
      ) : (
        <Button
          className={`navbar-main-menu-button`}
          sx={{ fontSize: '1.1rem' }}
          color="secondary"
          size="large"
          startIcon={<HiOutlineMenu className={`navbar-main-menu-button-icon icon`} />}
          onClick={toggleNavbarMenu}
        >
          Menu
        </Button>
      )}
      {state.navbarMenuOpen ? <Card className={`navbar-menu fade-in-top`}></Card> : null}
    </Box>
  );
};

export default NavbarMenu;

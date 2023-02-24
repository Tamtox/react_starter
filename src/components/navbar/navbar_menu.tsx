import './navbar_menu.scss';

import { Box, Button, Card, IconButton, useMediaQuery } from '@mui/material';
import React, { useReducer, useRef } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useAuthStore } from '@/store/auth_store';

interface INavbarMenuState {
  navbarMenuOpen: boolean;
}

const NavbarMenu = () => {
  const mobile = useMediaQuery('(max-width:700px)');
  const navbarMenuRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useAuthStore((state) => state);
  const [state, setState] = useReducer(
    (state: INavbarMenuState, action: Partial<INavbarMenuState>) => ({ ...state, ...action }),
    {
      navbarMenuOpen: false,
    },
  );
  const toggleNavbarMenu = () => {
    setState({ navbarMenuOpen: !state.navbarMenuOpen });
  };
  const closeNavbarMenu = () => {
    setState({ navbarMenuOpen: false });
  };
  useOnClickOutside(navbarMenuRef, closeNavbarMenu);
  return (
    <Box className={`navbar__menu`} ref={navbarMenuRef}>
      {mobile ? (
        <IconButton className={`icon-container`} size="large" color="inherit" onClick={toggleNavbarMenu}>
          <HiOutlineMenu className={`icon`} />
        </IconButton>
      ) : (
        <Button
          sx={{ fontSize: '1.2rem', color: 'white' }}
          size="large"
          startIcon={<HiOutlineMenu className={`icon`} />}
          onClick={toggleNavbarMenu}
        >
          Menu
        </Button>
      )}
      {state.navbarMenuOpen ? (
        mobile ? (
          <Card className={`navbar__menu__panel__mobile slide-in-left`}>
            <Button
              sx={{ fontSize: '1.2rem' }}
              variant="outlined"
              startIcon={<HiOutlineMenu className={`icon`} />}
              onClick={closeNavbarMenu}
            >
              Menu
            </Button>
          </Card>
        ) : (
          <Card className={`navbar__menu__panel fade-in-top`}>
            <Box className={`navbar__menu__container`}>
              <Button variant="contained">123</Button>
            </Box>
          </Card>
        )
      ) : null}
    </Box>
  );
};

export default NavbarMenu;

import './navbar.scss';

import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React, { useReducer } from 'react';
import { FaHome } from 'react-icons/fa';

import NavbarMenu from '@/components/navbar/navbar_menu';
import NavbarUserMenu from '@/components/navbar/navbar_user_menu';
import { IAuthStore, useAuthStore } from '@/store/auth_store';

interface INavbarState {
  blank: string;
}

const Navbar = (): JSX.Element => {
  const { authToken, darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const mobile = useMediaQuery('(max-width:700px)');
  const [state, setState] = useReducer(
    (state: INavbarState, action: Partial<INavbarState>) => ({ ...state, ...action }),
    { blank: '' },
  );
  return (
    <>
      <AppBar className={`navbar`} position="fixed">
        <Toolbar className={`navbar-container`}>
          <Box className={`navbar-main`}>
            <Box className={`navbar-main-title-container`}>
              <IconButton className={`navbar-title-icon-container icon-container`} size="large" color="inherit">
                <FaHome className={`navbar-title-icon icon`} />
              </IconButton>
              {mobile ? null : (
                <Typography className={`navbar-title`} variant="h5">
                  App Name
                </Typography>
              )}
            </Box>
            <NavbarMenu />
            {mobile ? null : <Box className={`navbar-main-links`}>Links</Box>}
          </Box>
          <Box className={`navbar-util`}>
            <NavbarUserMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React, { useReducer } from 'react';
import { FaHome } from 'react-icons/fa';

import NavbarMenu from '@/components/UI/navbar/navbar_menu';
import NavbarUserMenu from '@/components/UI/navbar/navbar_user_menu';
import { IAuthStore, useAuthStore } from '@/store/auth_store';

import styles from './navbar.module.scss';

interface INavbarState {
  blank: string;
}

const Navbar = (): JSX.Element => {
  const { authToken, darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const mobile = useMediaQuery('(max-width:700px)');
  const [state, setState] = useReducer(
    (state: INavbarState, action: Partial<INavbarState>) => ({ ...state, ...action }),
    { blank: '' }
  );
  return (
    <>
      <AppBar className={`${styles.navbar}`} position="fixed">
        <Toolbar className={`${styles.navbar__container}`}>
          <Box className={`${styles.navbar__main}`}>
            <Box className={`${styles.navbar__title}`}>
              <IconButton className={`icon-container`} size="large" color="inherit">
                <FaHome className={`icon`} />
              </IconButton>
              {mobile ? null : <Typography variant="h5">App Name</Typography>}
            </Box>
            <NavbarMenu />
            {mobile ? null : <Box className={`${styles.navbar__main__links}`}>Links</Box>}
          </Box>
          <Box className={`${styles.navbar__util}`}>
            <NavbarUserMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

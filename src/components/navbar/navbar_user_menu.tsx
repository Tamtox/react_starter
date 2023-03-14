import './navbar_user_menu.scss';

import React, { useReducer, useRef } from 'react';
import { FaRegMoon, FaRegSun, FaRegUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineAccountCircle } from 'react-icons/md';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { IAuthStore, useAuthStore } from '@/store/auth_store';

import Auth from '@/features/auth/auth';

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
    <div className={`navbar__user`} ref={navbarUserMenuRef}>
      <div className={`icon-container`} color="inherit" onClick={toggleNavbarUserMenu}>
        <MdOutlineAccountCircle className={`icon`} />
      </div>
      <Auth open={state.authMenuOpen} handleClose={authMenuHandler} />
      {state.navbarUserMenuOpen ? (
        <div className={`navbar__user__menu fade-in-top`}>
          <button className={`user__menu__header user__menu__element`}>
            <FaRegUserCircle className={`icon`} />
            <p>{`${authToken ? 'Hello username' : 'Welcome, Guest'}`}</p>
          </button>
          <button className={`user__menu__dark-mode user__menu__element`} onClick={toggleDarkMode}>
            {darkMode ? <FaRegMoon className={`dark-mode-sun icon`} /> : <FaRegSun className={`dark-mode-moon icon`} />}
            <p>{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
          </button>
          <button className={`user__menu__auth user__menu__element`} onClick={authMenuHandler}>
            {authToken ? (
              <FaSignOutAlt className={`auth-button__icon icon`} />
            ) : (
              <FaSignInAlt className={`auth-button__icon icon`} />
            )}
            <p>{authToken ? 'Sign Out' : 'Sign In/Sign Up'}</p>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarUserMenu;

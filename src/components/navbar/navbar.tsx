import './navbar.scss';

import React, { useReducer } from 'react';
import { FaHome } from 'react-icons/fa';

import NavbarMenu from '@/components/navbar/navbar_menu';
import NavbarUserMenu from '@/components/navbar/navbar_user_menu';
import { IAuthStore, useAuthStore } from '@/store/auth_store';
import useWindowSize from '@/hooks/useWindowSize';

interface INavbarState {
  blank: string;
}

const Navbar = (): JSX.Element => {
  const { authToken, darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const { width, height } = useWindowSize();
  const [state, setState] = useReducer(
    (state: INavbarState, action: Partial<INavbarState>) => ({ ...state, ...action }),
    { blank: '' },
  );
  console.log(width, height);
  return (
    <>
      <nav className={`navbar`}>
        <div className={`navbar__container`}>
          <div className={`navbar__main`}>
            <div className={`navbar__title`}>
              <div className={`icon-container`}>
                <FaHome className={`icon`} />
              </div>
              {/* {mobile ? null : <Typography variant="h5">App Name</Typography>} */}
            </div>
            <NavbarMenu />
            {/* {mobile ? null : <div className={`navbar-main-links`}>Links</div>} */}
          </div>
          <div className={`navbar__util`}>
            <NavbarUserMenu />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

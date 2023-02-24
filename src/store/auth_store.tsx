import Cookies from 'js-cookie';
import { MdSignalWifiStatusbarNull } from 'react-icons/md';
import { create } from 'zustand';

const authToken = Cookies.get('authToken');
const darkMode = Cookies.get('darkMode');

export interface IUserData {
  email: string;
}

export interface IAuthStore {
  authToken: string | undefined;
  darkMode: boolean;
  userData: IUserData | null;
  toggleDarkMode: () => void;
  login: (newAuthToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  authToken: undefined,
  darkMode: darkMode === 'true' ? true : false,
  userData: null,
  toggleDarkMode: () =>
    set((state: IAuthStore) => {
      Cookies.set('darkMode', `${!state.darkMode}`, {
        sameSite: 'Strict',
        secure: true,
        path: '/',
      });
      return {
        darkMode: !state.darkMode,
      };
    }),
  login: (newAuthToken: string) =>
    set((state: IAuthStore) => {
      Cookies.set('authToken', `${newAuthToken}`, {
        sameSite: 'Strict',
        secure: true,
        path: '/',
      });
      return { authToken: newAuthToken };
    }),
  logout: () =>
    set((state: IAuthStore) => {
      Cookies.set('authToken', '', {
        sameSite: 'Strict',
        secure: true,
        path: '/',
      });
      return { authToken: undefined };
    }),
}));

import Cookies from 'js-cookie';
import { create } from 'zustand';

const authToken = Cookies.get('authToken');
const darkMode = Cookies.get('darkMode');

export interface IAuthStore {
  darkMode: boolean;
  authToken: string | undefined;
  toggleDarkMode: () => void;
  login: (newAuthToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  darkMode: darkMode === 'true' ? true : false,
  authToken: undefined,
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

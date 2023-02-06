import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface IAuthState {
  darkMode: boolean;
  authToken: string | undefined;
}

const authToken = Cookies.get('authToken');
const darkMode = Cookies.get('darkMode');

const authState: IAuthState = {
  darkMode: darkMode === 'true' ? true : false,
  authToken: '123',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      Cookies.set('darkMode', `${state.darkMode}`, {
        sameSite: 'Strict',
        secure: true,
        path: '/',
      });
    },
    login: (state, action) => {
      state.authToken = action.payload.token;
      Cookies.set('authToken', `${action.payload.token}`, {
        sameSite: 'Strict',
        secure: true,
        path: '/',
      });
    },
    logout: (state) => {
      state.authToken = undefined;
      Cookies.set('authToken', '', {
        sameSite: 'Strict',
        secure: true,
        path: '/',
      });
    },
  },
});

export default authSlice;

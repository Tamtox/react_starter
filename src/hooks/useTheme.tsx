import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

import { IAuthStore, useAuthStore } from '@/store/auth_store';

const useTheme = () => {
  const { darkMode } = useAuthStore((state: IAuthStore) => state);
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          // MuiTypography: {
          //   styleOverrides: {
          //     root: {
          //     },
          //   },
          // },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: `0px 1px 3px ${'#000000'}`,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#000000' : '#FAF9F6',
            paper: darkMode ? '#100F0F' : '#ffffff',
          },
          // text: {
          //   primary: darkMode ? '#ffffff' : '#000000',
          //   secondary: darkMode ? '#ffffff' : '#000000',
          //   disabled: darkMode ? '#ffffff' : '#000000',
          //   // hint: darkMode ? '#ffffff' : '#000000',
          // },
          primary: {
            main: darkMode ? '#B1B2FF' : '#51499f',
            light: '#EBC7E8',
            dark: '#1C3879',
            contrastText: '#fff',
          },
          secondary: {
            main: '#ffffff',
            light: '#ba68c8',
            dark: '#7b1fa2',
            contrastText: '#fff',
          },
          // error: {},
          // warning: {},
          // info: {},
          // success: {},
          // divider: 'yellow',
        },
      }),
    [darkMode]
  );
  return theme;
};

export default useTheme;

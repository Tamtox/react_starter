import '@/app.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// eslint-disable-next-line prettier/prettier
import { Box, Container, createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import React, { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { RootState } from '@/store/store';

const Title = React.lazy(() => import('./pages/title'));
const Loading = React.lazy(() => import('./pages/loading'));
import Navbar from '@/components/navbar/navbar';

function App() {
  const darkMode = useSelector<RootState, boolean>((state) => state.authSlice.darkMode);
  const auth = useSelector<RootState, string | undefined>((state) => state.authSlice.authToken);
  const myTheme = useMemo(
    () =>
      createTheme({
        components: {
          MuiContainer: {
            styleOverrides: {
              root: {
                padding: '0 5px 0 5px',
              },
            },
          },
          // MuiTypography: {
          //   styleOverrides: {
          //     root: {
          //     },
          //   },
          // },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: '0px 1px 3px black',
                padding: '1rem',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                fontSize: '1rem',
                width: 'calc(min(100%, 100%))',
                height: '36px',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                fontSize: '1rem',
                textTransform: 'none',
              },
            },
          },
        },
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#191919' : '#f4f5f5',
            paper: darkMode ? '#191919' : '#f4f5f5',
          },
          text: {
            primary: darkMode ? '#ffffff' : '#000000',
            secondary: darkMode ? '#ffffff' : '#000000',
            disabled: darkMode ? '#ffffff' : '#000000',
            // hint: darkMode ? '#ffffff' : '#000000',
          },
          primary: {
            main: '#256D85',
            light: '#FFC4C4',
            dark: '#47B5FF',
            contrastText: '#fff',
          },
          secondary: {
            main: '#9c27b0',
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
    [darkMode],
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Navbar />
        <Container component="main" className="app">
          <div className="wrapper">
            <Suspense fallback={<Loading height="100vh" />}>
              <Routes>
                <Route path="/" element={<Title />} />
                {/* <Route path='/auth' element={isLoggedIn ? (verificationStatus === "Complete" ? <Home/> : <Profile/>) : <Auth/>} /> */}
                <Route path="*" element={<Title />} />
              </Routes>
            </Suspense>
          </div>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

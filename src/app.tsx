// Dependencies
import React,{ Suspense, useMemo } from 'react';
import { Routes,Route } from 'react-router-dom';
import { CssBaseline,ThemeProvider,StyledEngineProvider,createTheme,Box,Container } from '@mui/material';
import { useSelector } from 'react-redux';
// Styles
import '@/app.scss';
// Components
import { RootState } from '@/store/store';

const Title = React.lazy(()=> import('./pages/title'));
const Loading = React.lazy(()=> import('./pages/loading'));

function App() {
  const darkMode = useSelector<RootState,boolean>(state => state.authSlice.darkMode);
  const myTheme = useMemo(() =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' :'light'
        },
      }),
    [darkMode],
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Container component="main" className="app">
          <div className='wrapper'> 
            <Suspense fallback={<Loading height='100vh'/>}>
                <Routes>
                  <Route path='/' element={<Title/>} />
                  {/* <Route path='/auth' element={isLoggedIn ? (verificationStatus === "Complete" ? <Home/> : <Profile/>) : <Auth/>} /> */}
                  <Route path='*' element={<Title/>} />
                </Routes>
            </Suspense>
          </div>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App

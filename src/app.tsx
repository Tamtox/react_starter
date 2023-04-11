import '@/styles/app.scss';
import '@/styles/animation.scss';
import '@/styles/global_classes.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box, Container, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/home/home'));
const Loading = React.lazy(() => import('@/components/loading/Spinner'));
import Navbar from '@/components/UI/navbar/navbar';

import useTheme from './hooks/useTheme';

function App() {
  const theme = useTheme();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth={false} component="main" className="app">
          <Box className="wrapper">
            <Suspense fallback={<Loading height="100vh" />}>
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path='/auth' element={isLoggedIn ? (verificationStatus === "Complete" ? <Home/> : <Profile/>) : <Auth/>} /> */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

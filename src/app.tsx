import '@/styles/app.scss';
import '@/styles/animation.scss';
import '@/styles/global_classes.scss';
import React, { Suspense, useMemo, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { IAuthStore, useAuthStore } from '@/store/auth_store';

const Home = React.lazy(() => import('@/features/home/home'));
const Loading = React.lazy(() => import('@/components/loading/Spinner'));
import Navbar from '@/components/navbar/navbar';

function App() {
  const { authToken, darkMode } = useAuthStore((state: IAuthStore) => state);
  const theme = useMemo(
    () => ({
      bg: darkMode ? '#000000' : '#FAF9F6',
      bgSurface: darkMode ? '' : '',
      colorTextPrimary: darkMode ? '' : '',
      colorTextSecondary: darkMode ? '' : '',
      colorPrimary: darkMode ? '' : '',
      colorSecondary: darkMode ? '' : '',
      colorInfo: darkMode ? '' : '',
      colorDanger: darkMode ? '' : '',
    }),
    [darkMode],
  );
  // const myTheme = useMemo(() => {}, [darkMode]);
  return (
    <main className="app" style={{ background: theme.bg }}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<Loading height="100vh" />}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path='/auth' element={isLoggedIn ? (verificationStatus === "Complete" ? <Home/> : <Profile/>) : <Auth/>} /> */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}

export default App;

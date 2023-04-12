import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// routes
import { routes } from './routes';
// theme
import ThemeProvider from './theme';
// redux
import { getUserProfile } from './redux/profile/profileSlice';
import { logOutUser, selectAuthData } from './redux/auth/authSlice';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { isTokenExpired } from './utils/checkTokenValidity';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectAuthData);

  useEffect(() => {
    if (!isTokenExpired(isLoggedIn)) {
      dispatch(getUserProfile());
    } else {
      dispatch(logOutUser());
    }
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={routes}>
          <ScrollToTop />
          <StyledChart />
        </RouterProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

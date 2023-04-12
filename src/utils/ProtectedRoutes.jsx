import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../redux/auth/authSlice';

export const OnlyAuthenticatedUser = () => {
  const location = useLocation();

  const isLoggedIn = useSelector(selectAuthData);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export const NotAuthenticatedUser = () => {
  const isLoggedIn = useSelector(selectAuthData);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

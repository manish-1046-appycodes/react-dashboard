import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { loginUser, selectAuthStatus, selectAuthError, clearAuthError } from '../../../redux/auth/authSlice';
import { getUserProfile } from '../../../redux/profile/profileSlice';
// components
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const loginStatus = useSelector(selectAuthStatus);
  const loginError = useSelector(selectAuthError);

  const routeData = useLocation();

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    username: Yup.string().min(6).required('Username is required'),
    password: Yup.string().min(6).required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const data = await dispatch(loginUser(values));
      if (data.type === 'auth/login/fulfilled') {
        await dispatch(getUserProfile());
      }
    },
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, []);

  return (
    <>
      {loginStatus === 'login-error' && (
        <Alert sx={{ marginBottom: '30px' }} severity="error">
          <AlertTitle>Login Error</AlertTitle>
          <strong>{loginError}</strong>
        </Alert>
      )}
      {routeData.state === 'passedFromRegisterPageAfterSuccessfullRegistration' && (
        <Alert sx={{ marginBottom: '30px' }} severity="success">
          <AlertTitle>Registration Success</AlertTitle>
          <strong>Please login to continue</strong>
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={!!formik.errors.username}
            helperText={formik.errors.username}
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />

          <TextField
            error={!!formik.errors.password}
            helperText={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
          <Link to="/dashboard">Forgot password?</Link>
        </Stack>

        <LoadingButton loading={loginStatus === 'logging'} fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}

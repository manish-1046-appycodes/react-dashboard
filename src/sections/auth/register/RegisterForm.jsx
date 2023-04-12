import { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { clearAuthError, registerUser, selectAuthError, selectAuthStatus } from '../../../redux/auth/authSlice';
// components
import ReactIcon from '../../../components/react-icons';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrationStatus = useSelector(selectAuthStatus);
  const registrationError = useSelector(selectAuthError);

  const schema = Yup.object().shape({
    email: Yup.string().email('Enter valid email').required('Email is required'),
    username: Yup.string().min(6).required('Username is required'),
    password: Yup.string().min(6).required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(clearAuthError());

      const response = await dispatch(registerUser(values));
      // toast.dismiss(loadingRef.current);

      if (response.type === 'auth/register/fulfilled') {
        // toast.success("Account Created");
        return navigate('/login', { state: 'passedFromRegisterPageAfterSuccessfullRegistration' });
      }

      return false;
    },
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, []);

  return (
    <>
      {registrationStatus === 'registration-error' && (
        <Alert sx={{ marginBottom: '30px' }} severity="error">
          <AlertTitle>Registration Error</AlertTitle>
          <strong>{registrationError}</strong>
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={!!formik.errors.email}
            helperText={formik.errors.email}
            required
            name="email"
            label="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <TextField
            error={!!formik.errors.username}
            helperText={formik.errors.username}
            type="text"
            required
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />

          <TextField
            error={!!formik.errors.password}
            helperText={formik.errors.password}
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <ReactIcon icon={showPassword ? AiFillEye : AiFillEyeInvisible} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          loading={registrationStatus === 'registering'}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ my: 2 }}
        >
          Register
        </LoadingButton>
      </form>
    </>
  );
}

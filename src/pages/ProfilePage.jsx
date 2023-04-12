import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// @mui
import { Stack, TextField, Alert, AlertTitle, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// redux
import {
  selectUserProfileData,
  selectUserProfileError,
  selectUserProfileStatus,
  updateUserProfile,
} from '../redux/profile/profileSlice';
// components

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  // margin: 'auto',
  // minHeight: '70vh',
  display: 'flex',
  // justifyContent: 'center',
  flexDirection: 'column',
  // padding: theme.spacing(12, 0),
}));

const Profile = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector(selectUserProfileData);
  const userProfileError = useSelector(selectUserProfileError);
  const userProfileStatus = useSelector(selectUserProfileStatus);

  const schema = Yup.object().shape({
    first_name: Yup.string().min(2).required('First Name is required'),
    last_name: Yup.string().min(2).required('Last Name is required'),
    username: Yup.string().min(2).required('Username is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: userProfile?.first_name || '',
      last_name: userProfile?.last_name || '',
      email: userProfile?.email || '',
      username: userProfile?.username || '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await dispatch(updateUserProfile(values));
    },
  });

  return (
    <>
      <Helmet>
        <title>Profile | ProspectPug </title>
      </Helmet>

      <Container maxWidth="xl">
        <StyledContent>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Profile
          </Typography>

          {userProfileStatus === 'error-updating-user-profile' && (
            <Alert sx={{ marginBottom: '30px' }} severity="error">
              <AlertTitle>Update Profile Error</AlertTitle>
              <strong>{userProfileError}</strong>
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <Stack sx={{ marginBottom: '24px' }} spacing={3}>
              <TextField
                error={!!formik.errors.first_name}
                helperText={formik.errors.first_name}
                name="first_name"
                label="First Name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
              />
              <TextField
                error={!!formik.errors.last_name}
                helperText={formik.errors.last_name}
                name="last_name"
                label="Last Name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
              />
              <TextField
                error={!!formik.errors.username}
                helperText={formik.errors.username}
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                disabled
              />
              <TextField
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                disabled
              />
            </Stack>

            <LoadingButton
              loading={userProfileStatus === 'updating-user-profile' || userProfileStatus === 'fetching-user-profile'}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Update Profile
            </LoadingButton>
          </form>
        </StyledContent>
      </Container>
    </>
  );
};

export default Profile;

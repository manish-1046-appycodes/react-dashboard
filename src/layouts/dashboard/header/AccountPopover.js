import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// redux
import { logOutUser } from '../../../redux/auth/authSlice';
import { selectUserProfileData } from '../../../redux/profile/profileSlice';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    path: '/dashboard',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    path: '/dashboard/profile',
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  //   path: "/dashboard"
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfileData = useSelector(selectUserProfileData);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleAccountButtonClick = (path) => {
    handleClose();
    navigate(path);
  };

  const logOutUserHandler = async () => {
    await dispatch(logOutUser());
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src={userProfileData?.photoURL}
          alt={
            userProfileData?.first_name
              ? `${userProfileData?.first_name} ${userProfileData?.last_name}'s image`
              : `${userProfileData?.username}'s image`
          }
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userProfileData?.first_name
              ? `${userProfileData?.first_name} ${userProfileData?.last_name}`
              : userProfileData?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userProfileData?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleAccountButtonClick(option.path)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logOutUserHandler} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

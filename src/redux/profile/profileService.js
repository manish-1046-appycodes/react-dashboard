import { privateRequest } from '../../utils/apiRequest';

const getUserProfile = async () => {
  const response = await privateRequest.get(`/api/users/me`);
  return response;
};

const updateUserProfile = async (userProfileData) => {
  const response = await privateRequest.post(`/api/users/update`, userProfileData);
  return response;
};

export default { getUserProfile, updateUserProfile };

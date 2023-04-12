import { privateRequest } from '../../utils/apiRequest';

const getUserHistory = async () => {
  const response = await privateRequest.get(`/api/quota/get-user-requests`);
  return response;
};

export default { getUserHistory };

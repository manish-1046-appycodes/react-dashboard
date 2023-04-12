import { privateRequest } from '../../utils/apiRequest';

const searchLeads = async (queries) => {
  const { searchTerm, searchCount, region } = queries;
  const response = await privateRequest.get(`/api/quota/getleads/${searchTerm}/${searchCount}/${region}`);
  return response;
};

export default { searchLeads };

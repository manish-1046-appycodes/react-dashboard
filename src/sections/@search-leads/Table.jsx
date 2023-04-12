import { useSelector } from 'react-redux';
// material
import { Stack } from '@mui/material';
// redux
import { selectSearchLeadData } from '../../redux/search/searchSlice';
// components
import SearchLead from '../../components/search-lead/SearchLead';

const SearchTable = () => {
  const searchLeads = useSelector(selectSearchLeadData);

  return (
    <Stack gap={5}>
      {searchLeads.map((searchLead) => (
        <SearchLead
          key={searchLead?.request_id}
          requestId={searchLead?.request_id}
          searchTerm={searchLead?.searchTerm}
        />
      ))}
    </Stack>
  );
};

export default SearchTable;

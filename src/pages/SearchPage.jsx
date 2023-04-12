import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Container, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { searchLeads, selectSearchLeadStatus } from '../redux/search/searchSlice';
// components
import SearchTable from '../sections/@search-leads/Table';
import CountryDropdown from '../components/country-dropdown/CountryDropdown';

const SearchPage = () => {
  const isMdOrSmaller = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [searchRegion, setSearchRegion] = useState('US');

  const dispatch = useDispatch();

  const isSearchingPlaces = useSelector(selectSearchLeadStatus);

  const formik = useFormik({
    initialValues: {
      searchTerm: '',
      searchCount: 2,
    },
    onSubmit: async (values) => {
      const data = {
        ...values,
        region: searchRegion,
      };
      const searchRes = await dispatch(searchLeads(data));
      console.log(searchRes);
    },
  });

  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setSearchRegion(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>SearchPage | ProspectPug </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          SearchPage
        </Typography>

        <CountryDropdown handleCountryChange={handleCountryChange} selectedRegion={searchRegion} />

        <form onSubmit={formik.handleSubmit} style={{ marginBottom: '50px' }}>
          <Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 2 }}>
              <TextField
                value={formik.values.searchTerm}
                onChange={formik.handleChange}
                name="searchTerm"
                type="text"
                fullWidth
                size="large"
                label="Search"
                sx={{ flexGrow: 1, flexBasis: '60%' }}
              />

              <Stack direction={{ sm: 'row' }} spacing={{ xs: 1, sm: 2 }} sx={{ flexGrow: 1 }}>
                <TextField
                  value={formik.values.searchCount}
                  onChange={formik.handleChange}
                  type="number"
                  name="searchCount"
                  fullWidth={isMdOrSmaller}
                  label="Places to fetch"
                  sx={{ flexBasis: isMdOrSmaller ? '100%' : 'auto' }}
                  size="large"
                />

                <LoadingButton
                  loading={isSearchingPlaces === 'searching'}
                  // fullWidth
                  // size={isSmaller ? 'large' : ''}
                  color="primary"
                  sx={{ whiteSpace: 'nowrap' }}
                  // sx={{ whiteSpace: 'nowrap', paddingLeft: '30px', paddingRight: '30px' }}
                  type="submit"
                  variant="contained"
                >
                  Search Leads
                </LoadingButton>

                {/* <IconButton
                  disabled={isSearchingPlaces === 'searching'}
                  size={isSmaller ? 'large' : ''}
                  color="primary"
                  variant="contained"
                  endIcon={<IoMdSend />}
                  sx={{ whiteSpace: 'nowrap', paddingLeft: '30px', paddingRight: '30px' }}
                  type="submit"
                >
                  Search Leads
                </IconButton> */}
              </Stack>
            </Stack>
          </Stack>
        </form>

        <SearchTable />
      </Container>
    </>
  );
};

export default SearchPage;

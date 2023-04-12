import { useEffect, useState } from 'react';
// mui
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function CountryDropdown({ handleCountryChange, selectedRegion }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      const res = await fetch('https://serpdata.coming-soon.xyz/api/countries/');
      const response = await res.json();

      if (response) {
        setCountries(response);
      }
    };
    fetchAllCountries();
  }, []);

  return (
    <div>
      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="select-country">Country</InputLabel>
        <Select
          labelId="select-country"
          id="demo-simple-select-error"
          value={selectedRegion}
          label="Country"
          onChange={handleCountryChange}
          renderValue={(countryCode) => {
            const selectedCountry = countries.find((country) => country?.code === countryCode);
            return <span>{selectedCountry?.name}</span>;
          }}
        >
          {countries?.length <= 0 ? (
            <MenuItem key={'US'} value={selectedRegion}>
              {'United States'}
            </MenuItem>
          ) : (
            countries.map((country) => (
              <MenuItem key={country?.code} value={country?.code}>
                {country?.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}

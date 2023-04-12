import { useEffect, useState } from 'react';
// mui
import { InputLabel, MenuItem, FormControl, Select, Stack } from '@mui/material';
// components
// import { countries } from '../../utils/countries';

export default function CountryDropdown({ handleCountryChange, selectedRegion }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      const res = await fetch('https://serpdata.coming-soon.xyz/api/countries/');
      const response = await res.json();

      if (response) {
        setCountries(response);
      }

      console.log(response);
      // let allData = [];

      //   countries.forEach((country) => {
      //     allData += `{"code1":"${country?.alpha2Code}","code2":"${country?.alpha3Code}","name":"${country?.name}","flag":"${country?.flag}"},`;
      //   });

      // const rawData = await fetch(countriesJSON, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json',
      //   },
      // });
      // const countries = await rawData.json();
      // console.log(countries);
    };
    fetchAllCountries();
  }, []);

  useEffect(() => {
    console.log('countries state', countries);
  }, [countries]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
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
          {countries.map((country) => (
            <MenuItem key={country?.code} value={country?.code}>
              {/* <img width={20} height={20} src={country?.flag} alt={`${country?.name}'s flag`} /> &nbsp; */}
              {country?.name}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>Error</FormHelperText> */}
      </FormControl>
    </div>
  );
}

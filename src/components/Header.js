import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, ListItemIcon } from "@material-ui/core";
import "../css/Header.css";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  const [{}, dispatch] = useStateValue();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: `left-${country.countryInfo._id}`,
            flagUrl: country.countryInfo.flag
          }));
          setCountries(countries);
          dispatch({
            type: "GET_COUNTRY_LIST",
            payload: { data: data }
          });
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async event => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    dispatch({
      type: "SET_COUNTRY",
      payload: { country: countryCode }
    });
  };

  return (
    <div className="app_header">
      <h1>COVID - 19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem key="left-worldWide" value="worldwide">
            <ListItemIcon className="app_list_item_icon">
              <span
                className="app_dropdown_bgImg"
                style={{
                  backgroundImage: `url(
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGX5s8pTPV7kdLDG4nSCdExAqSiRz096P0AQ&usqp=CAU"
                  )`
                }}
              ></span>
            </ListItemIcon>
            <span className="app_dropdown_text">Worldwide</span>
          </MenuItem>
          {countries.map(country => (
            <MenuItem key={country.id} value={country.value}>
              <ListItemIcon className="app_list_item_icon">
                <span
                  className="app_dropdown_bgImg"
                  style={{ backgroundImage: `url(${country.flagUrl})` }}
                ></span>
              </ListItemIcon>
              <span className="app_dropdown_text">{country.name}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;

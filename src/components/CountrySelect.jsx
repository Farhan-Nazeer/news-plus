import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";

const CountrySelect = (props) => {
  const [country, setCountry] = useState("ca");

  const handleChange = (e) => {
    const { value } = e.target;
    setCountry(value);
    props.onSetRequestParams((prevValue) => {
      return {
        ...prevValue,
        country: value,
        pageSize: 20,
      };
    });
  };

  return (
    <div>
      <Select
        className="country-select"
        onChange={handleChange}
        value={country}
      >
        <MenuItem value="ca">Canada</MenuItem>
        <MenuItem value="us">USA</MenuItem>
        <MenuItem value="gb">UK</MenuItem>
        <MenuItem value="au">Australia</MenuItem>
      </Select>
    </div>
  );
}

export default CountrySelect;

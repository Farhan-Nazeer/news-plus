import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const handleChange = (e) => {
    const { value } = e.target;
    props.onSetSearchBar(value);
  };

  const submitSearch = () => {
    props.onSetRequestParams((prevValue) => {
      return {
        ...prevValue,
        keywords: props.searchBar,
        pageSize: 20,
      };
    });
  };

  const handlePress = (e) => {
    const { key } = e;
    if (key === "Enter"){
      submitSearch();
    }
  }

  return (
    <div id="search-bar">
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder={"Search " + props.requestParams.category}
        value={props.searchBar}
        onChange={handleChange}
        onKeyDown={handlePress}
      />
      <IconButton onClick={submitSearch} sx={{ p: "8px", mb: 0.5 }}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBar;

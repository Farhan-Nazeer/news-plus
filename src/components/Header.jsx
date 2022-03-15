import React from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SearchBar from "./SearchBar";
import CountrySelect from "./CountrySelect";

const Header = (props) => {
  const currDateAsString = new Date().toString().substring(0, 15);

  return (
    <div className="heading-content">
      <header>
        <h3 className="header-date">{currDateAsString}</h3>
        <div>
          <h1 className="title-text">
            {" "}
            <NewspaperIcon /> News Plus
          </h1>
        </div>
        <div className="header-flex">
          <CountrySelect
            onSetRequestParams={props.onSetRequestParams}
          />
          <SearchBar
            requestParams={props.requestParams}
            onSetRequestParams={props.onSetRequestParams}
            searchBar={props.searchBar}
            onSetSearchBar={props.onSetSearchBar}
          />
        </div>
      </header>
    </div>
  );
};

export default Header;

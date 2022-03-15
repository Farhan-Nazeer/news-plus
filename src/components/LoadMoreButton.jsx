import React from "react";
import { Button } from "@mui/material";

const LoadMoreButton = (props) => {
  const handleChange = () => {
    props.onSetRequestParams((prevValue) => {
      if (prevValue.pageSize === 20) {
        return {
          ...prevValue,
          pageSize: 50,
        };
      } else if (prevValue.pageSize === 50) {
        return {
          ...prevValue,
          pageSize: 100,
        };
      }
    });
  };

  return (
    <div>
      {props.requestParams.pageSize <= (props.resultsLength + props.bookmarkedLength) &&
        props.resultsLength !== 100 && (
          <Button
            className="load-more-button"
            onClick={handleChange}
            variant="outlined"
            size="large"
          >
            Load More Results
          </Button>
        )}
    </div>
  );
};

export default LoadMoreButton;

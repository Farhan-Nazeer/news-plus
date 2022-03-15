import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="back-to-top">
      <IconButton className="icon-button-top" onClick={scrollToTop}>
        <KeyboardArrowUpIcon fontSize="large" color="primary" className="icon-arrow-up" />
      </IconButton>
    </div>
  );
}

export default BackToTopButton;

import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} Farhan Nazeer</p>
    </footer>
  );
}

export default Footer;

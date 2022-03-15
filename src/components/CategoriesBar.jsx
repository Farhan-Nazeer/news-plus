import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const categories = [
  { name: "General", value: "general" },
  { name: "Technology", value: "technology" },
  { name: "Sports", value: "sports" },
  { name: "Entertainment", value: "entertainment" },
  { name: "Business", value: "business" },
  { name: "Science", value: "science" },
  { name: "Health", value: "health" },
];

const CategoriesBar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (name, index) => {
    props.onSetButtonClasses(() => {
      let classArray = Array(7).fill("category-bar-text");
      classArray[index] = "category-bar-text-clicked";
      return classArray;
    });
    props.onSetRequestParams((prevValue) => {
      return {
        ...prevValue,
        category: name,
        keywords: "",
        pageSize: 20,
      };
    });
    props.onSetSearchBar("");
  };

  return (
    <div>
      <div className="categories" id="category-regular">
        {categories.map((category, index) => (
          <Button
            key={index}
            size="large"
            className={props.buttonClasses[index]}
            onClick={() => handleClick(category.value, index)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <AppBar position="static" className="categories" id="category-collapse">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    size="large"
                    className="category-bar-text"
                    onClick={() => handleClick(category.value, index)}
                  >
                    {category.name}
                  </Button>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default CategoriesBar;

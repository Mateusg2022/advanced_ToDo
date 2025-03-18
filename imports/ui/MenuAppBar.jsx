import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";

import AdbIcon from "@mui/icons-material/Adb";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { useTracker, useSubscribe } from "meteor/react-meteor-data";

import { useNavigate } from "react-router-dom";

const pages = ["Tasks"];
const settings = ["Profile", "Tasks", "Logout"];

const MenuAppBar = () => {
  const user = useTracker(() => Meteor.user());

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    // console.log("click");
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavMenuClick = (page) => {
    if (page == "Tasks") {
      navigate("/tasks");
    }
    setAnchorElNav(null);
  };

  const logout = () => {
    Meteor.logout();
    navigate("/login");
  };

  const profileIconList = (profileIconList) => {
    //profile, tasks ou logout
    if (profileIconList == "Profile") {
      navigate("/profile");
    } else if (profileIconList == "Tasks") {
      // console.log("teste");
      navigate("/tasks");
    } else {
      logout();
    }
  };

  return user != null ? (
    <AppBar position="static">
      {/* {testes 2} */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            To-Do List App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavMenuClick(page)}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavMenuClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => profileIconList(setting)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <div></div>
  );
};
export default MenuAppBar;
{
  /* {testes 2} */
}

{
  /* {old_one} */
}
{
  /* <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          To-Do List App
        </Typography>
        <Button color="inherit" onClick={logout}>
          <Avatar sx={{ bgcolor: "lightblue" }} style={{ marginRight: "4px" }}>
            {user.username[0]}
          </Avatar>
        </Button>
      </Toolbar> */
}
{
  /* {old_one} */
}
//  : (
//   <AppBar position="static">
//     <Toolbar>
//       <IconButton
//         size="large"
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         sx={{ mr: 2 }}
//       >
//         <MenuIcon />
//       </IconButton>
//       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//         To-Do List App
//       </Typography>
//     </Toolbar>
//   </AppBar>
// );</AppBar>
// );

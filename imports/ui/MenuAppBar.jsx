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

import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";

import TemporaryDrawer from "./Drawer";

const settings = ["Perfil", "Tarefas", "Sair"];

const MenuAppBar = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    Meteor.logout();
    navigate("/login");
  };

  const profileIconList = (profileIconList) => {
    if (profileIconList === "Perfil") {
      navigate("/profile");
    } else if (profileIconList === "Tarefas") {
      navigate("/tasks");
    } else {
      logout();
    }
    // logout();
  };

  return user != null ? (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            <TemporaryDrawer />
            To-Do List App
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          {/* Stack para alinhar Avatar + Username + Email horizontalmente */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {user.username}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {user.emails?.[0]?.address}
              </Typography>
            </Stack>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user.profile?.photo === undefined ? (
                  <Avatar alt="Profile Picture">{user.username[0]}</Avatar>
                ) : (
                  <Avatar alt="Profile Picture" src={user.profile?.photo} />
                )}
              </IconButton>
            </Tooltip>
          </Stack>

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
              <MenuItem key={setting} onClick={() => profileIconList(setting)}>
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <div></div>
  );
};

export default MenuAppBar;

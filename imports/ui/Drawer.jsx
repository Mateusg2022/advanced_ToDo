import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import MenuIcon from "@mui/icons-material/Menu";

import SvgIcon from "@mui/material/SvgIcon";

import AssignmentIcon from "@mui/icons-material/Assignment";

import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { useNavigate } from "react-router-dom";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleClick = (text) => {
    if (text === "Home") {
      navigate("/home");
    } else if (text === "Tarefas") {
      navigate("/tasks");
    } else if (text === "Profile") {
      navigate("/profile");
    }
    setOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Home", "Profile", "Tarefas"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              <ListItemIcon>
                {text === "Home" ? (
                  <HomeIcon />
                ) : text === "Tarefas" ? (
                  <AssignmentIcon />
                ) : (
                  <AccountBoxIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: "white" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

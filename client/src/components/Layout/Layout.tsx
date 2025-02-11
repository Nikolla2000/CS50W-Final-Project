import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Toolbar,
  AppBar,
  Typography,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Box sx={{ width: drawerWidth }} role="presentation" onClick={toggleDrawer}>
        <Toolbar />
        
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/somepage">
                <ListItemText primary="Some Page" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>

      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const whoami = async () => {
    try {
        const res = await fetch("http://localhost:8000/users/whoami", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();

        if(!res.ok) {
            throw new Error(`${res.status}: ${data.error}`);
        }

        console.log(`You are logged in as ${data.username}`);
        setUsername(data.username);
    } catch (err) {
        console.log(err);
    }
}

useEffect(() => {
  whoami();
}, [])
  

const logout = async () => {
  try {
    const res = await fetch("http://localhost:8000/users/logout/", {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.error}`);
    }
    navigate("/login");
  } catch (err) {
    console.error("Error logging out:", err);
  }
}

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            FocusFlow
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {username && 
            <Typography variant="h6" noWrap component="div">
              Welcome, {username}
              <button onClick={logout}>Log out</button>
            </Typography>
          }
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

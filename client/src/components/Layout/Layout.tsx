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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { logout } from "../../services/authService";
import routes from "../../utils/routes.tsx";

const drawerWidth = 240;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const whoami = async () => {
    try {
      const res = await fetch("http://localhost:8000/users/whoami", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`${res.status}: ${data.error}`);

      console.log(`You are logged in as ${data.username}`);
      setUsername(data.first_name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    whoami();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1300, background: "linear-gradient(135deg, #575EDD, #558CD1)"  }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: "flex", alignItems: "center", gap: "15px", fontWeight: "bold", marginLeft: "10px" }}>
            FocusFlow
            <img src="/src/assets/logo-only-bg-clear.png" className="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {username && (
            <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {username}
              </Typography>
              <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                <ArrowDropDownIcon />
              </IconButton>
              
              {/* Dropdown Menu */}
              <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ 
                "& .MuiPaper-root": { width: "200px", padding: "10px" }
              }}
            >
              <MenuItem onClick={handleLogout} sx={{ fontSize: "1.1rem", padding: "12px" }}>
                Logout
              </MenuItem>
            </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer} onOpen={toggleDrawer}>
        <Box sx={{ width: drawerWidth }} role="presentation" onClick={toggleDrawer}>
          <Toolbar />
          <List>
            {routes.map((route) => (
              <ListItem disablePadding key={route.path}>
                <ListItemButton component={Link} to={route.path}>
                  <ListItemText primary={route.routeName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>

      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>{children}</Box>
    </Box>
  );
}

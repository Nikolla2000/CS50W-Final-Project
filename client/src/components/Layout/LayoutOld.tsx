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
  Avatar,
  Divider,
  styled
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import { logout } from "../../services/authService";
import routes from "../../utils/routes.tsx";

const drawerWidth = 240;

const GradientAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
}));

const ModernMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '220px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    marginTop: '8px',
    '& .MuiMenuItem-root': {
      padding: '12px 16px',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        transform: 'translateX(4px)'
      },
      '& svg': {
        marginRight: '12px',
        color: '#6e8efb'
      }
    }
  }
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  height: '100%',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  paddingTop: theme.spacing(2),
  '& .MuiListItemButton-root': {
    borderRadius: '12px',
    margin: '8px 12px',
    transition: 'all 0.3s ease',
    padding: '10px 16px',
    '&:hover': {
      backgroundColor: '#eef2ff',
      boxShadow: '0 4px 8px rgba(110, 142, 251, 0.1)',
      transform: 'translateX(2px)'
    }
  }
}));

// Example icon map for your routes
const drawerIconMap: Record<string, JSX.Element> = {
  "/dashboard": <DashboardIcon />,
  "/goals": <EmojiEventsIcon />,
  "/stats": <BarChartIcon />,
  "/settings": <SettingsIcon />,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarInitial, setAvatarInitial] = useState<string>("");

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

      setUsername(data.first_name);
      setAvatarInitial(data.first_name.charAt(0).toUpperCase());
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
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <GradientAppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar sx={{ padding: '0 16px !important' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "10px",
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => navigate('/')}
          >
            <img
              src="/src/assets/logo-only-bg-clear.png"
              className="logo"
              style={{
                height: '32px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <Typography variant="h6" noWrap sx={{
              fontWeight: "700",
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              FocusFlow
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {username && (
            <Box sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              gap: '8px'
            }}>
              <Avatar sx={{
                bgcolor: '#a777e3',
                width: 36,
                height: 36,
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                {avatarInitial}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                {username}
              </Typography>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: "white",
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ArrowDropDownIcon />
              </IconButton>

              <ModernMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" />
                  Logout
                </MenuItem>
              </ModernMenu>
            </Box>
          )}
        </Toolbar>
      </GradientAppBar>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        PaperProps={{
          sx: {
            width: drawerWidth,
            borderRight: 'none'
          }
        }}
      >
        <DrawerContent>
          <Toolbar />
          <List>
            {routes.map((route) => (
              <ListItem disablePadding key={route.path}>
                <ListItemButton
                  component={Link}
                  to={route.path}
                  selected={window.location.pathname === route.path}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {drawerIconMap[route.path] || <DashboardIcon fontSize="small" />}
                    <ListItemText
                      primary={route.routeName}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '0.95rem'
                      }}
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerContent>
      </SwipeableDrawer>

      <Box sx={{
        flexGrow: 1,
        p: 3,
        mt: 8,
        background: '#f9fafc',
        minHeight: 'calc(100vh - 64px)'
      }}>
        {children}
      </Box>
    </Box>
  );
}

import {
  AppBar,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  Container,
  Toolbar,
  Tooltip,
  Avatar,
  IconButton,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../app/hook";

const pages = [
  {
    title: "Home",
    // icon:(<HomeIcon />),
    href: "/",
  },
  {
    title: "Posts",
    // icon:(<DynamicFeedIcon />),
    href: "/Posts",
  },
  {
    title: "My Reservation",
    // icon:(<AppRegistrationIcon />),
    href: "/Reservation",
  },
  {
    title: "About",
    href: "/About",
  },
];

const MenuRight = [
  {
    title: "Login",
    button: <Button variant="contained">Login</Button>,
    href: "/Login",
  },
  {
    title: "Register",
    button: <Button variant="outlined">Register</Button>,
  },
];
const settings = ["Profile", "Logout"];

const index = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const userLogin = useAppSelector((state) => state.login.accountLogin);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickPage = (page: any) => {
    if (page.title == "My Reservation" && userLogin == undefined) {
      router.push("/Login");
    } else {
      router.push(page.href);
    }
  };
  return (
    <AppBar
      sx={{
        position: "static",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            BOOKING GREAT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleClickPage(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          {!userLogin ? (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {MenuRight.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => router.push(item.href || "/")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default index;

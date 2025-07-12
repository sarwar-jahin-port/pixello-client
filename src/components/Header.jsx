import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  Bell as BellIcon,
  MessageSquare as MessageIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon,
  X as CloseIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { currentUser, notifications } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1px solid",
  borderColor: theme.palette.grey[300],
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
  letterSpacing: "0.5px",
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  margin: theme.spacing(0, 0.5),
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {logout} = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () =>{
    navigate('/profile')
    setAnchorEl(null);
  }

  const handleLogout = () =>{
    logout();
    setAnchorEl(null);
  }

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  const menuId = "primary-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          borderRadius: 2,
          minWidth: 180,
        },
      }}
    >
      {/* <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <UserIcon size={18} />
        </ListItemIcon>
        Profile
      </MenuItem> */}
      <MenuItem onClick={handleMyAccount}>
        <ListItemIcon>
          <BriefcaseIcon size={18} />
        </ListItemIcon>
        My Account
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogOutIcon size={18} />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const notificationsMenu = (
    <Menu
      anchorEl={notificationsAnchor}
      id="notifications-menu"
      keepMounted
      open={Boolean(notificationsAnchor)}
      onClose={handleNotificationsClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          borderRadius: 2,
          width: 320,
          maxHeight: 400,
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Notifications
        </Typography>
      </Box>
      {notifications.map((notification) => (
        <MenuItem
          key={notification.id}
          onClick={handleNotificationsClose}
          sx={{
            py: 1.5,
            px: 2,
            backgroundColor: notification.read
              ? "transparent"
              : alpha(theme.palette.primary.light, 0.08),
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Avatar src={notification.user.avatar} sx={{ mr: 2 }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {notification.user.name} {notification.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.timestamp}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}
      <Box
        sx={{
          p: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          color="primary"
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          View All Notifications
        </Typography>
      </Box>
    </Menu>
  );

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: {
          width: "80%",
          maxWidth: 320,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <LogoText variant="h6" >Pixello</LogoText>
        <IconButton onClick={toggleMobileMenu}>
          <CloseIcon size={20} />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={currentUser.avatar}
            sx={{ width: 50, height: 50, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.headline}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <HomeIcon size={24} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/connections">
          <ListItemIcon>
            <UsersIcon size={20} />
          </ListItemIcon>
          <ListItemText primary="My Network" />
        </ListItem>
        {/* <ListItem button>
          <ListItemIcon>
            <BriefcaseIcon size={20} />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MessageIcon size={20} />
          </ListItemIcon>
          <ListItemText primary="Messaging" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BellIcon size={20} />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem> */}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleMyAccount}>
          <ListItemIcon>
            <UserIcon size={20} />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LogOutIcon size={20} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );

  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{ bgcolor: "#EDF4FB" }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="lg"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: { xs: 1, md: 0 },
                cursor: "pointer"
              }}
              onClick={()=>navigate("/dashboard")}
            >
              <LogoText variant="h5" noWrap>
                Pixello
              </LogoText>
            </Box>

            {!isMobile && (
              <Search
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <SearchIconWrapper>
                  <SearchIcon size={20} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {!isMobile ? (
                <>
                  <NavButton aria-label="home" component={Link} to="/dashboard" active={location.pathname === '/dashboard' ? 1 : 0}>
                    <HomeIcon size={24} />
                  </NavButton>
                  <NavButton aria-label="my network" component={Link} to="/connections" active={location.pathname === '/connections' ? 1 : 0}>
                    <UsersIcon size={24} />
                  </NavButton>
                  <NavButton aria-label="jobs">
                    <BriefcaseIcon size={24} />
                  </NavButton>
                  <NavButton aria-label="messages">
                    <MessageIcon size={24} />
                  </NavButton>
                  {/* <NavButton
                    aria-label="notifications"
                    onClick={handleNotificationsOpen}
                  >
                    <StyledBadge
                      badgeContent={unreadNotifications}
                      color="error"
                    >
                      <BellIcon size={24} />
                    </StyledBadge>
                  </NavButton> */}
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Avatar
                      src={currentUser.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </>
              ) : (
                <>
                  {/* <NavButton
                    aria-label="notifications"
                    onClick={handleNotificationsOpen}
                    sx={{ mr: 1 }}
                  >
                    <StyledBadge
                      badgeContent={unreadNotifications}
                      color="error"
                    >
                      <BellIcon size={24} />
                    </StyledBadge>
                  </NavButton> */}
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleMobileMenu}
                  >
                    <MenuIcon size={24} />
                  </IconButton>
                </>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {renderMenu}
      {/* {notificationsMenu} */}
      {mobileMenu}

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;

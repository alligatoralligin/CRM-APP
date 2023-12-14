import * as React from "react";
import { NavLink } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // Navlink list
  let navLink2 = [
    `/Clientlist/${props.UserID}`,
    `/Dashboard/${props.UserID}`,
    `/Create-Group/${props.UserID}`,
    `/Group-Page/${props.UserID}`,
  ];

  let navLinkList = [`/Product-Page/${props.UserID}`];
  let DrawerIcons2 = [
    <PersonIcon />,
    <DashboardIcon />,
    <GroupAddIcon />,
    <GroupsIcon />,
  ];

  let DrawerIcons = [<InventoryIcon />];

  let LoginButtons;
  let UserNavDisplay;
  let AboutButtons;
  // Middle buttons before login

  if (props.isLoggedIn) {
    LoginButtons = (
      <NavLink to="/Home" onClick={props.handleLogout}>
        <Button variant="contained" color="warning" sx={{ mr: 1 }}>
          <Typography variant="h7">Logout</Typography>
        </Button>
      </NavLink>
    );
    UserNavDisplay = (
      <span>
        <PersonIcon></PersonIcon>
        {/* Placeholder for User Image */}
        <Typography variant="h7" sx={{ mr: 2 }}>
          {props.Username}
        </Typography>
      </span>
    );
  }
  if (!props.isLoggedIn) {
    LoginButtons = (
      <div>
        <NavLink to="/Login">
          <Button variant="contained" color="success" sx={{ mr: 1 }}>
            <Typography variant="h7">Login</Typography>
          </Button>
        </NavLink>

        <NavLink to="/Register">
          <Button variant="contained" color="info">
            <Typography variant="h7">Register </Typography>
          </Button>
        </NavLink>
      </div>
    );

    AboutButtons = (
      <div>
        <Button variant="contained" color="primary" sx={{ mr: 10 }}>
          <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
            Homepage
          </NavLink>
        </Button>
        <Button variant="contained" color="primary" sx={{ mr: 10 }}>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/About"
          >
            About
          </NavLink>
        </Button>

        {/* <Button variant="contained" color="primary" sx={{ mr: 10 }}>
          <NavLink to="/Software">Software</NavLink>
        </Button> */}
        <Button variant="contained" color="primary" sx={{ mr: 10 }}>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/Features"
          >
            Features
          </NavLink>
        </Button>
      </div>
    );
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "navy" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent={"space-between"}>
            <Box>
              <Typography variant="h6" noWrap component="div">
                CRM-MERN
              </Typography>
            </Box>
            <Grid>{AboutButtons}</Grid>
            <Box justifyContent alignSelf={"flex-end"}>
              {UserNavDisplay}
              {LoginButtons}
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {["Client Page", "Dashboard", "Create Group", "Group Page"].map(
            (text, index) => (
              <NavLink style={{ textDecoration: "none" }} to={navLink2[index]}>
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {DrawerIcons2[index]}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            )
          )}
          {/* <NavLink to={`/Clientlist/${props.UserID}`}>
            <ListItem key={"text"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                ></ListItemIcon>
                <ListItemText primary={"text"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </NavLink> */}
        </List>
        <Divider />
        <List>
          {["Product"].map((text, index) => (
            <NavLink style={{ textDecoration: "none" }} to={navLinkList[index]}>
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {DrawerIcons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

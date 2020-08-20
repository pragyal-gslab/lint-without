import React, { lazy, Suspense, useMemo, useState } from "react";
import {
  Route,
  Redirect,
  useRouteMatch,
  Switch,
  NavLink,
} from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { CircularProgress, Menu, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    profileButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const drawerStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  navLink: {
    "& a": {
      color: "inherit",
      textDecoration: "none !important",
    },
  },
});

const MainLayout = () => {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const drawerClasses = drawerStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state, setState] = useState(false);
  const navList = useMemo(() => {
    return [
      { title: "Dashboard", path: "dashboard" },
      { title: "Inbox", path: "inbox" },
      { title: "Send email", path: "send-email" },
      { title: "Drafts", path: "drafts" },
    ];
  }, []);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const list = () => (
    <div
      className={drawerClasses.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navList.map((item, index) => (
          <li className={drawerClasses.navLink} key={item.title}>
            <NavLink to={`${url}/${item.path}`}>
              <ListItem button>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </NavLink>
          </li>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );

  return (
    <>
      <div className={classes.root} style={{ height: "64px" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawer>
            <Typography variant="h6" className={classes.title}>
              IGI User Selfcare Console
            </Typography>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              edge="end"
              className={classes.profileButton}
              color="inherit"
              aria-label="profile"
            >
              <PermIdentityIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ height: "calc(100% - 64px)" }}>
        <Switch>
          <Route
            path={path}
            exact
            strict
            render={() => <Redirect to={`${path}/dashboard`} />}
          />
          <Route
            path={`${path}/dashboard`}
            exact
            strict
            render={() => {
              const Dashboard = lazy(() => import("../dashboard/Dashboard"));
              return (
                <Suspense
                  fallback={
                    <div className="h-100 w-100 d-flex flex-jc-center flex-ai-center">
                      <CircularProgress />
                    </div>
                  }
                >
                  <Dashboard />
                </Suspense>
              );
            }}
          />
        </Switch>
      </div>
    </>
  );
};

export default MainLayout;

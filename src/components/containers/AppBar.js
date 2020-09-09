import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { navigate } from '@reach/router';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import {} from '@material-ui/core/colors';
import { withFirebase } from './FirebaseContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 275,
  },
}));

function TopAppBar(props) {
  const classes = useStyles();
  const { firebase } = props;
  const [drawer, toggleDrawer] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const accountOpen = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    });
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              toggleDrawer(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Field Data Capture
          </Typography>
          {authenticated ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={accountOpen}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/profile');
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    firebase.auth().signOut();
                    setAuthenticated(false);
                  }}
                >
                  Log-Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                navigate('/signin');
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawer}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <List className={classes.list}>
          {[
            { Label: 'Home', url: '/' },
            { Label: 'Dashboard', url: '/dashboard' },
          ].map(navItem => (
            <ListItem
              button
              key={navItem.Label}
              onClick={() => {
                navigate(navItem.url);
              }}
              selected={window.location.pathname === navItem.url}
            >
              <ListItemIcon>
                {navItem.Label === 'Home' && <HomeIcon />}
                {navItem.Label === 'Dashboard' && <DashboardIcon />}
              </ListItemIcon>
              <ListItemText primary={navItem.Label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          subheader={<ListSubheader>Forms</ListSubheader>}
          className={classes.list}
        >
          {[
            {
              Label: 'Request For Information',
              url: '/forms/rfi',
              secondaryIcon: () => <AddIcon />,
              secondaryURL: '/forms/rfi/new',
            },
            {
              Label: 'Daily Report',
              url: '/forms/dr',
              secondaryIcon: () => <AddIcon />,
              secondaryURL: '/forms/dr/new',
            },
            {
              Label: 'Hazard Assessment',
              url: '/forms/ha',
              secondaryIcon: () => <AddIcon />,
              secondaryURL: '/forms/ha/new',
            },
          ].map(navItem => (
            <ListItem
              button
              key={navItem.Label}
              selected={window.location.pathname === navItem.url}
              onClick={() => {
                navigate(navItem.url);
              }}
            >
              <ListItemText primary={navItem.Label} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => {
                    navigate(navItem.secondaryURL);
                  }}
                >
                  {navItem.secondaryIcon()}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default withFirebase(TopAppBar);

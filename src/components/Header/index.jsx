/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-bitwise */
import { AccountCircle } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import { setMode } from './headerSlice';
import CreateGroup from '../../features/Group/components/CreateGroup';

const useStyles = makeStyles(() => ({
  root: {

  },
  link: {
    "text-decoration": "none",
    "color": "white",
  },
  link2: {
    "text-decoration": "none",
    "color": "black"
  }
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.user.current)
  const isLoginIn = !!loggedInUser._id;

  const mode = useSelector(state => state.header)

  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElFeature, setAnchorElFeature] = useState(null);
  const [openDialogCreateGroup, setOpenDialogCreateGroup] = useState(false);

  const handleAccountClick = (e) => {
    setAnchorElAccount(e.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };
  const handleProfileClick = () => {
    handleCloseAccountMenu();
  };
  const handleLoggoutClick = () => {
    const action = logout();
    dispatch(action);
    handleCloseAccountMenu();
  };

  const handleFeatureClick = (e) => {
    setAnchorElFeature(e.currentTarget);
  };
  const handleCloseFeatureMenu = () => {
    setAnchorElFeature(null);
  };

  const handleClickOpenDialogCreateGroup = () => {
    setOpenDialogCreateGroup(true);
    handleCloseFeatureMenu()
  };

  const handleCloseDialogCreateGroup = () => {
    setOpenDialogCreateGroup(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: '#2e6b73' }}>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link  className={classes.link} to="/">
              Advanced Web
            </Link>
          </Typography>

          {isLoginIn && (
            <div>
              <Link className={classes.link} to="/presentation">
                <Button color="inherit">
                  Presentation
                </Button>
              </Link>
              <IconButton color="inherit" onClick={handleFeatureClick}>
                <AddCircleIcon fontSize='large' />
              </IconButton>
              <IconButton color="inherit" onClick={handleAccountClick}>
                <AccountCircle fontSize='large' />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        id="account-menu"
        anchorEl={anchorElAccount}
        open={Boolean(anchorElAccount)}
        onClose={handleCloseAccountMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link className={classes.link2} to="/profile">
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        </Link>
        {/* <MenuItem onClick={handleCloseAccountMenu}>My account</MenuItem> */}
        <MenuItem onClick={handleLoggoutClick}>Logout</MenuItem>
      </Menu>

      <Menu
        id="feature-menu"
        anchorEl={anchorElFeature}
        open={Boolean(anchorElFeature)}
        onClose={handleCloseFeatureMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickOpenDialogCreateGroup}>Create a group</MenuItem>
        <MenuItem onClick={handleCloseFeatureMenu}>Join to a group</MenuItem>
      </Menu>

      <Dialog
        open={openDialogCreateGroup}
        onClose={handleCloseDialogCreateGroup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <CreateGroup onClose={handleCloseDialogCreateGroup} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseDialogCreateGroup}>Create</Button>
          <Button onClick={handleCloseDialogCreateGroup} autoFocus>
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}

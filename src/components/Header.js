// import React from 'react';
// import { Component } from 'react'
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';


// const styles = {
//     colors: {
//         cardinalRed: "#c41e3a"
//     },
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: 16,
//     },
//     title: {
//       flexGrow: 1,
//     },
//   };

// class Header extends Component {
//     render() {   
//         return (
//             <div>
//             <AppBar style={{backgroundColor: styles.colors.cardinalRed}} position="static">
//                 <Toolbar>
//                 <IconButton edge="start" style={styles.menuButton} color="inherit" aria-label="menu">
//                     <MenuIcon/>
//                 </IconButton>
//                 <Menu
//                   open={true}

//                 >
//                   <MenuItem>Dashboard</MenuItem>
//                   <MenuItem>Messages</MenuItem>
//                 </Menu>
//                 <Typography variant="h6" style={styles.title}>
//                     Eta-lytics
//                 </Typography>
//                 </Toolbar>
//             </AppBar>
//             </div>
//       );
//     }
// }


// export default Header;


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static"  style={{backgroundColor: '#c41e3a'}}>
        <Toolbar>
          <IconButton 
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
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
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                <MenuItem onClick={handleClose}>Messages</MenuItem>
              </Menu>
          <Typography variant="h5" className={classes.title}>
            Eta-lytics
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
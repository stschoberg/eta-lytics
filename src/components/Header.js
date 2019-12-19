import React from 'react';
import { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const styles = {
    colors: {
        cardinalRed: "#c41e3a"
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
     // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  };

class Header extends Component {
    render() {   
        return (
            <div className={styles.root}>
            <AppBar style={{backgroundColor: styles.colors.cardinalRed}}position="static">
                <Toolbar>
                <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={styles.title}>
                    Eta-lytics
                </Typography>
                </Toolbar>
            </AppBar>
            </div>
      );
    }
}


export default Header;
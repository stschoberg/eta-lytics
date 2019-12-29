import React from 'react';
import { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    colors: {
        cardinalRed: "#c41e3a"
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 16,
    },
    title: {
      flexGrow: 1,
    },
  };

class Header extends Component {
    render() {   
        return (
            <div>
            <AppBar style={{backgroundColor: styles.colors.cardinalRed}} position="static">
                <Toolbar>
                <IconButton edge="start" style={styles.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" style={styles.title}>
                    Eta-lytics
                </Typography>
                </Toolbar>
            </AppBar>
            </div>
      );
    }
}


export default Header;
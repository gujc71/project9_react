import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Badge from '@material-ui/core/Badge';
import Person from "@material-ui/icons/Person";
import NotificationsIcon from '@material-ui/icons/Notifications';

import MenuItems from './MenuItems';
import { connect } from 'react-redux';
import {firebase_logout} from '../../reducer/App_reducer';

const drawerWidth = 240;

const styles = theme => ({
  appBar: { 
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },  
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class Menu extends React.Component {
  state = {
    mobileOpen: false,
    peopleOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handlePeopleToggle = () => {
    this.setState(state => ({ peopleOpen: !state.peopleOpen }));
  };

  handlePeopleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ peopleOpen: false });
  };

  handleLogout = () => {
    this.setState({ peopleOpen: false });
    this.props.dispatch(firebase_logout());
  };

  render() {
    const { classes, theme } = this.props;
    const { peopleOpen } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List><MenuItems/></List>
      </div>
    );

    return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.navIconHide}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="title" color="inherit" noWrap className={classes.title}>
            Project9 Ver.react
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" buttonRef={node => {this.anchorEl = node;}}
            aria-owns={peopleOpen ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handlePeopleToggle}>
              <Person />
          </IconButton>
          <Popper open={peopleOpen} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handlePeopleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handlePeopleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles, { withTheme: true })(Menu));
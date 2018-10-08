import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PhotoIcon from '@material-ui/icons/PermIdentity';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import {board_read} from '../reducer/App_reducer';

import MyImage from './mycom/MyImage';
import MyDialog4Board from './mycom/MyDialog4Board';
import MyFloatingButton from './mycom/MyFloatingButton';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    overflow: 'auto',
    maxHeight: '70vh',
  },
  ListItemSecondaryAction: {
    maxWidth: '20%'
  },
  button: {
    right: '10px'
  },
  Image: {
    width: '40px',
    height: '40px',
  },
});

class Listview extends React.Component {
  state = {
    DialogOpen: false,
  };  
  
  handleDialogOpen = () => {
    this.setState({ DialogOpen: true });
    this.props.dispatch(board_read(-1));
  };
  handleDialogClose = () => {
    this.setState({ DialogOpen: false });
  }; 

  handleSelectBoard = (brdno) => {
    this.setState({ DialogOpen: true });
    this.props.dispatch(board_read(brdno));
  }

  render() {
    const { classes, boards } = this.props;
    const { DialogOpen} = this.state;    
    
    return (
      <div className={classes.root}>
        <Typography variant="title" gutterBottom align="center">
          Board List
        </Typography>
        <List className={classes.list}>
          {
              boards.map((row, inx) => (
              <ListItem button key={inx} onClick={()=>this.handleSelectBoard(row.brdno)}>
                <Avatar>
                { row.userphoto 
                  ? <MyImage src={row.userphoto} alt="..." className={classes.Image}/>
                  : <PhotoIcon/>
                }
                </Avatar>
                <ListItemText primary={row.brdtitle} secondary={row.brdwriter}/>
                
                <ListItemSecondaryAction className={classes.ListItemSecondaryAction}>
                <ListItemText primary={dateFormat(row.brddate, "yyyy-mm-dd")}/>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
        <MyFloatingButton handleClick={this.handleDialogOpen}/>
        <MyDialog4Board DialogOpen={DialogOpen} handleDialogClose={this.handleDialogClose}/>
      </div>
    );
  }
}

Listview.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
    return {
      boards: state.boards
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Listview));

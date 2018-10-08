import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import MySnackbarContent from "./MySnackbarContent";
import {show_snackbar} from '../../reducer/App_reducer';

class MySnackbar extends React.Component {
  handleClose = () => {
    this.props.dispatch(show_snackbar({ message: '', snackbarOpen: false }) );
  };
          
  render() {
    const { snackbarOpen, message } = this.props;

    return (
          <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center',}}
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={this.handleClose}>
                  <MySnackbarContent
                      onClose={this.handleClose}
                      variant="success"
                      message={message}
                  />
          </Snackbar>        
    );
  }
}

let mapStateToProps = (state) => {
    return {
        snackbarOpen: state.snackbarOpen,
        message: state.message
    };
}

export default connect(mapStateToProps)(MySnackbar);

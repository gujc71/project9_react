import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {firebase_board_save, firebase_board_delete, show_snackbar} from '../../reducer/App_reducer';

class MyDialog4Board extends React.Component {

  handleBoardSave = () => {
    let data = {
      uid: this.props.uid,  
      brdtitle: this.brdtitle.value,
      brdcontents: this.brdcontents.value
    }
    
    if (this.props.selectedBoard.brdno) {
        data.brdno = this.props.selectedBoard.brdno
        data.brddate = this.props.selectedBoard.brddate
    }
    
    this.props.dispatch(firebase_board_save(data));
    this.props.handleDialogClose();
    this.props.dispatch(show_snackbar({ message: 'Saved your input.', snackbarOpen: true }) );
  }

  handleBoardDelete = () => {
    firebase_board_delete(this.props.selectedBoard.brdno);
    this.props.handleDialogClose();
    this.props.dispatch(show_snackbar({ message: 'Delete selected post.', snackbarOpen: true }) );
  }      

  handleDialogClose = () => {
      this.props.handleDialogClose();
  };       

  render() {
    const { selectedBoard, DialogOpen, uid } = this.props;
    //console.log(selectedBoard.uid);

    return (
      <div>
        <Dialog open={DialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">Post</DialogTitle>
            {selectedBoard.uid===uid || !selectedBoard.uid
              ? 
              <div>            
                <DialogContent>
                  <TextField inputRef={(node) => this.brdtitle = node} defaultValue={selectedBoard.brdtitle} margin="dense" label="title" fullWidth autoFocus />
                  <TextField inputRef={(node) => this.brdcontents = node} defaultValue={selectedBoard.brdcontents} margin="dense" label="Contents" fullWidth multiline rowsMax="4"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDialogClose} color="primary">Cancel</Button>
                  <Button onClick={this.handleBoardSave} color="primary">Save</Button>
                  {selectedBoard.brdno &&
                    <Button onClick={this.handleBoardDelete} color="primary">Delete</Button>
                  }
                </DialogActions>
              </div>
              :
              <div>            
                <DialogContent>
                  <DialogContentText>{selectedBoard.brdtitle}</DialogContentText>
                  <DialogContentText>{selectedBoard.brdcontents}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDialogClose} color="primary">Close</Button>
                </DialogActions>
              </div>
            }
          </Dialog>

      </div>
    );
  }
}

let mapStateToProps = (state) => {
    return {
      uid: state.uid,
      selectedBoard: state.selectedBoard
    };
}

export default connect(mapStateToProps)(MyDialog4Board);

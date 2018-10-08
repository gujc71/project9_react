import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 7,
    right: theme.spacing.unit * 3,
  },
});

function MyFloatingButton(props) {
  const { classes } = props;
  return (
    <div>
      <Tooltip title="new Post">
        <Button variant="fab" color="secondary" className={classes.absolute} onClick={props.handleClick}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

MyFloatingButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyFloatingButton);
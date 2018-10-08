import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import {firebase_login, firebase_register} from '../reducer/App_reducer';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  snackbarcontent: {
    backgroundColor: theme.palette.error.dark,
    margin: theme.spacing.unit,
    width: '99%'
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SignIn extends React.Component {
  componentDidMount () {
    if (localStorage.email) {
      this.setState({remember: localStorage.remember, email: localStorage.email});
    }
  }

  state = { loginMessage: null, remember: false, email:'' }
  
  saveLoginInfo = () => {
    if (this.state.remember) {
      localStorage.email = this.state.email;
      localStorage.remember = this.state.remember;
    } else {
      localStorage.email = null;
      localStorage.remember = null;
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    
    firebase_login(this.state.email, this.pw.value)
      .catch((error) => {
          this.setState({loginMessage: error});
      })
    this.saveLoginInfo();  
  }
  
  handleRegister = () => {
    firebase_register(this.state.email, this.pw.value)
      .catch((error) => {
          this.setState({loginMessage: error});
      })
    this.saveLoginInfo();  
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { remember, email } = this.state;
    
    return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
        <LockIcon />
        </Avatar>
        <Typography variant="headline">Sign in</Typography>
        {
        this.state.loginMessage &&
          <SnackbarContent className={classes.snackbarcontent}
            message={
            <span id="client-snackbar" className={classes.message}>
              <WarningIcon className={classNames(classes.icon, classes.iconVariant)} />
              Invalid username/password.
            </span>
            }
          />
        }
        <form className={classes.form} onSubmit={this.handleSubmit}>
        <FormControl margin="normal" required fullWidth >
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input autoComplete="email" autoFocus value={email} onChange={this.handleChange('email')} />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input inputRef={(node) => this.pw = node} type="password" autoComplete="current-password"/>
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" checked={remember} onChange={this.handleCheckChange('remember')} />}
          label="Remember me"/>

        <Button type="submit" fullWidth variant="raised" color="primary" className={classes.submit}>Sign in</Button>
        <Button fullWidth variant="raised" className={classes.submit} onClick={this.handleRegister}>Create Account</Button>
        </form>
      </Paper>
      </main>
    </React.Fragment>
    );
   }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
